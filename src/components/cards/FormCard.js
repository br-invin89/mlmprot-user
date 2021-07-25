import React from "react";
import clsx from "clsx";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ children, className, title }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, className)}>
      <CardContent className={classes.content}>
        {" "}
        <Typography component="h2" variant="h5" className={classes.title}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
    overflow: 'visible',
  },
  content: {
    padding: theme.spacing(2, 4, 3, 3),
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
}));
