export const home_page = (req, res) => {
	res.render("home-page", {
		title: "Digital Signature",
		layout: "layouts/main",
		style: "home-style.css",
	});
};

export const redirect_page = (req, res) => {
	res.redirect("/digital-signature");
};
