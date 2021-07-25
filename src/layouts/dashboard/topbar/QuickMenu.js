import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Hidden } from "@material-ui/core";
import { quickMenus, quickMenusOnPreEnrollee, quickMenusOnCustomer, quickMenusOnFraud } from "../menus";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = history.location;
  const myUser = useSelector(state=>state.auth.user)

  return (
    <div className={classes.grow}>
      <nav className={classes.rightNav}>
        {((myUser && myUser.status==4)?quickMenusOnFraud:
        (myUser && myUser.type==2)?quickMenusOnPreEnrollee:
        (myUser && myUser.type==1)?quickMenusOnCustomer:
        quickMenus).map((item) => (
          <IconButton
            key={item.title}
            hint={item.title}
            className={clsx(
              classes.menuIcon,
              pathname.indexOf(item.basepath)>=0 && classes.activeMenuIcon
            )}
            color="blue"
            to={item.path}
            component={Link}
          >
            {item.icon}
          </IconButton>
        ))}
      </nav>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  rightNav: {
    textAlign: "right",
  },

  menuIcon: {
    backgroundColor: "rgba(249, 249, 249, 0.1)",
    color: "rgb(255, 255, 255)",
    borderRadius: 5,
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    padding: 0,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: theme.palette.primary.dark,
    }
  },
  activeMenuIcon : {
    backgroundColor: "rgb(255, 255, 255)",
    color: theme.palette.primary.dark,
    
  }
}));
