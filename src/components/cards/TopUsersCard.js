import React from "react";
import clsx from "clsx";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ children, className }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
}));
