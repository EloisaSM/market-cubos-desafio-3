import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Cadastro() {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [open, setOpen] = useState(false);

  async function onSubmit(data) {
    setErro("");
    setOpen(true);

    try {
      const resposta = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      const dados = await resposta.json();

      console.log(resposta);

      setOpen(false);

      // if (!resposta.ok) {
      //   setErro(dados);
      //   return;
      // }

      history.push("/");
    } catch (error) {
      setErro(error.message);
    }
  }
  return (
    <div className="login-container">
      <Typography variant="h4">Criar uma conta </Typography>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Nome"
          {...register("nome", { required: true })}
          type="text"
        />
        {errors.nome?.type === "required" && "Campo Obrigatório"}

        <TextField
          label="Nome da Loja"
          {...register("nomeLoja", { required: true })}
          type="text"
        />
        {errors.nomeLoja?.type === "required" && "Campo Obrigatório"}

        <TextField
          label="Email"
          {...register("Email", { required: true })}
          type="email"
        />
        {errors.email?.type === "required" && "Campo Obrigatório"}

        <TextField
          label="Senha"
          type="password"
          {...register("senha", { required: true })}
        />
        {errors.senha?.type === "required" && "Campo Obrigatório"}

        <TextField
          label="Repita a Senha"
          type="password"
          name="repetirSenha"
          {...register("repetirSenha", {
            validate: (value) => {
              return value === watch("senha");
            },
          })}
        />
        {errors.repetirSenha?.type === "validate" &&
          "Senhas precisam ser iguais"}

        <Button variant="contained" color="primary" type="submit">
          CRIAR CONTA
        </Button>

        {erro && <Alert severity="error">{erro}</Alert>}
        {open && <CircularProgress />}

        <span>
          Primeira vez aqui?
          <Link to="/" style={{ color: "blue" }}>
            ACESSE
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Cadastro;
