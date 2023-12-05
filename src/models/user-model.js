import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connection_database.js";
export const user_table = sequelize.define(
    "user",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: "user",
        timestamps: false
    }
);