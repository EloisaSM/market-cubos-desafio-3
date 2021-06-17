import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  subtitle: {
    margin: "86px 0px 57px 0px ",
    fontSize: "34px",
  },
  precoEstoqueContainer: {
    display: "flex",
    gap: "24px",
  },
}));
