/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

import useAuth from "../../hook/useAuth";

import useStyles from "./style";
import { ColorButton } from "./style";
import ProdutoCard from "../../components/ProdutoCard/ProdutoCard";

function ListaProdutos() {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [nomeLoja, setNomeLoja] = useState("");

  useEffect(() => {
    const getPerfil = async () => {
      const resposta = await fetch(`http://localhost:8000/perfil`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { nome_loja } = await resposta.json();

      setNomeLoja(nome_loja);
    };

    async function carregarProdutos() {
      const resposta = await fetch("http://localhost:8000/products", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const listaProdutos = await resposta.json();

      setProdutos(listaProdutos);
    }

    carregarProdutos();
    getPerfil();
  }, [produtos]);

  return (
    <div className={classes.conteudoContainer}>
      <Navbar />
      <div className={classes.lojaContainer}>
        <Typography variant="h3">{nomeLoja}</Typography>
        <Typography variant="h5">Seus Produtos</Typography>

        <div className={classes.containerProdutos}>
          {produtos &&
            produtos.map((p) => (
              <div key={p.id}>
                <DeleteDialog id={p.id} />
                <Link to={`/produtos/${p.id}/editar`}>
                  <ProdutoCard {...p} />
                </Link>
              </div>
            ))}
        </div>

        <Divider />

        <ColorButton
          variant="contained"
          color="primary"
          onClick={() => history.push("/produtos/novo")}
          type="submit"
        >
          <Typography variant="button" display="block" gutterBottom>
            adicionar produtos
          </Typography>
        </ColorButton>
      </div>
    </div>
  );
}

export default ListaProdutos;
