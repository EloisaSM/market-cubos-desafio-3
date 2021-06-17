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

  return token ? props.children : <Redirect to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <RotasProtegidas>
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/perfil/editar" component={EditarPerfil} />
            <Route path="/produtos" exact component={Produtos} />
            <Route path="/produtos/novo" component={NovoProduto} />
            <Route path="/produtos/:id/editar" component={EditarProdutos} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
