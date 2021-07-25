import React from "react";
import { useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { 
  accountMenus, accountMenusOnPreEnrollee, accountMenusOnCustomer, accountMenusOnFraud, 
  notificationMenu 
} from "../menus";

const StyledMenu = withStyles((theme) => ({
  paper: {
    borderRadius: 5,
    width: 340,
    boxShadow: "0px 2px 10px #E5E9F2",
    top: 20,
    padding: theme.spacing(0, 2.5, 2, 2.5),
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItemButton = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    justifyContent: "center",
    color: theme.palette.primary.main,
    marginTop: 8,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primaryInverted,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: 0,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primaryInverted,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.text.primaryInverted,
      },
    },
  },
}))(MenuItem);

export default function AccountDropDown({ anchorEl, handleClose }) {
  const classes = useStyle();
  const history = useHistory();
  const myUser = useSelector(state=>state.auth.user)
  const handleMenuClick = (item) => {
    history.push(item.path);
    handleClose();
  };
  return (
    <div>
      <StyledMenu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.header}>
          <Typography>My Account</Typography>
          {/* <IconButton>
            <MoreHorizIcon color="primary" />
          </IconButton> */}
        </div>
        {/* {notificationMenu.map((item) => (
          <StyledMenuItem onClick={() => handleMenuClick(item)}>
            <ListItemText
              primary={item.title}
              classes={{ primary: classes.notificationTitle }}
            />
            <ListItemSecondaryAction>
              <Typography color="primary" className={classes.notificationDate}>
                {item.date}
              </Typography>
            </ListItemSecondaryAction>
          </StyledMenuItem>
        ))} */}
        {/* <Link to="/" className={classes.notificationLink}>
          See all notifications
        </Link> */}
        <Divider />
        {((myUser && myUser.status==4)?
        accountMenusOnFraud:
        (myUser && myUser.type==2)?
        accountMenusOnPreEnrollee:
        (myUser && myUser.type==1)?
        accountMenusOnCustomer:        
        accountMenus).map((item) => (
          <StyledMenuItemButton onClick={() => handleMenuClick(item)}>
            {item.title}
          </StyledMenuItemButton>
        ))}
      </StyledMenu>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationTitle: {
    fontSize: 14,
    maxWidth: "65%",
    display: "inline-block",
  },
  notificationDate: {
    fontSize: 12,
  },
  notificationLink: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
    display: "block",
  },
}));
