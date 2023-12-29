import session from "express-session";
import { UserDocumentModel } from "../models/user-document-model.js";
import { signDocument } from "../utils/sign-document-util.js";
import { verifySignature } from "../utils/verify-signature-util.js";

export const document_management_page = async (req, res) => {
	let documentsUser = null;
	if (req.session.loginData) {
		const { id_user } = req.session.loginData;
		documentsUser = await UserDocumentModel.findAll({
			where: {
				id_user: id_user,
			},
		});
	}

	res.render("document-management-page", {
		title: "Document Management",
		layout: "layouts/main",
		style: "document-management-style.css",
		script: "document-management-script.js",
		documentsUser: JSON.stringify(documentsUser),
	});
};

export const document_detail_page = async (req, res) => {
	let fileTarget = null;
	if (req.session.fileTarget) {
		const { id_document } = req.session.fileTarget;
		const queryResult = await UserDocumentModel.findOne({
			where: { id_document: id_document },
		});

		if (queryResult) {
			fileTarget = {
				doc_id: queryResult.id_document,
				doc_name: queryResult.document,
				status_signing: queryResult.signing_status,
				status_verify: queryResult.verify_status,
			};
		}
	}

	res.render("document-detail-page", {
		title: "Document Detail",
		layout: "layouts/main",
		style: "document-detail-style.css",
		script: "document-detail-script.js",
		fileTarget: JSON.stringify(fileTarget),
	});
};

export const document_management = (req, res) => {
	const { fileID, fileName } = req.body;

	if (fileID && fileName) {
		req.session.fileTarget = {
			id_document: fileID,
			name: fileName,
		};
	}

	res.json({ redirectUrl: "/document-detail" });
};

export const document_detail = async (req, res) => {
	try {
		const { action, id_document } = req.body;

		const resultQuery = await UserDocumentModel.findOne({
			where: { id_document: id_document },
		});

		if (resultQuery) {
			if (action === "sign") {
				const resultSign = await signDocument(
					resultQuery.document,
					req.session.loginData.private_key
				);

				if (resultSign.success) {
					await UserDocumentModel.update(
						{
							signing_status: "SIGNED",
							signature: resultSign.signature,
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
				} else {
					await UserDocumentModel.update(
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
					resultQuery.document,
					req.session.loginData.public_key,
					resultQuery.signature
				);

				if (resultVerify.success && resultVerify.verifyStatus) {
					await UserDocumentModel.update(
						{
							verify_status: "VERIFIED",
						},
						{
							where: { id_document: resultQuery.id_document },
						}
					);
				} else {
					await UserDocumentModel.update(
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

		res.json({ redirectUrl: "/document-detail" });
	} catch (error) {
		console.log(error);
	}
};
