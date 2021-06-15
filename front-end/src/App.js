import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./paginas/Login/index";
import Cadastro from "./paginas/Cadastro/index";
import Perfil from "./paginas/Perfil/index";
import EditarPerfil from "./paginas/EditarPerfil/index";
import Produtos from "./paginas/Produtos/index";
import EditarProdutos from "./paginas/EditarProduto/index";
import NovoProduto from "./paginas/NovoProduto/index";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Login path="/" exact component={Login} />
          <Cadastro path="/cadastro" component={Cadastro} />
          <Produtos path="/produtos" component={Produtos} />
          <NovoProduto path="/produtos/novo" component={NovoProduto} />
          <EditarProdutos
            path="/produtos/:id/editar"
            component={EditarProdutos}
          />
          <Perfil path="/perfil" component={Perfil} />
          <EditarPerfil path="/perfil/editar" component={EditarPerfil} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
