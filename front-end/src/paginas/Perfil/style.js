import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "48px",
  },
  subtitle: {
    fontSize: "34px",
  },
  perfilInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 30,

    width: 900,

    padding: "78px 0 24px 74px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  input: {
    maxWidth: 390,
  },
  btn: {},
  divider: {
    marginTop: 50,
    width: "150%",
  },
  link: {
    marginRight: 24,
    textDecoration: "underline",
  },
}));

export const ColorButton = withStyles((theme) => ({
  root: {
    width: "18%",
    backgroundColor: "#007DFF",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
}))(Button);

export default useStyles;
