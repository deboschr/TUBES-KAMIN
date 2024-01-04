import path from "path";
import fs from "fs/promises";

export const save_data = async (docFile, userName) => {
	try {
		// Remove spaces from the userName
		const cleanUserName = userName.replace(/\s/g, "");

		// Generate a new unique name for the doc (.csv/.xlsx)
		const docExtension = path.extname(docFile.name);
		const newDocName = `${cleanUserName}-${Date.now()}${docExtension}`;

		// Construct the absolute path to the 'doc' directory
		const docDir = path.join("public", "doc");

		// Check if the directory exists, create it if not
		try {
			await fs.access(docDir);
		} catch (err) {
			await fs.mkdir(docDir, { recursive: true });
		}

		// Construct the full doc path
		const docPath = path.join(docDir, newDocName);

		// Save the doc to the 'doc' folder
		await docFile.mv(docPath);

		return { success: true, newDocName: newDocName };
	} catch (error) {
		// Handle errors if any
		console.error("Error saving file:", error);
		return { success: false, error: error.message };
	}
};
