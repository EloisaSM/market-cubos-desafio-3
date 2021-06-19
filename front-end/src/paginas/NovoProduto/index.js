import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useStyles } from "./style";
import { ColorButton } from "./style";

import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hook/useAuth";

function NovoProduto() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { token } = useAuth();

  async function onSubmit(data) {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:8000/products", {
        method: "POST",
        body: JSON.stringify(data),
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

      history.push("/produtos");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.lojaContainer}>
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Adicionar produto
        </Typography>

        <form
          className={classes.formContainer}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Nome do produto"
            {...register("nome")}
            type="text"
          />

          <div className={classes.precoEstoqueContainer}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
              <Input
                {...register("preco")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
              <Input
                {...register("estoque")}
                startAdornment={
                  <InputAdornment position="start">Un</InputAdornment>
                }
              />
            </FormControl>
          </div>

          <TextField
            label="Descrição do produto"
            {...register("descricao")}
            type="text"
          />

          <TextField label="Imagem" {...register("imagem")} type="text" />

          <Divider className={classes.divider} />

          <div>
            <Link className={classes.link} to="/produtos">
              CANCELAR
            </Link>

            <ColorButton variant="contained" color="primary" type="submit">
              <Typography variant="button" display="block" gutterBottom>
                adicionar produto
              </Typography>
            </ColorButton>
          </div>
        </form>
        {erro && <Alert severity="error">{erro}</Alert>}
      </div>
    </div>
  );
}

export default NovoProduto;
