const { getPerfilUser, updateProfile } = require("../services/user");

const perfil = async (req, res) => {
  const {
    usuario: { id },
  } = req;

  try {
    const userProfile = await getPerfilUser(id);
    const { status, message } = userProfile;

    if (status === 404) {
      return res.status(status).json(message);
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const perfilUpdate = async (req, res) => {
  const {
    body,
    body: { nome, email, senha, nome_loja },
    usuario: { id },
  } = req;

  if (!Object.keys(body).length && !nome && !email && !senha && !nome_loja) {
    return res.status(400).json("Informe os campos a serem alterados");
  }

  try {
    const profileUpdated = await updateProfile(body, id);
    return res.json(profileUpdated);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { perfil, perfilUpdate };
