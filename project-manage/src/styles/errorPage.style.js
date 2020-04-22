import { makeStyles } from "@material-ui/core/styles";

const notFoundStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
  },
  code: {
    fontSize: 200,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  wrapperBtn: {
    paddingTop: 16,
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    display: "block",
  },
}));
export default notFoundStyle;
