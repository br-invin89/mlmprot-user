import React, { useEffect, useState } from "react";
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { userTaxFormTypeOptions } from "config/var";

export default function DocumentDetailsForm({ handleChange, formData, errorMessages }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        <Grid item>
          <label className={classes.formLabel}>
            * Social Security Number/Tax ID
          </label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.ssn_tax_id}
            name="ssn_tax_id"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Social Security Number/Tax ID"
            errorMessage={errorMessages.filter((el) => el.name === 'ssn_tax_id')}
          />
        </Grid>
        <Grid item>
          <label className={classes.formLabel}>* Type</label>
          <SelectField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.type}
            name="type"
            options={userTaxFormTypeOptions}
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Type"
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
    width: 100,
  }
}));