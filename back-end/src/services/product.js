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

  const producUpdate = {
    status: "",
    message: "",
  };

  if (!rowCount) {
    producUpdate.message = "Produto não encontrado";
    producUpdate.status = 404;
    return producUpdate;
  }

  const product = rows[0];

  const queryUpdate =
    "update produtos set nome = $1, estoque = $2, preco = $3, descricao = $4, imagem = $5 where id = $6";

  if (nome) {
    product.nome = nome;
  }

  if (estoque) {
    product.estoque = estoque;
  }

  if (preco) {
    product.preco = preco;
  }

  if (descricao) {
    product.descricao = descricao;
  }

  if (imagem) {
    product.imagem = imagem;
  }

  const updateProduct = await connection.query(queryUpdate, [
    product.nome,
    product.estoque,
    product.preco,
    product.descricao,
    product.imagem,
    id,
  ]);

  if (!updateProduct.rowCount) {
    producUpdate.status = 400;
    producUpdate.message = "Não foi possivel atualizar o produto";
    return producUpdate;
  }

  producUpdate.status = 200;
  producUpdate.message = "Produto atualizado com sucesso!";

  return producUpdate;
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
