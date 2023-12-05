export const document_sign_page = (req, res) => {
	res.render("document-sign-page", {
		title: "Document Signing",
		layout: "layouts/main",
		style: "document-sign-style.css",
		script: "document-sign-script.js",
	});
};
