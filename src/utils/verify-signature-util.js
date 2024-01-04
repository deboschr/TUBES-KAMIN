import crypto from "crypto";
import fs from "fs/promises";

export const verifySignature = async (
	documentName,
	publicKeyString,
	signature
) => {
	try {
		const publicKey = crypto.createPublicKey({
			key: Buffer.from(publicKeyString, "base64"),
			format: "der",
			type: "spki",
		});

		const document = await fs.readFile(`public/doc/${documentName}`);

		const documentHash = crypto
			.createHash("sha256")
			.update(document)
			.digest("hex");

		const verifier = crypto.createVerify("RSA-SHA256");
		verifier.update(documentHash);
		verifier.end();

		const verified = verifier.verify(publicKey, signature, "base64");

		console.log(verified);

		return { success: true, verifyStatus: verified };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
