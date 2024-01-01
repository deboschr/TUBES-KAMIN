import { DocumentModel } from "../models/document-model.js";
import { save_data } from "../utils/save-data-util.js";

export const home_page = (req, res) => {
	res.render("home-page", {
		title: "Digital Signature",
		layout: "layouts/main",
		style: "home-style.css",
		script: "home-script.js",
	});
};

export const document_upload = async (req, res) => {
	try {
		if (req.session.loginData) {
			const { id_user, name, public_key } = req.session.loginData;
			const docFile = req.files.fileUpload;
			const resSave = await save_data(docFile, name);

			if (resSave.success) {
				await DocumentModel.create({
					owner: id_user,
					document_name: resSave.newDocName,
					public_key: public_key,
				});

				res.redirect("/document-management-overview");
			} else {
				res.redirect("/home");
			}
		} else {
			res.redirect("/login-register");
		}
	} catch (error) {
		console.log(error);
	}
};

export const redirect_page = (req, res) => {
	res.redirect("/home");
};
