/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Link, useHistory, useParams } from "react-router-dom";
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

import { ColorButton } from "./style";
import useStyles from "../EditarProduto/style";

import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hook/useAuth";

import backupImg from "../../assets/backupImg.png";

function EditarProduto() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [infoProduto, setInfoProduto] = useState({});
  const [infoLoja, setInfoLoja] = useState({});

  const { token } = useAuth();
  const { id } = useParams();

  async function onSubmit(data) {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
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

  useEffect(() => {
    const getPerfil = async () => {
      const resposta = await fetch(`http://localhost:8000/perfil`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { nome_loja } = await resposta.json();

      setInfoLoja({ nome_loja });
    };

    const getProduto = async () => {
      const resposta = await fetch(`http://localhost:8000/products/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { imagem } = await resposta.json();

      setInfoProduto({ imagem });
    };

    getPerfil();
    getProduto();
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.lojaContainer}>
        <Typography variant="h3">{infoLoja.nome_loja}</Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          EditarProduto
        </Typography>

        <form
          className={classes.formContainer}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.containerImgInput}>
            <div className={classes.inputs}>
              <TextField
                label="Nome do produto"
                {...register("nome")}
                type="text"
              />

              <div className={classes.precoEstoqueContainer}>
                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Preço
                  </InputLabel>
                  <Input
                    {...register("preco")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Estoque
                  </InputLabel>
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
            </div>

            <div className={classes.imgBox}>
              <img
                className={classes.img}
                src={infoProduto.imagem ? infoProduto.imagem : backupImg}
                alt="foto do produto"
              />
            </div>
          </div>

          <Divider />

          <div>
            <Link className={classes.link} to="/perfil">
              CANCELAR
            </Link>

            <ColorButton variant="contained" color="primary" type="submit">
              <Typography variant="button" display="block" gutterBottom>
                atualizar produto
              </Typography>
            </ColorButton>
          </div>
        </form>
        {erro && <Alert severity="error">{erro}</Alert>}
      </div>
    </div>
  );
}

export default EditarProduto;
