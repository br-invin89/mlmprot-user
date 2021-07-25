import React from "react";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ children, className, title }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={fixedHeightPaper}>
      <div className={classes.titleRoot}>
        <Typography>{title}</Typography>
      </div>
      {children}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  fixedHeight: {
    height: 332,
  },
  titleRoot: {
    paddingLeft: theme.spacing(2.5),
  },
}));
