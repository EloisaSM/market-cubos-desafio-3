import { useState } from "react";

function useAuthProvider() {
  const [token, setToken] = useState(null);

  const logar = (token) => {
    setToken(token);
  };

  const deslogar = (cb) => {
    setToken(null);
    cb();
  };

  return {
    token,
    logar,
  };
}

export default useAuthProvider;
