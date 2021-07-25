import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { getSubmenuGroups } from "../menus";
import { Toolbar, Container, Button, Hidden } from "@material-ui/core";
import { snake2Pascal } from "utils/text";
import MyAccountMenu from "./MyAccountMenu";

const SubMenu = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const classes = useStyles();
  const mainMenuPath = pathname.split("/")[1];
  const submenuGroup = getSubmenuGroups(mainMenuPath);

  return (
    <div className={classes.wrapper}>
      <Container maxWidth={false} className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <h2 className={classes.menuTitle}>{snake2Pascal(mainMenuPath)}</h2>
          <Hidden mdDown>
            <div className={classes.submenus}>
              <div className={classes.subContainer}>
                <nav className={classes.menuList}>
                  {submenuGroup.map((item) => (
                    <Button
                      className={clsx(
                        classes.submenuLink,
                        pathname === item.path && classes.activeSubmenuLink
                      )}
                      component={Link}
                      to={item.path}
                    >
                      {item.title}
                    </Button>
                  ))}
                </nav>
              </div>  
            </div>  
          </Hidden>  
        </Toolbar>
        <MyAccountMenu />
      </Container>
    </div>
  );
};

export default SubMenu

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up("md")]: {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  wrapper: {
    flexGrow: 1,
    background: theme.palette.primary.dimGray,
    boxShadow: "0px 2px 10px rgba(203, 209, 223, 0.5)",
    minHeight: 50,
  },
  toolbar: {
    minHeight: 50,
    padding: 0,
  },
  hide: {
    display: "none",
  },
  menuTitle: {
    fontSize: 16,
    lineHeight: "1.5em",
    fontWeight: "500",
    textTransform: "uppercase",
    marginRight: 12,
  },
  submenuTitle: {
    fontSize: "1em",
  },
  submenus: {
    // overflowX: 'scroll',
    // width: '100%',
  },
  subContainer: {

  },
  // menuList: {
  //   width: '800px',
  // },
  submenuLink: {
    // height: 59,
    padding: "12px 14px",
    color: theme.palette.primary.main,
    fontSize: 14,
    marginLeft: theme.spacing(1.3),
    marginRight: theme.spacing(1.3),
    textTransform: "capitalize",
  },
  activeSubmenuLink: {
    backgroundColor: theme.palette.background.activePanel,
    fontWeight: 600,
    // backgroundColor: "#fff",
    // color: theme.palette.primary.main,
    "&:hover": {
      // backgroundColor: "#fff",
      // color: theme.palette.primary.main,
    },
  },
}));
