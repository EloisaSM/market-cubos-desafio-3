const { registerUser } = require("../services/login-register");

const register = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(400).json("Campo nome é obrigatório");
  }

  if (!email) {
    return res.status(400).json("Campo email é obrigatório");
  }

  if (!senha) {
    return res.status(400).json("Campo senha é obrigatório");
  }

  if (!nome_loja) {
    return res.status(400).json("Nome da loja é um campo obrigatório");
  }

  try {
    const userRegistered = await registerUser(req.body);

    const { status, message } = userRegistered;

    if (typeof userRegistered === "object") {
      return res.status(status).json(message);
    }

    return res.json(userRegistered);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  register,
};
