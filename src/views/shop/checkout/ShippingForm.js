import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { countryName } from 'config/var'

export default ({ userData }) => {
  const classes = useStyles();
  return (
    userData? 
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>Address Line 1</label>
          <TextField
            value={userData.shipping_detail.shipping_address}
            disabled
            name="address"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Address"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>Address Line 2</label>
          <TextField
            value={userData.shipping_detail.shipping_address_line2}
            disabled
            name="address2"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Address line 2"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>City</label>
          <TextField
            value={userData.shipping_detail.shipping_city}
            disabled
            name="city"
            variant="filled"
            size="small"
            fullWidth
            placeholder="City"
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>State/Province</label>
          <TextField
            value={userData.shipping_detail.shipping_state}
            disabled
            name="state"
            variant="filled"
            size="small"
            fullWidth
            placeholder="State"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>Zip/Postal Code</label>
          <TextField
            value={userData.shipping_detail.shipping_zipcode}
            disabled
            name="postal_code"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Zip/Postal Code"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} direction="column">
          <label className={classes.formLabel}>Country</label>
          <TextField
            value={countryName(userData.shipping_detail.shipping_country)}
            disabled
            name="country"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Country"
          />
        </Grid>
        
      </Grid>
    : ''
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
  },
  formLabel: {
    display: "block",
    color: theme.palette.text.disabled,
    fontWeight: 500,
    marginBottom: 3,
  },
}));
