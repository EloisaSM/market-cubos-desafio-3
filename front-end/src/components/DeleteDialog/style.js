import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const ColorButton = withStyles((theme) => ({
  root: {
    top: "32%",
    color: "rgb(0, 0, 0, 0.7)",
    padding: 12,
    zIndex: 1,
    position: "absolute",
    minWidth: "unset",
    borderRadius: "50%",
    backgroundColor: "#FF505F",
    "&:hover": {
      backgroundColor: "#c4c4c4",
    },
  },
}))(Button);
