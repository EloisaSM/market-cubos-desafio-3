import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useStyles from "./style";

import useAuth from "../../hook/useAuth";

import NavBar from "../../components/Navbar";

function Perfil() {
  const classes = useStyles();
  const [erro, setErro] = useState("");
  const [usuario, setUsuario] = useState({});

  const { token } = useAuth();

  useEffect(() => {
    async function carregarPerfil() {
      const resposta = await fetch("http://localhost:8000/perfil", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dadosUsuario = await resposta.json();

      setUsuario(dadosUsuario);
    }

    carregarPerfil();
  }, []);

  return (
    <div className="conteudo-container">
      <NavBar />

      <div className={classes.perfilContainer}>
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography variant="subtitle1">Perfil</Typography>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="Nome"
            value={usuario.nome || ""}
          />

          <TextField
            disabled
            id="standard-disabled"
            label="Nome da Loja"
            value={usuario.nome_loja || ""}
          />

          <TextField
            disabled
            id="standard-disabled"
            label="E-mail"
            value={usuario.email || ""}
          />
        </form>

        <Button variant="contained" color="primary">
          <Typography variant="button" display="block" gutterBottom>
            editar perfil
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Perfil;
