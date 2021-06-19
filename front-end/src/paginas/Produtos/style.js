import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "232px",
    position: "relative",
  },
  conteudoContainer: {
    display: "flex",

    height: "100vh",
  },
  lojaContainer: {
    padding: "78px 0px 24px 74px",
    minWidth: "80%",

    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  containerProdutos: {
    display: "flex",
    gap: 24,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const ColorButton = withStyles((theme) => ({
  root: {
    maxWidth: "18%",
    backgroundColor: "#007DFF",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
}))(Button);

export default useStyles;
