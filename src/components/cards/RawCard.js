import React from "react";
import clsx from "clsx";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ children, title, className, contentStyle }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)}>
      {children}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
}));
