const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv").config();

const app = express();
const {
	Customers,
	Accounts,
	AccountTypes,
	Transactions,
	TransactionTypes,
} = require("./models");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// To read the input the user is sending with format URL Encoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("home");
});

// READ
app.get("/customers", async (req, res) => {
	let results = await Customers.findAll({ raw: true });
	res.render("customers", {
		customers: results,
	});
});

app.get("/accounts", async (req, res) => {
	let results = await Accounts.findAll({ raw: true });
	let accountTypesResults = await AccountTypes.findAll({ raw: true });
	let customersResults = await Customers.findAll({ raw: true });
	res.render("accounts", {
		accounts: results,
		types: accountTypesResults,
		customers: customersResults,
	});
});

app.get("/transactions", async (req, res) => {
	let results = await Transactions.findAll({ raw: true });
	let accounts = await Accounts.findAll({ raw: true });
	let transactionTypes = await TransactionTypes.findAll({ raw: true });
	res.render("transactions", {
		transactions: results,
		accounts,
		transactionTypes,
	});
});

app.get("/account-types", async (req, res) => {
	let results = await AccountTypes.findAll({ raw: true });
	res.render("account_types", {
		accountTypes: results,
	});
});

app.get("/transaction-types", async (req, res) => {
	let results = await TransactionTypes.findAll({ raw: true });
	res.render("transaction_types", {
		transactionTypes: results,
	});
});

// CREATE
app.post("/customers", async (req, res) => {
	const { email, firstName, lastName } = req.body;
	try {
		let results = await Customers.create({
			email,
			name: firstName,
			last_name: lastName,
		});
		res.redirect("/customers");
	} catch (err) {
		res.status(400).send("new customer could not been added");
	}
});

app.post("/accounts", async (req, res) => {
	const { accountType, customer, balance } = req.body;
	try {
		let results = await Accounts.create({
			balance,
			account_types_id: accountType,
			customers_id: customer,
		});
		res.redirect("/accounts");
	} catch (error) {
		res.status(400).send("a new account could not be created");
	}
});

app.post("/transactions", async (req, res) => {
	const { amount, account, transactionType } = req.body;
	try {
		let results = await Transactions.create({
			amount,
			accounts_id: account,
			transaction_types_id: transactionType,
		});
		res.redirect("/transactions");
	} catch (error) {
		res.status(400).send("a new transaction could not be created");
	}
});

app.post("/account-types", async (req, res) => {
	const { accountType } = req.body;
	try {
		let results = await AccountTypes.create({
			type: accountType,
		});
		res.redirect("/account_types");
	} catch (error) {
		res.status(400).send("a new account type could not be created");
	}
});

app.post("/transaction-types", async (req, res) => {
	const { transactionType } = req.body;
	try {
		let results = await TransactionTypes.create({
			type: transactionType,
		});
		res.redirect("/transaction-types");
	} catch (error) {
		res.status(400).send("a new transaction type could not be created");
	}
});

// UPDATE
app.get("/customers/:id", async (req, res) => {
	let results = await Customers.findByPk(req.params.id, { raw: true });
	res.render("customers_update_form", { currentCustomer: results });
});

app.post("/customers/update/:id", async (req, res) => {
	const id = req.params.id;
	const { email, firstName, lastName } = req.body;
	try {
		let results = await Customers.update(
			{ email, name: firstName, last_name: lastName },
			{
				where: {
					id,
				},
			}
		);
		res.redirect(`/customers/${id}`);
	} catch (error) {
		res.status(400).send(`customer with id:${id} was not updated`);
	}
});

app.get("/accounts/:id", async (req, res) => {
	let results = await Accounts.findByPk(req.params.id, { raw: true });
	res.render("accounts_update_form", { currentAccount: results });
});

app.post("/accounts/update/:id", async (req, res) => {
	const id = req.params.id;
	const { balance } = req.body;
	try {
		let results = await Accounts.update(
			{
				balance,
			},
			{
				where: {
					id,
				},
			}
		);
		res.redirect(`/accounts/${id}`);
	} catch (error) {
		res.status(400).send(`account with id: ${id} was not updated`);
	}
});

// DELETE
app.post("/customers/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await Customers.destroy({
			where: {
				id,
			},
		});
		res.redirect("/customers");
	} catch (error) {
		res.status(400).send(`not able to delete customer with id ${id}`);
	}
});

app.post("/accounts/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await Accounts.destroy({
			where: {
				id,
			},
		});
		res.redirect("/accounts");
	} catch (error) {
		res.status(400).send(`not able to delete account with id ${id}`);
	}
});

// starting server listening
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server is up and listening on port", PORT));
