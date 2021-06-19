import { useState } from "react";
import { useLocalStorage } from "react-use";

function useAuthProvider() {
  const [tokenPersistido, setTokenPersistido, removeTokenPersistido] =
    useLocalStorage("TOKEN", null);

  const [token, setToken] = useState(tokenPersistido);

  const logar = (token) => {
    setToken(token);
    setTokenPersistido(token);
  };

  const deslogar = () => {
    setToken(null);
    removeTokenPersistido();
  };

  return {
    token,
    logar,
    deslogar,
  };
}

export default useAuthProvider;
