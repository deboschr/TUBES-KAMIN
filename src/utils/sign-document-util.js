import crypto from "crypto";
import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";

export const signDocument = async (documentName, privateKeyString) => {
	try {
		const privateKey = crypto.createPrivateKey({
			key: Buffer.from(privateKeyString, "base64"),
			format: "der",
			type: "pkcs8",
		});

		const document = await fs.readFile(`public/doc/${documentName}`);

		const documentHash = crypto
			.createHash("sha256")
			.update(document)
			.digest("hex");

		const signer = crypto.createSign("RSA-SHA256");
		signer.update(documentHash);
		signer.end();

		const signature = signer.sign(privateKey, "base64");

		return { success: true, signature: signature };
	} catch (error) {
		return { success: false, error: error.message };
	}
};
