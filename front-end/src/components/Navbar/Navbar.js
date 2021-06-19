import React from "react";

import { Link } from "react-router-dom";

import useAuth from "../../hook/useAuth";

import { ReactComponent as Loja } from "../../assets/store-selected.svg";
import { ReactComponent as Perfil } from "../../assets/user.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

import "./style.css";

function Navbar() {
  const { deslogar } = useAuth();

  return (
    <div className="sidebar-container">
      <div className="btn-container">
        <Link to="/produtos">
          <div className="loja">
            <Loja />
          </div>
        </Link>
        <Link to="/perfil">
          <div className="perfil">
            <Perfil />
          </div>
        </Link>

        <Link to="/" onClick={deslogar}>
          <div className="logout">
            <Close />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
