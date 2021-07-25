import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Divider, Typography } from "@material-ui/core";
import Card from "components/cards/Card";
import CreditStatView from "./creditForms/CreditStatView";
import SettngsForm from "./creditForms/SettingsForm";
import ManualWithdrawForm from "./creditForms/ManualWithdrawForm";

export default function TransferCommissionsPage() {
  const classes = useStyle();
  const [shouldLoad, setShouldLoad] = useState(true)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card title="Transfer from Commission to Credit Wallet">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} xl={9}>
              <CreditStatView shouldLoad={shouldLoad} setShouldLoad={setShouldLoad} />
            </Grid>
            <Grid item xs={12} md={12} xl={9}>
              <SettngsForm />
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <Typography component="h2" variant="h6" className={classes.title}>
                Manual Withdraw
              </Typography>
              <ManualWithdrawForm setShouldLoad={setShouldLoad}/>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

const useStyle = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
}));
