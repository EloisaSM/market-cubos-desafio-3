import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./Login.css";
import useAuth from "../../hook/useAuth";

function Login() {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();

  const { logar } = useAuth();

  function onSubmit(data) {
    console.log(data);

    logar(() => history.push("/produtos"));
  }

  return (
    <div className="login-container">
      <Typography variant="h4">Login</Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          Primary
        </Button>
        <span>
          Primeira vez aqui?
          <Link to="/cadastro">CRIE UMA CONTA</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
