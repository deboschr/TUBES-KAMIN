import { UserDocumentModel } from "../models/user-document-model.js";
import { save_data } from "../utils/save-data-util.js";
import { modifyPDFMetadata } from "../utils/modify-metadata-util.js";

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
			const { id_user } = req.session.loginData;
			const docFile = req.files.fileUpload;
			const resSave = await save_data(docFile);

			if (resSave.success) {
				await UserDocumentModel.create({
					id_user: id_user,
					document: resSave.newDocName,
				});

				console.log("MASUK MODIFY");
				await modifyPDFMetadata(resSave.newDocName, "Author", "Jake Spencher");
				res.redirect("/document-management");
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
