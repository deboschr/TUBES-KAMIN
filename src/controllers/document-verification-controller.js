export const document_verification_page = (req, res) => {
	res.render("document-verification", {
		title: "Document Verification",
		layout: "layouts/main",
		style: "document-verification-style.css",
		script: "document-verification-script.js",
	});
};