const connection = require("../connection-db/connection");
const bcrypt = require("bcrypt");

const registerUser = async ({ nome, email, senha, nome_loja }) => {
  const error = {
    status: 400,
    message: "",
  };

  const queryCheckEmail = "select * from usuarios where email = $1";

  const { rowCount: numberUsers } = await connection.query(queryCheckEmail, [
    email,
  ]);

  if (numberUsers > 0) {
    error.message = "Email informado já foi cadastrado";
    return error;
  }

  const cryptPassword = await bcrypt.hash(senha, 10);

  const query =
    "insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)";
  const user = await connection.query(query, [
    nome,
    email,
    cryptPassword,
    nome_loja,
  ]);

  if (!user.rowCount) {
    error.message = "Não foi possível cadastrar usuário.";
    return error;
  }

  return "Usuario cadastrado com sucesso";
};

module.exports = {
  registerUser,
};
