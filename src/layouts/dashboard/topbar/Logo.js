import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import LogoImage from "assets/images/navLogo.png";
import { ReactComponent as Logo } from "assets/images/logo.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 29,
    [theme.breakpoints.down("sm")]: {
      height: 29,
    },
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Link to="/home">
      <img src={LogoImage} alt="logo" className={classes.logo} />
    </Link>
  );
};
