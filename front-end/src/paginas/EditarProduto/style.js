import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: "48px",
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
  containerImgInput: {
    display: "flex",
    gap: 100,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  divider: {
    marginTop: 50,
  },

  link: {
    marginRight: 24,
    textDecoration: "underline",
  },
  imgBox: {
    width: 310,
    height: 402,
    alignSelf: "center",
    background: "white",
    borderRadius: "16px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
