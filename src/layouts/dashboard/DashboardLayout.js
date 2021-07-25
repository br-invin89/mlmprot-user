import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Hidden } from "@material-ui/core";
import { getUser } from 'utils/auth';
import Topbar from "./topbar/Topbar";
import LeftSidebar from './sidebar/LeftSidebar';
import SubMenu from "./topbar/SubMenu";
import MobileMenu from "./sidebar/MobileMenu";
import LoadInit from "./LoadInit";

const DashboardLayout = ({ children, fullLayout, perms }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpenedDrawer, setIsOpenedDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsOpenedDrawer(true);
  };

  const handleDrawerClose = () => {
    setIsOpenedDrawer(false);
  };

  useEffect(() => {
    const myUser = getUser()
    if (!myUser) {
      history.push('/logout')
      return
    }
    if (myUser.verification_status==2) {
      if (perms.indexOf('need_verification')===-1) {
        history.push('/home')
      }
      return
    }
    if (myUser.tax_status==2) {
      if (perms.indexOf('need_tax')===-1) {
        history.push('/home')
      }
      return
    }
    if (myUser.type==1) {
      if (perms.indexOf('affiliate')===-1) {
        history.push('/home')
      }
      return
    }
    if (myUser.type==2 || myUser.type==3) {
      if (perms.indexOf('preferred')===-1) {
        history.push('/home')
      }
      return
    }
  }, [children])

  return (
    <div className={classes.root}>
      <LoadInit />
      <Topbar
        isOpenedDrawer={isOpenedDrawer}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Hidden smDown>
        <SubMenu className={classes.subMenu} />
      </Hidden>
      <Hidden mdDown>
        <LeftSidebar />
      </Hidden>
      <Hidden lgUp smDown>
        <LeftSidebar hideSubMenus/>
      </Hidden>
      <MobileMenu
        handleDrawerClose={handleDrawerClose}
        isOpenedDrawer={isOpenedDrawer}
      />
      <main className={classes.content}>
        {fullLayout?
          <div>
            {children}
          </div>
        :
          <Container maxWidth={false} className={classes.container}>
            {children}
          </Container>
        }
        
        {/*
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        */}
      </main>
    </div>
  );
};

export default DashboardLayout

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "280px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0'
    }
  },

  content: {
    flexGrow: 1,
    maxHeight: "calc(100vh - 60px)",
    // overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "calc(100vh - 70px)",
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      paddingLeft: 70,
      paddingRight: 70,
    },
  },
  subMenu: {},
}));
