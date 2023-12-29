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

		// Membaca isi dokumen PDF
		const document = await fs.readFile(`public/doc/${documentName}`);

		// Menghitung hash dari konten dokumen
		const documentHash = crypto
			.createHash("sha256")
			.update(document)
			.digest("hex");

		const verifier = crypto.createVerify("RSA-SHA256");
		verifier.update(documentHash);
		verifier.end();

		// Melakukan verifikasi tanda tangan
		const verified = verifier.verify(publicKey, signature, "base64");

		return { success: true, verifyStatus: verified };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
