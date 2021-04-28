const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv").config();

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// To read the input the user is sending with format URL Encoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("working on heroku");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("server is up and listening on port", PORT));
