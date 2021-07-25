import React from "react";
import { useSelector } from 'react-redux'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Hidden,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./Logo";
// import MainMenu from "./MainMenu";
// import QuickMenu from "./QuickMenu";
import MyAccountMenu from "./MyAccountMenu";

export default function PrimarySearchAppBar({
  isOpenedDrawer,
  handleDrawerOpen,
}) {
  const classes = useStyles();
  const myUser = useSelector(state=>state.auth.user)

  return (
    <div className={classes.grow}>
      <AppBar position="static" elevation={0} className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Hidden mdUp>
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  isOpenedDrawer && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <Logo />
              {/*
              <Hidden mdDown>
                <Logo />
                <MainMenu />
              </Hidden>
              <Hidden mdDown>
                <QuickMenu />
              </Hidden>
              */}
              <MyAccountMenu />
            </Toolbar>
          </Hidden>
        </Container>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {    
    [theme.breakpoints.up("md")]: {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: "#1a1a1a",
  },
  toolbar: {
    paddingTop: theme.spacing(1.2),
    minHeight: 60,
    paddingLeft: 0,
    paddingRight: 0,
  },
  hide: {
    display: "none",
  },
}));
