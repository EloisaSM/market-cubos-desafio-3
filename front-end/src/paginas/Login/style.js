import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    gap: 40,

    width: 390,
    height: 590,

    backgroundColor: "#ffff",

    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",

    borderRadius: 16,
  },
  margin: {
    marginRight: 5,
  },
  containerContent: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",

    height: "100vh",
  },
}));

export default useStyles;
