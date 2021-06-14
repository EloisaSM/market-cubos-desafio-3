/* eslint-disable no-undef */
const express = require("express");
const { register } = require("../controllers/cadastro");
const { login } = require("../controllers/login");
const verifyLogin = require("../middleware/filter");
const { perfil } = require("../controllers/users");

const route = express();

//user
route.post("/login", login);
route.post("/register", register);

route.use(verifyLogin);

route.get("/perfil", perfil);
route.put("/perfil/:id");

//products
route.get("/products");
route.get("/product/:id");
route.post("/products");
route.put("/products/:id");
route.delete("/products/:id");

module.exports = route;
