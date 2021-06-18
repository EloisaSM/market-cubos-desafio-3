import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickMostrarSenha = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

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

      await resposta.json();

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
    <div className={classes.containerContent}>
      <div>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h4">Criar uma conta </Typography>
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

          <FormControl className={clsx(classes.widthSenha)}>
            <InputLabel htmlFor="senha">Senha</InputLabel>
            <Input
              id="senha-Repetida"
              {...register("senha")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="mudando visibilidade da senha"
                    onClick={handleClickMostrarSenha}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl className={clsx(classes.widthSenha)}>
            <InputLabel htmlFor="senha">Repita a nova senha</InputLabel>
            <Input
              id="senha"
              {...register("senhaRepetida")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="mudando visibilidade da senha"
                    onClick={handleClickMostrarSenha}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.repetirSenha?.type === "validate" &&
            "Senhas precisam ser iguais"}

          <Button variant="contained" color="primary" type="submit">
            CRIAR CONTA
          </Button>

          {erro && <Alert severity="error">{erro}</Alert>}
          {open && <CircularProgress />}

          <div>
            <span className={classes.margin}>Primeira vez aqui?</span>
            <Link to="/cadastro">CRIE UMA CONTA</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
