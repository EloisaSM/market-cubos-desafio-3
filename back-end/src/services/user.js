const connection = require("../connection-db/connection");
const bcrypt = require("bcrypt");

const getPerfilUser = async (id) => {
  const error = {
    status: 404,
    message: "",
  };

  const queryFindProfile =
    "select id, nome, email, nome_loja from usuarios where id = $1";

  const { rows, rowCount } = await connection.query(queryFindProfile, [id]);

  const user = rows[0];

  if (!rowCount) {
    error.message = "Usuário não encontrado";
    return error;
  }

  return user;
};

const updateProfile = async (data, id) => {
  const { nome, email, senha, nome_loja } = data;

  const error = {
    status: 404,
    message: "",
  };

  const queryFindProfile = "select * from usuarios where id = $1";

  const { rows, rowCount } = await connection.query(queryFindProfile, [id]);

  if (!rowCount) {
    error.message = "Usuário não encontrado";
    return error;
  }

  const user = rows[0];

  if (email !== user.email) {
    const { rowCount } = await connection.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount > 0) {
      return "Email já cadastrado";
    }
  }

  if (nome) {
    user.nome = nome;
  }

  if (nome_loja) {
    user.nome_loja = nome_loja;
  }

  if (email) {
    user.email = email;
  }

  if (senha) {
    const cryptPassword = await bcrypt.hash(senha, 10);
    user.senha = cryptPassword;
  }

  const queryUpdate = `update usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 where id = $5`;

  const updateUser = await connection.query(queryUpdate, [
    user.nome,
    user.nome_loja,
    user.email,
    user.senha,
    id,
  ]);

  if (!updateUser.rowCount) {
    error.status = 400;
    error.message = "Não foi possivel atualizar os dados";
  }

  return "Dados atualizados com sucesso!";
};

module.exports = {
  getPerfilUser,
  updateProfile,
};
