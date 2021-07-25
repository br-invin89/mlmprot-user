import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Card from "components/cards/Card";
import BinaryTable from "./BinaryTable";
import BinaryDiagram from './BinaryDiagram'

export default function BinaryCard() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.totalStats}>Binary</Typography>
          <hr className={classes.horizontalBorder} />
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <BinaryTable />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <BinaryDiagram />
        </Grid>
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 12
  },
  totalStats: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#31394D",
  },
  horizontalBorder: {
    border: "1px solid #F1F1F1",
  },
}))
