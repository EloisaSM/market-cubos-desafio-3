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

import { AuthProvider } from "./context/index";
import useAuth from "./hook/useAuth";

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Login path="/" exact component={Login} />
          <Cadastro path="/cadastro" component={Cadastro} />
          <RotasProtegidas>
            <EditarPerfil path="/perfil/editar" component={EditarPerfil} />
            <Perfil path="/perfil" component={Perfil} />
            <NovoProduto path="/produtos/novo" component={NovoProduto} />
            <EditarProdutos
              path="/produtos/:id/editar"
              component={EditarProdutos}
            />
            <Produtos path="/produtos" component={Produtos} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
