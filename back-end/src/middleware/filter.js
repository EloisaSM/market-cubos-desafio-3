const connection = require("../connection-db/connection");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const verifyLogin = async (req, res, next) => {
  const {
    header: { authorization },
  } = req;

  if (!authorization) {
    return res.status(404).json("Obrigatório informar o token");
  }

  try {
    const { id } = jwt.verify(authorization, secret);

    const queryFindById = "select * from usuarios where id = $1";
    const { rows, rowCount } = await connection.query(queryFindById, [id]);

    if (!rowCount) {
      return res.status(404).json("Usuário não foi encontrado");
    }

    const { senha, ...user } = rows[0];

    req.usuario = user;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verifyLogin;
