export const home_page = (req, res) => {
	res.render("home-page");
};

export const redirect_page = (req, res) => {
	res.redirect("/digital-signature");
};
