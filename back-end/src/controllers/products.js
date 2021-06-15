const {
  registerProduct,
  getOneProduct,
  updateProduct,
  removeProduct,
} = require("../services/product");

const connection = require("../connection-db/connection");

const showProductsList = async (req, res) => {
  const {
    usuario: { id },
    query: { categoria },
  } = req;

  try {
    const querySelectProducts = `select * from produtos where usuario_id = $1 and categoria = $2`;

    const { rows: productsList } = await connection.query(querySelectProducts, [
      id,
      categoria,
    ]);

    return res.status(200).json(productsList);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const showProduct = async (req, res) => {
  const {
    params: { id },
    usuario: { id: userId },
  } = req;

  try {
    const product = await getOneProduct(id, userId);

    const { status, message } = product;

    if (status) {
      return res.status(status).json(message);
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const productRegister = async (req, res) => {
  const { nome, estoque, preco, descricao } = req.body;
  const {
    usuario: { id },
  } = req;

  if (!nome || !estoque || !preco || !descricao) {
    return res.status(400).json("Um ou mais campo obrigatório");
  }

  try {
    const newProducts = await registerProduct(req.body, id);
    const { status, message } = newProducts;

    if (newProducts.status === 400) {
      return res.status(status).json(message);
    }

    return res.status(201).json(newProducts);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const showUpdateProduct = async (req, res) => {
  const {
    body,
    body: { nome, estoque, preco, descricao },
    usuario: { id: userId },
    params: { id },
  } = req;

  // if ("nome" in body && !nome) {
  //   return res.status(400).json("Nome não pode ser vazio");
  // }

  // if ("estoque" in body && !estoque) {
  //   return res.status(400).json("Estoque não pode ser vazio");
  // }

  // if ("preco" in body && !preco) {
  //   return res.status(400).json("Preco não pode ser vazio");
  // }

  // if ("descricao" in body && !descricao) {
  //   return res.status(400).json("Descricao não pode ser vazio");
  // }

  if (!Object.keys(body).length) {
    return res.status(400).json("Informe os campos a serem alterados");
  }

  try {
    const product = await updateProduct(body, userId, id);
    const { status, message } = product;

    if (status) {
      return res.status(status).json(message);
    }

    return res.status(200).json("Produto atualizado");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const {
    params: { id },
    usuario: { id: userId },
  } = req;

  try {
    const removedProduct = await removeProduct(id, userId);
    const { status, message } = removedProduct;

    if (status === 404) {
      return res.status(status).json(message);
    }

    if (status === 400) {
      return res.status(status).json(message);
    }

    return res.status(200).json(removedProduct);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  productRegister,
  showProduct,
  showProductsList,
  showUpdateProduct,
  deleteProduct,
};
