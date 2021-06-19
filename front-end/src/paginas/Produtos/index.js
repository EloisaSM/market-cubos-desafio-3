/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

import useAuth from "../../hook/useAuth";

import useStyles from "./style";
import { ColorButton } from "./style";
import ProdutoCard from "../../components/ProdutoCard/ProdutoCard";

import { ColorButton as DeleteButton } from "../../components/DeleteDialog/style";
import { ReactComponent as Delete } from "../../assets/delete.svg";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

function ListaProdutos() {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [nomeLoja, setNomeLoja] = useState("");

  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const carregarProdutos = useCallback(async () => {
    const resposta = await fetch("http://localhost:8000/products", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const listaProdutos = await resposta.json();

    setProdutos(listaProdutos);
  }, []);

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

    carregarProdutos();
    getPerfil();
  }, []);

  const deletarProduto = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const modalConfirmAction = useCallback(async (id) => {
    setLoading(true);
    await deletarProduto(id);
    carregarProdutos();
    setModalOpened(false);
    setLoading(false);
  }, []);

  const modalDeclineAction = useCallback(() => {
    setModalOpened(false);
  }, []);

  const openConfirmationModal = useCallback((id) => {
    setModalId(id);
    setModalOpened(true);
  }, []);

  return (
    <div className={classes.conteudoContainer}>
      <Navbar />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.lojaContainer}>
        <Typography variant="h3">{nomeLoja}</Typography>
        <Typography variant="h5">Seus Produtos</Typography>

        <DeleteDialog
          isOpened={modalOpened}
          id={modalId}
          confirmAction={modalConfirmAction}
          declineAction={modalDeclineAction}
        />

        <div className={classes.containerProdutos}>
          {produtos &&
            produtos.map((p) => (
              <div className={classes.root} key={p.id}>
                <DeleteButton
                  onClick={() => openConfirmationModal(p.id)}
                  variant="contained"
                  color="primary"
                >
                  <Delete />
                </DeleteButton>

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
