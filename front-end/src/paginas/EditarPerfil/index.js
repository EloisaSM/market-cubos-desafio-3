import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ColorButton } from "./style";
import NavBar from "../../components/Navbar/Navbar";
import useStyles from "./style";

import useAuth from "../../hook/useAuth";

function EditarPerfil() {
  const classes = useStyles();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const { register, control, handleSubmit, getValues } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const { token } = useAuth();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(data) {
    console.log(data);
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

      history.push("/perfil");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.perfilInfo}>
        <Typography variant="h4">Editar Perfil</Typography>
        <form
          className={classes.formContainer}
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

          <TextField
            className={clsx(classes.margin)}
            label="Nova senha"
            id="password"
            {...register("senha")}
            type={values.showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Controller
            name="repetirSenha"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) =>
                value === getValues("senha") || "Senhas precisam ser iguais",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Nova senha"
                value={value}
                onChange={onChange}
                className={clsx(classes.margin)}
                error={!!error}
                helperText={error ? error.message : null}
                type={values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Divider className={classes.divider} />

          <div>
            <Link className={classes.link} to="/perfil">
              CANCELAR
            </Link>

            <ColorButton
              variant="contained"
              color="primary"
              onClick={() => history.push("/perfil/editar")}
              type="submit"
            >
              <Typography variant="button" display="block" gutterBottom>
                editar perfil
              </Typography>
            </ColorButton>
          </div>
          {erro && <Alert severity="error">{erro}</Alert>}
          {carregando && <CircularProgress />}
        </form>
      </div>
    </div>
  );
}

export default EditarPerfil;
