/* eslint-disable no-undef */
const express = require("express");
const { register } = require("../controllers/cadastro");

const route = express();

//user
route.post("/login");
route.post("/register", register);

route.get("/perfil");
route.put("/perfil/:id");

//products
route.get("/products");
route.get("/product/:id");
route.post("/products");
route.put("/products/:id");
route.delete("/products/:id");

module.exports = route;
