import { DocumentModel } from "../models/document-model.js";
import { remove_data } from "../utils/remove-data-util.js";

export const document_management_overview_page = async (req, res) => {
	let documentsOwner = null;
	let documentsReceiver = null;
	if (req.session.loginData) {
		const { id_user } = req.session.loginData;
		documentsOwner = await DocumentModel.findAll({
			where: {
				owner: id_user,
				sender: null,
				receiver: null,
			},
		});
		documentsReceiver = await DocumentModel.findAll({
			where: {
				receiver: id_user,
			},
		});
	}

	res.render("document-management-overview-page", {
		title: "Document Management Overview",
		layout: "layouts/main",
		style: "document-management-overview-style.css",
		script: "document-management-overview-script.js",
		documentsOwner: JSON.stringify(documentsOwner),
		documentsReceiver: JSON.stringify(documentsReceiver),
	});
};

export const document_management_overview = async (req, res) => {
	try {
		const { action, id_document } = req.body;

		if ((action, id_document)) {
			const resultQuery = await DocumentModel.findOne({
				where: { id_document: id_document },
			});

			if (resultQuery) {
				if (action === "detail") {
					req.session.fileTarget = {
						id_document: resultQuery.id_document,
						document_name: resultQuery.document_name,
					};
					res.json({ redirectUrl: "/document-management-detail" });
				} else if (action === "delete") {
					await DocumentModel.destroy({
						where: { id_document: id_document },
					});
					await remove_data(resultQuery.document_name);
					res.json({ redirectUrl: "/document-management-overview" });
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};
