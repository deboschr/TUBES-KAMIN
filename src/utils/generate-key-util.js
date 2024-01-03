import crypto from "crypto";

export const createKeyPair = () => {
	
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

	return {
		publicKey: publicKey.toString("base64"),
		privateKey: privateKey.toString("base64"),
	};
};
