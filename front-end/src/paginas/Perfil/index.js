import React from "react";

import { Link } from "react-router-dom";

function Perfil() {
  return (
    <div>
      Perfil
      <Link to="/perfil/editar">EDITAR PERFIL</Link>
    </div>
  );
}

export default Perfil;
