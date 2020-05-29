require('./db/mongoose')
const express = require('express');
const app = express();
const bodyParser = require("body-parser")

const userRouth = require("./routes/users")

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(userRouth)

const PORT = process.env.PORT || 3000
// listen for requests :)
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
