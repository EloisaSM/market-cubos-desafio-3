import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import NavBar from "../../components/Navbar";
import useStyles from "./style";

import useAuth from "../../hook/useAuth";

function EditarPerfil() {
  const classes = useStyles();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
  });
  const { register, handleSubmit } = useForm();

  const { token } = useAuth();

  const handleClickMostrarSenha = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  async function onSubmit(data) {
    setCarregando(true);
    setErro("");
    const dadosAtualizados = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );

    try {
      const resposta = await fetch("http://localhost:8000/perfil", {
        method: "PUT",
        body: JSON.stringify(dadosAtualizados),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await resposta.json();

      setCarregando(false);

      if (!resposta.ok) {
        setErro(dados);
        return;
      }
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="conteudo-container">
      <NavBar />
      <div className={classes.perfilInfo}>
        <Typography variant="h4">Editar Perfil</Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label="Seu nome" {...register("nome")} type="text" />

          <TextField
            label="Nome da Loja"
            {...register("nome_loja")}
            type="text"
          />

          <TextField label="Email" {...register("email")} type="email" />

          <FormControl className={clsx(classes.margin, classes.textField)}>
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

          <FormControl className={clsx(classes.margin, classes.textField)}>
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

          <Link to="/perfil">CANCELAR</Link>

          <Button variant="contained" color="primary" type="submit">
            <Typography variant="button" display="block" gutterBottom>
              editar perfil
            </Typography>
          </Button>
          {erro && <Alert severity="error">{erro}</Alert>}
          {carregando && <CircularProgress />}
        </form>
      </div>
    </div>
  );
}

export default EditarPerfil;
