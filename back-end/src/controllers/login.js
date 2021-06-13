const { loginUser } = require("../services/services");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("Campo e-mail e senha são obrigatórios");
  }

  try {
    const userLogin = await loginUser(req.body);
    const { status, message, userInfo: usuario, token } = userLogin;

    if (status === 400 || status === 404) {
      return res.status(status).json(message);
    }

    return res.status(200).json({ usuario, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { login };
