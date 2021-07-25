import React from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import CreditLogCard from "./issueCredit/CreditLogCard";

export default function IssueCreditPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CreditLogCard title="Issue Credit" />
      </Grid>
    </Grid>
  );
};
