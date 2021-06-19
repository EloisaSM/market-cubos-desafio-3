import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import useAuth from "../../hook/useAuth";

function Login() {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { logar } = useAuth();

  async function onSubmit(data) {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      const dados = await resposta.json();

      setCarregando(false);

      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      logar(dados.token);

      history.push("/produtos");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className={classes.containerContent}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {erro && <Alert severity="error">{erro}</Alert>}
        <Typography variant="h4">Login</Typography>
        <TextField
          label="E-mail"
          {...register("email", { required: true })}
          type="email"
        />
        {errors.email?.type === "required" && "Campo Obrigatório"}

        <TextField
          label="Senha"
          type="password"
          {...register("senha", { required: true })}
          required
        />
        {errors.senha?.type === "required" && "Campo Obrigatório"}

        <Button variant="contained" color="primary" type="submit">
          Entrar
        </Button>
        <div>
          <span className={classes.margin}>Primeira vez aqui?</span>
          <Link to="/cadastro">CRIE UMA CONTA</Link>
        </div>
        {carregando && <CircularProgress />}
      </form>
    </div>
  );
}

export default Login;
