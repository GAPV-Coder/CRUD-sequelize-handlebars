"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Customers extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Customers.init(
		{
			email: DataTypes.STRING,
			name: DataTypes.STRING,
			last_name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Customers",
			underscored: true,
		}
	);
	return Customers;
};
