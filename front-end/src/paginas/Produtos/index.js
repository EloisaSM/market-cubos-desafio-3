import React from "react";

import { Link } from "react-router-dom";

function ListaProdutos() {
  return (
    <div>
      Lista de Produtos
      <Link to="/produtos/novo">Editar Perfil</Link>
    </div>
  );
}

export default ListaProdutos;
