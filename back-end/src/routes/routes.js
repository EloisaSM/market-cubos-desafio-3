/* eslint-disable no-undef */
const express = require("express");
const { register } = require("../controllers/cadastro");
const { login } = require("../controllers/login");
const { perfil, perfilUpdate } = require("../controllers/users");
const {
  showProductsList,
  showProduct,
  productRegister,
  showUpdateProduct,
  deleteProduct,
} = require("../controllers/products");

const verifyLogin = require("../middleware/filter");

const route = express();

//user
route.post("/login", login);
route.post("/register", register);

route.use(verifyLogin);

route.get("/perfil", perfil);
route.put("/perfil", perfilUpdate);

//products
route.get("/products", showProductsList);
route.get("/products/:id", showProduct);
route.post("/products", productRegister);
route.put("/products/:id", showUpdateProduct);
route.delete("/products/:id", deleteProduct);

module.exports = route;
