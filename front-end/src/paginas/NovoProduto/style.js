import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "48px",
  },
  subtitle: {
    fontSize: "34px",
  },
  precoEstoqueContainer: {
    display: "flex",
    gap: "24px",
  },
  lojaContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,

    minWidth: "80%",
    padding: "78px 0 24px 74px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  input: {
    width: "36%",
  },

  divider: {
    marginTop: 50,
  },

  link: {
    marginRight: 24,
    textDecoration: "underline",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#007DFF",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
}))(Button);
