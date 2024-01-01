import { UserModel } from "../models/user-model.js";
import { DocumentModel } from "../models/document-model.js";
import { signDocument } from "../utils/sign-document-util.js";
import { verifySignature } from "../utils/verify-signature-util.js";

export const document_management_detail_page = async (req, res) => {
	let fileTarget = null;
	if (req.session.fileTarget) {
		const { id_document } = req.session.fileTarget;
		const queryResult = await DocumentModel.findOne({
			where: { id_document: id_document },
		});

		if (queryResult) {
			fileTarget = {
				id_document: queryResult.id_document,
				document_name: queryResult.document_name,
				signing_status: queryResult.signing_status,
				verify_status: queryResult.verify_status,
			};
		}
	}

	const queryUser = await UserModel.findAll();

	const dataUser = queryUser.map((user) => ({
		id_user: user.id_user,
		name: user.name,
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

				if (resultSign.success) {
					await DocumentModel.update(
						{
							signing_status: "SIGNED",
							signature: resultSign.signature,
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
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
				console.log(resultQuery);
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
		res.status(500).json({ error: "An error occurred" }); // Handle the error appropriately
	}
};
