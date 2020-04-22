import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const viewDetailStyle = makeStyles((theme) => ({
  header: {
    alignSelf: "center",
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    display: "block",
  },
  btnWrapper: {
    padding: "13px 0px 8px 8px",
    display: "flex",
    alignItems: "stretch",
  },
}));
export default viewDetailStyle;
