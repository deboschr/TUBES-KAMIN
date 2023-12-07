import crypto from "crypto";

export const key_generate = () => {
	const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "spki",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs8",
			format: "pem",
			cipher: "aes-256-cbc",
			passphrase: "top secret",
		},
	});

	return { publicKey, privateKey };
};

export const signing = () => {
	try {
		const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: "spki",
				format: "pem",
			},
			privateKeyEncoding: {
				type: "pkcs8",
				format: "pem",
				cipher: "aes-256-cbc",
				passphrase: "top secret",
			},
		});

		return { publicKey, privateKey };
	} catch (error) {
		console.log(error);
	}
};
