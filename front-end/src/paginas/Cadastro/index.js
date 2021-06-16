import React, { useRef } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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

  function onSubmit(data) {
    console.log(data);

    if (data.repetirSenha !== data.senha) {
      return "Senhas devem ser repetidas";
    }

    history.push("/");
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
