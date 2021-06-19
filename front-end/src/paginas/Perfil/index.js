/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useStyles from "./style";
import Divider from "@material-ui/core/Divider";
import { ColorButton } from "./style";

import useAuth from "../../hook/useAuth";

import NavBar from "../../components/Navbar/Navbar";

function Perfil() {
  const classes = useStyles();
  const [usuario, setUsuario] = useState({});
  const history = useHistory();

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
    <div className={classes.root}>
      <NavBar />

      <div className={classes.perfilInfo}>
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography variant="subtitle1">Perfil</Typography>

        <form className={classes.formContainer} noValidate autoComplete="off">
          <TextField
            className={classes.input}
            disabled
            id="nome"
            label="Nome"
            value={usuario.nome || ""}
          />

          <TextField
            className={classes.input}
            disabled
            id="nome-Loja"
            label="Nome da Loja"
            value={usuario.nome_loja || ""}
          />

          <TextField
            className={classes.input}
            disabled
            id="email"
            label="E-mail"
            value={usuario.email || ""}
          />
        </form>

        <Divider />

        <div>
          <Link className={classes.link} to="/perfil">
            CANCELAR
          </Link>

          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => history.push("/perfil/editar")}
          >
            <Typography variant="button" display="block" gutterBottom>
              editar perfil
            </Typography>
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
