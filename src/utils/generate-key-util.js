import crypto from "crypto";

export const key_generate = () => {
	const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "spki",
			format: "der",
		},
		privateKeyEncoding: {
			type: "pkcs8",
			format: "der",
		},
	});

	return { publicKey, privateKey };
};
