import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useStyles from "./style";

import NavBar from "../../components/Navbar";

function Perfil() {
  const classes = useStyles();

  return (
    <div className="conteudo-container">
      <NavBar />
      <div className="perfil-container">
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography variant="subtitle1">Perfil</Typography>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="Nome"
            defaultValue="Hello World"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="Nome da Loja"
            defaultValue="Hello World"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="E-mail"
            defaultValue="Hello World"
          />
        </form>
      </div>
    </div>
  );
}

export default Perfil;
