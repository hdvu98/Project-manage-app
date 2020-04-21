import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const layoutStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: { ...theme.mixins.toolbar },
  drawerPaper: {
    width: drawerWidth,
    padding: "8px 16px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerItem: {
    margin: "4px 0px",
    borderRadius: 20,
    "&:hover": {
      background: theme.palette.primary.light,
      color: "#fff",
      borderRadius: 20,
    },
  },
  activeTab: {
    background: theme.palette.primary.main,
    color: "#fff",
    borderRadius: 20,
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
  },
}));
export default layoutStyle;
