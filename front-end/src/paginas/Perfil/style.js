import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  perfilContainer: {
    marginLeft: "80px",
  },
}));

export default useStyles;
