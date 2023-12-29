import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connection_database.js";
import { UserModel } from "./user-model.js";

export const UserDocumentModel = sequelize.define(
	"user_document",
	{
		id_document: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		document: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		signing_status: {
			type: DataTypes.ENUM("SIGNED", "UNSIGNED"),
		},
		verify_status: {
			type: DataTypes.ENUM("VERIFIED", "UNVERIFIED"),
		},
		signature: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "user_document",
		timestamps: false,
	}
);

UserDocumentModel.belongsTo(UserModel, {
	foreignKey: "id_user",
	targetKey: "id_user",
});

UserModel.hasMany(UserDocumentModel, {
	foreignKey: "id_user",
	sourceKey: "id_user",
});
