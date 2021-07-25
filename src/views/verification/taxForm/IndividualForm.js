import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, FormControlLabel } from "@material-ui/core";
import TextField from "components/inputs/TextField";

export default function IndividualForm({ handleChange, formData, errorMessages }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        <Grid item >
          <label className={classes.formLabel}>* First Name</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.first_name}
            name="first_name"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter First Name"
            errorMessage={errorMessages.filter((el) => el.name === 'first_name')}
          />
        </Grid>
        <Grid item >
          <label className={classes.formLabel}>Middle Name</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.middle_name}
            name="middle_name"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Middle Name"
            errorMessage={errorMessages.filter((el) => el.name === 'middle_name')}
          />
        </Grid>
        <Grid item>
          <label className={classes.formLabel}>* Last Name</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.last_name}
            name="last_name"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Last Name"
            errorMessage={errorMessages.filter((el) => el.name === 'last_name')}
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