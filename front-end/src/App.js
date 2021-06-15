import "./App.css";

import Login from "./paginas/Login/index";
import Cadastro from "./paginas/Cadastro/index";
import Perfil from "./paginas/Perfil/index";
import EditarPerfil from "./paginas/EditarPerfil/index";
import Produtos from "./paginas/Produtos/index";
import EditarProdutos from "./paginas/Editar Produto/index";

function App() {
  return (
    <div>
      <Login />
      <Cadastro />
      <Perfil />
      <EditarPerfil />
      <Produtos />
      <EditarProdutos />
    </div>
  );
}

export default App;
