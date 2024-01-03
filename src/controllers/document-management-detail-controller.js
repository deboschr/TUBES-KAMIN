import { UserModel } from "../models/user-model.js";
import { DocumentModel } from "../models/document-model.js";
import { signDocument } from "../utils/sign-document-util.js";
import { verifySignature } from "../utils/verify-signature-util.js";

export const document_management_detail_page = async (req, res) => {
	let fileTarget = null;
	if (req.session.fileTarget) {
		const { id_document, owner } = req.session.fileTarget;
		const documentQuery = await DocumentModel.findOne({
			where: { id_document: id_document },
		});

		let ownerQuery = null;
		if (owner) {
			ownerQuery = await UserModel.findOne({
				where: { id_user: owner },
			});
		}

		let senderQuery = null;
		if (documentQuery && documentQuery.sender) {
			senderQuery = await UserModel.findOne({
				where: { id_user: documentQuery.sender },
			});
		}

		if (documentQuery) {
			fileTarget = {
				id_document: documentQuery.id_document,
				document_name: documentQuery.document_name,
				signing_status: documentQuery.signing_status,
				verify_status: documentQuery.verify_status,
				owner_name: ownerQuery ? ownerQuery.name : "",
				owner_email: ownerQuery ? ownerQuery.email : "",
				sender_name: senderQuery ? senderQuery.name : "",
				sender_email: senderQuery ? senderQuery.email : "",
			};
		}
	}

	const queryUser = await UserModel.findAll();

	const dataUser = queryUser.map((user) => ({
		id_user: user.id_user,
		name: user.name,
		email: user.email,
	}));

	res.render("document-management-detail-page", {
		title: "Document Management",
		layout: "layouts/main",
		style: "document-management-detail-style.css",
		script: "document-management-detail-script.js",
		layout_style: "search-user-style.css",
		layout_script: "search-user-script.js",
		fileTarget: JSON.stringify(fileTarget),
		dataUser: JSON.stringify(dataUser),
	});
};

export const document_management_detail = async (req, res) => {
	try {
		const { action, id_document } = req.body;

		const resultQuery = await DocumentModel.findOne({
			where: { id_document: id_document },
		});

		if (resultQuery) {
			if (action === "sign") {
				const resultSign = await signDocument(
					resultQuery.document_name,
					req.session.loginData.private_key
				);

				const { public_key } = req.session.loginData;

				if (resultSign.success) {
					await DocumentModel.update(
						{
							signing_status: "SIGNED",
							signature: resultSign.signature,
							public_key: public_key,
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
					req.session.fileTarget = {
						id_document: resultQuery.id_document,
						document_name: resultQuery.document_name,
						owner: req.session.loginData.id_user,
					};
				} else {
					await DocumentModel.update(
						{
							signing_status: "UNSIGNED",
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
				}
			} else if (action === "verify") {
				const resultVerify = await verifySignature(
					resultQuery.document_name,
					resultQuery.public_key,
					resultQuery.signature
				);

				if (resultVerify.success && resultVerify.verifyStatus) {
					await DocumentModel.update(
						{
							verify_status: "VERIFIED",
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);

					let ownerQuery = await UserModel.findOne({
						where: { public_key: resultQuery.public_key },
					});

					req.session.fileTarget = {
						id_document: resultQuery.id_document,
						document_name: resultQuery.document_name,
						owner: ownerQuery ? ownerQuery.id_user : null,
					};
				} else {
					await DocumentModel.update(
						{
							verify_status: "UNVERIFIED",
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
				}
			}
		}

		res.json({ redirectUrl: "/document-management-detail" });
	} catch (error) {
		console.log(error);
	}
};

export const document_management_send = async (req, res) => {
	try {
		const { dataSends } = req.body;

		for (const data of dataSends) {
			const resultQuery = await DocumentModel.findOne({
				where: { id_document: data.id_document },
			});

			await DocumentModel.create({
				owner: resultQuery.owner,
				sender: req.session.loginData.id_user,
				receiver: data.receiver,
				document_name: resultQuery.document_name,
				public_key: resultQuery.public_key,
				signature: resultQuery.signature,
			});
		}
		res.json({ redirectUrl: "/document-management-detail" });
	} catch (error) {
		console.log(error);
	}
};
