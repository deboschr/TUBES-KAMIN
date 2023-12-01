export const home_page = (req, res) => {
	res.render("layouts/navbar");
};

export const redirect_page = (req, res) => {
	res.redirect("/digital-signature");
};
