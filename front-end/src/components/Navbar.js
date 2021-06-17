import React from "react";

import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as Loja } from "../assets/store-selected.svg";
import { ReactComponent as Perfil } from "../assets/user.svg";
import { ReactComponent as Close } from "../assets/close.svg";

const useStyles = makeStyles((theme) => ({
  root: {},
  sidebarContainer: {
    backgroundColor: "#434343",
    flexDirection: "column",
    height: "100vh",
    gap: "24px",
  },

  loja: {
    marginTop: "113px",
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.sidebarContainer}>
          <div className={classes.loja}>
            <Link to="/produtos" />
            <Loja />
          </div>
          <div className={classes.perfil}>
            <Link to="/perfil" />
            <Perfil />
          </div>
          <div className={classes.logout}>
            <Close />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
