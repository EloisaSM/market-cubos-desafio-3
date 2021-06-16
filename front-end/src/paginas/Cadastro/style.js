import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeContent: "center",
    gap: "15px",
  },
  Typography: {
    h4: {
      marginBottom: "80px",
    },
  },
}));

export default useStyles;
