import { key_generate } from "../utils/generate-key-util.js";
export const home_page = (req, res) => {
	const key = key_generate();

	res.send(key);

	res.render("home-page", {
		title: "Digital Signature",
		layout: "layouts/main",
		style: "home-style.css",
		script: "home-script.js",
	});
};

export const redirect_page = (req, res) => {
	res.redirect("/digital-signature");
};
