import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tubes_kamin", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

// Coba koneksi ke database
(async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection to database has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

export default sequelize;
