const connection = require("../connection-db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const registerProduct = async (body, id) => {
  const { nome, estoque, preco, categoria, descricao, imagem } = body;

  const queryFindProfile = "select * from usuarios where id = $1";

  const { rowCount } = await connection.query(queryFindProfile, [id]);

  const error = {
    status: 400,
    message: "",
  };

  if (!rowCount) {
    error.status = 404;
    error.message = "Usuário não encontrado";
    return error;
  }

  const queryInsertProduct = `insert into produtos (nome, 
    estoque, 
    preco, 
    categoria, 
    descricao, 
    imagem, 
    usuario_id) 
  values($1, 
    $2, 
    $3, 
    $4, 
    $5, 
    $6, 
    $7)
  `;

  const newProduct = await connection.query(queryInsertProduct, [
    nome,
    estoque,
    preco,
    categoria,
    descricao,
    imagem,
    id,
  ]);

  if (!newProduct.rowCount) {
    error.message = "Produto não pode ser inserido";
    return error;
  }

  return "Produto cadastrado com sucesso";
};

const getOneProduct = async (id, userId) => {
  const queryProductByUserId =
    "select * from produtos where id = $1 and usuario_id = $2";

  const { rows: product, rowCount } = await connection.query(
    queryProductByUserId,
    [id, userId]
  );

  const error = {
    status: 404,
    message: "",
  };

  if (!rowCount) {
    error.message = "Produto não encontrado";
    return error;
  }

  return product[0];
};

const updateProduct = async (data, userId, id) => {
  const { nome, estoque, preco, descricao, imagem } = data;

  const queryProductByUserId =
    "select * from produtos where id = $1 and usuario_id = $2";

  const { rows, rowCount } = await connection.query(queryProductByUserId, [
    id,
    userId,
  ]);

  const error = {
    status: 404,
    message: "",
  };

  if (!rowCount) {
    error.message = "Produto não encontrado";
    return error;
  }

  const product = rows[0];

  let queryUpdate = "update produtos set";

  if (nome) {
    product.nome = nome;
    queryUpdate += "nome = $1, ";
  }

  if (estoque) {
    product.estoque = estoque;
    queryUpdate += "estoque = $2, ";
  }

  if (preco) {
    product.preco = preco;
    queryUpdate += "preco = $3, ";
  }

  if (descricao) {
    product.descricao = descricao;
    queryUpdate += "descricao = $4, ";
  }

  if (imagem) {
    product.imagem = imagem;
    queryUpdate += " imagem = $5 ";
  }

  queryUpdate += "where id = $6";

  console.log(queryUpdate);

  const updateProduct = await connection.query(queryUpdate, [
    nome,
    estoque,
    preco,
    descricao,
    imagem,
    id,
  ]);
  console.log(updateProduct);
};

const removeProduct = async (id, userId) => {
  const queryProductByUserId =
    "select * from produtos where id = $1 and usuario_id = $2";

  const { rowCount } = await connection.query(queryProductByUserId, [
    id,
    userId,
  ]);

  const error = {
    status: 404,
    message: "",
  };

  if (!rowCount) {
    error.message = "Produto não encontrado";
    return error;
  }

  const queryDelete = "delete from produtos where id = $1";

  const { rowCount: deletedProduct } = await connection.query(queryDelete, [
    id,
  ]);

  if (!deletedProduct) {
    error.status = 400;
    error.message = "Produto não pode ser deletado.";
    return error;
  }

  const sucessMessage = "Produto removido com sucesso!";

  return sucessMessage;
};

module.exports = {
  registerProduct,
  getOneProduct,
  updateProduct,
  removeProduct,
};
