import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Typography, Button, Hidden, Menu, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import NoPhotoImage from "assets/images/nophoto.jpg";
import { accountMenus } from "../menus";
import { removeStorage } from "utils/auth";
import AccountDropDown from "./AccountDropDown";

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const history = useHistory()
  const classes = useStyles();
  const userData = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  return (
    <div className={classes.userSection}>
      <Hidden smDown>
        <Button
          aria-controls="account-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
          className={classes.userMenu}
          startIcon={
            <img
              src={userData && userData.image ? userData.image : NoPhotoImage}
              alt="merry"
            />
          }
          endIcon={<ArrowDropDownIcon />}
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          <div>
            <Typography
              component="p"
              variant="body1"
              className={classes.username}
            >
              {userData ? `${userData.first_name} ${userData.last_name}` : ""}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              className={classes.userid}
            >
              #{userData ? userData.uuid : ""}
            </Typography>
          </div>
        </Button>
      </Hidden>
      <Hidden mdUp>
        <Button
          aria-controls="account-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
          className={classes.userMenu}
          // onClick={handleProfileMenuOpen}
          startIcon={
            <img
              src={userData && userData.image ? userData.image : NoPhotoImage}
              alt="merry"
            />
          }
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <div>
            <Typography
              component="p"
              variant="body1"
              className={classes.username}
            >
              {userData ? `${userData.first_name} ${userData.last_name}` : ""}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              className={classes.userid}
            >
              #{userData ? userData.uuid : ""}
            </Typography>
          </div>
        </Button>
        <ExitToAppIcon className={classes.logoutIcon} onClick={() =>  history.push('/logout')}/>  
      </Hidden>
      <AccountDropDown anchorEl={anchorEl} handleClose={handleMenuClose} />
      {/* <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {accountMenus.map((item) => (
          <MenuItem onClick={() => handleMenuClick(item)}>
            {item.title}
          </MenuItem>
        ))}
      </Menu> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  logoutIcon: {
    marginLeft: 5,
    marginBottom: -7,
    cursor: 'pointer'
  },
  userMenu: {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    boxShadow: "none",
    borderRadius: 25,
    margin: '5px 0',
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      boxShadow: "none",
    },
    "& img": {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover',
    },
  },
  username: {
    fontSize: theme.spacing(1.5),
    fontWeight: 500,
    textAlign: "left",
    marginLeft: 5,
    marginRight: 5,
    lineHeight: "1.2em",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1),
      width: '100%'
    },
  },
  userid: {
    fontSize: theme.spacing(1.5),
    fontWeight: 300,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(1),
      width: '100%'
    },
  },
  userSection: {
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
      textAlign: "right",
    },
  },
}));
