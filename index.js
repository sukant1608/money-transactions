require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const handle = require("./handlers");
const routes = require("./routes");

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", routes.auth);
app.use("/api/contacts", routes.contact);
app.use("/api/debt", routes.debt);
app.use("/api/due", routes.due);

app.use(handle.notFound);
app.use(handle.error);
