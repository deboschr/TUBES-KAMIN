import crypto from "crypto";
import { user_table } from "../models/user-model.js";

export const login_page = (req, res) => {
	res.render("login-register-page", {
		title: "Login and Register",
		layout: "layouts/main",
		style: "login-register-style.css",
		script: "login-register-script.js",
	});
};

export const login_user = async (req, res) => {
	try {
		const { email, password } = req.body;

		const hashedPassword = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		const existingUser = await user_table.findOne({
			where: { email: email, password: hashedPassword },
		});
		if (existingUser) {
			req.session.userData = email;
			res.redirect("/digital-signature");
		} else {
			res.redirect("/login-register?error=1");
		}
	} catch (error) {
		res.status(500).send("Login gagal");
	}
};

export const register_user = async (req, res) => {
	try {
		console.log("Masuk");
		const { nama, email, password, repassword } = req.body;

		if (password != repassword) {
			res.send("Password tidak cocok!");
		}

		const hashedPassword = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		const existingUser = await user_table.findOne({ where: { email } });
		if (existingUser) {
			return res.status(500).send("Email sudah pernah digunakan!");
		}

		const newUser = await user_table.create({
			name: nama,
			email: email,
			password: hashedPassword,
		});

		res.redirect("/login-register");
	} catch (error) {
		res.status(500).send("Gagal Register");
	}
};
