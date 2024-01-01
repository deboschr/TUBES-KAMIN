import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connection_database.js";
import { UserModel } from "./user-model.js";

export const DocumentModel = sequelize.define(
	"document",
	{
		id_document: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		owner: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sender: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		receiver: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		document_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		signing_status: {
			type: DataTypes.ENUM("SIGNED", "UNSIGNED"),
		},
		verify_status: {
			type: DataTypes.ENUM("VERIFIED", "UNVERIFIED"),
		},
		public_key: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		signature: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "document",
		timestamps: false,
	}
);

//##################################
DocumentModel.belongsTo(UserModel, {
	foreignKey: "owner",
	targetKey: "id_user",
});

UserModel.hasMany(DocumentModel, {
	foreignKey: "owner",
	sourceKey: "id_user",
});

//##################################
DocumentModel.belongsTo(UserModel, {
	foreignKey: "sender",
	targetKey: "id_user",
});

UserModel.hasMany(DocumentModel, {
	foreignKey: "sender",
	sourceKey: "id_user",
});

//##################################
DocumentModel.belongsTo(UserModel, {
	foreignKey: "receiver",
	targetKey: "id_user",
});

UserModel.hasMany(DocumentModel, {
	foreignKey: "receiver",
	sourceKey: "id_user",
});
