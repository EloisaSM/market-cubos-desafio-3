import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Navbar from "../../components/Navbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "./style";

import useAuth from "../../hook/useAuth";

function NovoProduto() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [erro, setErro] = useState("");
  const [open, setOpen] = useState(false);

  const { token } = useAuth();

  async function onSubmit(data) {
    setOpen(true);
    setErro("");

    console.log(data);

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

      setOpen(false);

      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      history.push("/");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="conteudo-container">
      <Navbar />
      <div className="loja-container">
        <Typography variant="h3">Nome da Loja</Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Adicionar produto
        </Typography>

        <form
          className={classes.root}
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

          <Link to="/produtos">CANCELAR</Link>
          <Button variant="contained" color="primary" type="submit">
            <Typography variant="button" display="block" gutterBottom>
              adicionar produto
            </Typography>
          </Button>
        </form>
        {erro && <Alert severity="error">{erro}</Alert>}
      </div>
    </div>
  );
}

export default NovoProduto;
