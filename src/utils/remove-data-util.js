import path from "path";
import fs from "fs/promises";

export const remove_data = async (documentName) => {
	try {
		// Construct the absolute path to the 'doc' directory
		const docDir = path.join("public", "doc", documentName);

		// Check if the file exists before attempting to delete
		const filePath = path.resolve(docDir);
		await fs.access(filePath); // Check if file exists

		// Delete the file
		await fs.unlink(filePath);

		return { success: true };
	} catch (error) {
		// Handle errors if any
		console.error("Error removing file:", error);
		return { success: false, error: error.message };
	}
};
