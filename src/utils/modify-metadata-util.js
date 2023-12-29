import { PDFDocument, PDFName, PDFString } from "pdf-lib"
import fs from "fs/promises";

export const modifyPDFMetadata = async (documentName, property, value) => {
	try {
		const document = await fs.readFile(`public/doc/${documentName}`);

		const pdfDoc = await PDFDocument.load(document);

		// Add or update metadata
		const { info } = pdfDoc;
		info.set(PDFName.of("Title"), PDFString.of("My New Title"));
		info.set(PDFName.of("Author"), PDFString.of("John Doe"));
		info.set(PDFName.of("Subject"), PDFString.of("Example Subject"));

		const modifiedPdfBytes = await pdfDoc.save();

		await fs.writeFile(`public/doc/${documentName}`, modifiedPdfBytes);

		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false, error: error.message };
	}
};
