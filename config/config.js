const dotenv = require("dotenv").config();

module.exports = {
	development: {
		use_env_variable: "DATABASE_URL",
		host: "127.0.0.1",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	test: {
		use_env_variable: "TEST_DATABASE_URL",
	},
	production: {
		use_env_variable: "DATABASE_URL",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
