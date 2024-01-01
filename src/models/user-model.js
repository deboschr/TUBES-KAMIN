import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connection_database.js";

export const UserModel = sequelize.define(
	"user",
	{
		id_user: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		private_key: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		public_key: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "user",
		timestamps: false,
	}
);
