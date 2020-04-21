import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { layoutStyle } from "../../styles/";
import { DRAWER_MENU } from "../../constants/";

const PageLayout = (props) => {
  const { container, children, activeTab } = props;
  const history = useHistory();
  const classes = layoutStyle();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleChangeTab = (tab) => {
    history.push(`/${tab}`);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {DRAWER_MENU.map((item, index) => (
          <ListItem
            button
            key={item.display}
            onClick={() => handleChangeTab(item.link)}
            className={[
              classes.drawerItem,
              activeTab === item.link ? classes.activeTab : {},
            ].join(" ")}
          >
            <ListItemText primary={item.display} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <span className="material-icons">menu</span>
          </IconButton>
          <Typography variant="h6" noWrap>
            Project Manage App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="tabs">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

PageLayout.propTypes = {
  container: PropTypes.any,
  children: PropTypes.node,
};

export default PageLayout;
