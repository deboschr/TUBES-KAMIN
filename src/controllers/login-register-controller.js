import crypto from "crypto";
import { UserModel } from "../models/user-model.js";
import { createKeyPair } from "../utils/generate-key-util.js";

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

		const existingUser = await UserModel.findOne({
			where: { email: email, password: hashedPassword },
		});
		if (existingUser) {
			req.session.loginData = {
				id_user: existingUser.id_user,
				name: existingUser.name,
				public_key: existingUser.public_key,
				private_key: existingUser.private_key,
			};
			res.redirect("/home");
		} else {
			res.redirect("/login-register?error=1");
		}
	} catch (error) {
		res.status(500).send("Login gagal");
	}
};

export const register_user = async (req, res) => {
	try {
		const { nama, email, password, repassword } = req.body;

		if (password != repassword) {
			res.send("Password tidak cocok!");
		}

		const hashedPassword = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");

		const existingUser = await UserModel.findOne({ where: { email } });
		if (existingUser) {
			return res.status(500).send("Email sudah pernah digunakan!");
		}

		const { publicKey, privateKey } = createKeyPair();

		await UserModel.create({
			name: nama,
			email: email,
			password: hashedPassword,
			private_key: privateKey,
			public_key: publicKey,
		});

		res.redirect("/login-register");
	} catch (error) {
		res.status(500).send("Gagal Register");
	}
};

export const logout_user = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).send("Logout failed");
		} else {
			res.redirect("/login-register");
		}
	});
};
