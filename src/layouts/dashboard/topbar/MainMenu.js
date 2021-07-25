import React from "react";
import { useSelector } from 'react-redux'
import { useHistory, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { 
  mainMenus, mainMenusOnPreEnrollee, mainMenusOnFraud, mainMenusOnCustomer, 
} from "../menus";

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const myUser = useSelector(state=>state.auth.user)

  const { pathname } = history.location;
  return (
    <div className={classes.grow}>
      <nav className={classes.mainNav}>
        {(
          myUser && (myUser.status==4 || myUser.status==5)?mainMenusOnFraud:
          myUser.type==1?mainMenusOnCustomer:
          myUser.type==2?mainMenusOnPreEnrollee:
          mainMenus
        ).map(item => (
          <Button
            className={clsx(
              classes.menuItem,
              pathname.indexOf(item.basepath)>=0 && classes.activeMenuItem
            )}
            component={Link}
            to={item.path}
          >
            {item.title}
          </Button>
        ))}
      </nav>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  mainNav: {
    marginLeft: theme.spacing(3.2),
  },
  menuItem: {
    // height: 59,
    borderRadius: "5px 5px 0px 0px",
    padding: "16px 14px",
    color: theme.palette.text.primaryInverted,
    fontSize: 16,
    marginLeft: theme.spacing(1.3),
    marginRight: theme.spacing(1.3),
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.text.secondaryInverted,
      opacity: 0.8,
    },
  },
  activeMenuItem: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#fff",
      color: theme.palette.primary.main,
    },
  },
}));
