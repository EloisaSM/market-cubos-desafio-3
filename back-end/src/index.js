/* eslint-disable no-undef */
const express = require("express");
const routes = require("./controllers/routes/routes");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000);
