import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, FormControlLabel } from "@material-ui/core";
import TextField from "components/inputs/TextField";

export default function BusinessForm({ handleChange, formData, errorMessages }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={4} lg={4} direction="column">
          <label className={classes.formLabel}>* Business Name</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.business_name}
            name="business_name"
            variant="filled"
            size="small"
            fullWidth
            placeholder="* Enter Business Name"
            errorMessage={errorMessages.filter((el) => el.name === 'business_name')}
          />
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
  },
  formLabel: {
    display: "block",
    color: theme.palette.text.disabled,
    fontWeight: 500,
    marginBottom: 3,
    fontSize: 12,
  },
  formInput: {
    width: 288,
  },
  formInput2: {
    width: 150,
  }
}));