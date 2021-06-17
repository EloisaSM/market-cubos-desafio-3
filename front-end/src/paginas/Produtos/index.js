import React from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ProdutoCard from "../../components/ProdutoCard/ProdutoCard";
import "./style.css";

function ListaProdutos() {
  const history = useHistory();

  return (
    <div className="conteudo-container">
      <Navbar />
      <div className="loja-container">
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography variant="subtitle1">Seus Produtos</Typography>

        <div className="container-produtos">
          <ProdutoCard />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/produtos/novo")}
        >
          <Typography variant="button" display="block" gutterBottom>
            adicionar produto
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default ListaProdutos;
