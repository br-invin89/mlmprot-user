import React, { useState, useEffect } from "react";
import Card from "components/cards/Card";
import { CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default () => {
  const classes = useStyles();

  return (
    <Card>
      <Typography
        className={classes.title}
        component={"h2"}
        color={"secondary"}
      >
        Aluva Makes It Easy To Get Paid!
      </Typography>
      <Typography
        className={classes.description}
        component={"p"}
        color={"secondary"}
      >
        IMPORTANT: To Claim Your Commissions, You MUST Select One of the Following Options. You Will not receive your commissions until you select how you would like to be paid.
      </Typography>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
}));
