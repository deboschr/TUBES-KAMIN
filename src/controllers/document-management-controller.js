export const document_management_page = (req, res) => {
	res.render("document-management-page", {
		title: "Document Management",
		layout: "layouts/main",
		style: "document-management-style.css",
		script: "document-management-script.js",
	});
};
