import { useState } from "react";

function useAuthProvider() {
  const [token, setToken] = useState(false);

  const logar = (cb) => {
    setToken(true);
    cb();
  };

  const deslogar = (cb) => {
    setToken(false);
    cb();
  };

  return {
    token,
    logar,
    deslogar,
  };
}

export default useAuthProvider;
