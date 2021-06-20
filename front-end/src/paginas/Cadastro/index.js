import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./style";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

function Cadastro() {
  const classes = useStyles();
  const { register, control, handleSubmit, getValues } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit(data) {
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:8000/register", {
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

          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: "campo obrigatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Nome"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="nome_loja"
            control={control}
            defaultValue=""
            rules={{ required: "campo obrigatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Nome da loja"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "campo obrigatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />

          <TextField
            className={classes.textField}
            label="Senha"
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
                className={classes.textField}
                label="Repetir senha"
                value={value}
                onChange={onChange}
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

          <Button variant="contained" color="primary" type="submit">
            CRIAR CONTA
          </Button>

          {erro && <Alert severity="error">{erro}</Alert>}
          {carregando && <CircularProgress />}

          <div>
            <span className={classes.margin}>Primeira vez aqui?</span>
            <Link to="/">ACESSE</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
