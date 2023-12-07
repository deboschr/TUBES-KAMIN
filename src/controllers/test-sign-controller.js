import { key_generate } from "../utils/generate-key-util.js";
export const test_sign_page = (req, res) => {
	res.render("test-sign", {
		title: "Test Sign",
		layout: "layouts/main",
		style: "test-sign-style.css",
		script: "test-sign-script.js",
	});
};
export const test_signing = (req, res) => {
	const { name, message } = req.body;

	const { publicKey, privateKey } = key_generate();

	// res { publicKey, privateKey };
	res.render("test-verifikasi", {
		title: "Test Sign",
		layout: "layouts/main",
		style: "test-sign-style.css",
		script: "test-sign-script.js",
		pesan: message,
		privateKey,
	});
};

export const verify_sign = async (req, res) => {
	const { name, message } = req.body;

	const { publicKey, privateKey } = key_generate();

	res.send({ publicKey, privateKey });
};
