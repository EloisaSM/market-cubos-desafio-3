import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import { useStyles } from "./style";
import { ColorButton } from "./style";

import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hook/useAuth";

function NovoProduto() {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, control } = useForm();
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
          <Controller
            className={classes.input}
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: "campo obrigatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.input}
                label="Nome do Produto"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <div className={classes.precoEstoqueContainer}>
            <Controller
              name="preco"
              control={control}
              defaultValue=""
              rules={{ required: "campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Preço"
                  id="preco"
                  error={!!error}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Controller
              name="estoque"
              control={control}
              defaultValue=""
              rules={{ required: "campo obrigatório" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Estoque"
                  id="estoque"
                  error={!!error}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Un</InputAdornment>
                    ),
                  }}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </div>

          <Controller
            name="descricao"
            control={control}
            defaultValue=""
            rules={{ required: "campo obrigatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.input}
                size="small"
                label="Descricao do produto"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="imagem"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.input}
                label="Imagem"
                value={value}
                onChange={onChange}
              />
            )}
          />

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
