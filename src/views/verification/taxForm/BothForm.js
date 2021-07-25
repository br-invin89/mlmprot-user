import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import clsx from 'clsx'
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { userTaxFormStatusOptions } from "config/var";
import { statesByCountry } from 'config/var/country'

export default function BothForm({ handleChange, formData, errorMessages }) {
  const classes = useStyles();
  const [stateOptions, setStateOptions] = useState([])

  useEffect(() => {
    let stateOptions2 = statesByCountry('US')
    let stateOptions_ = stateOptions2.map(el => ({ label: el.name, value: el.name }))
    setStateOptions([
      { label: '', value: 'Enter State' },
      ...stateOptions_
    ])
  }, [])

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        <Grid item >
          <label className={classes.formLabel}>* Address Line 1</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.address}
            name="address"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Address Line 1"
            errorMessage={errorMessages.filter((el) => el.name === 'address')}
          />
        </Grid>
        <Grid item>
          <label className={classes.formLabel}>Address Line 2</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.address_line2}
            name="address_line2"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Address Line 2"
          />
        </Grid>
        <Grid item>
          <label className={classes.formLabel}>* City</label>
          <TextField
            className={clsx(classes.formInput, classes.formInput2)}
            onChange={handleChange}
            value={formData.city}
            name="city"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter City"
            errorMessage={errorMessages.filter((el) => el.name === 'city')}
          />
        </Grid>
        <Grid item >
          <label className={classes.formLabel}>* State/Province</label>
          <SelectField
            className={clsx(classes.formInput, classes.formInput2)}
            onChange={handleChange}
            value={formData.state}
            name="state"
            options={stateOptions}
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter State"
            errorMessage={errorMessages.filter((el) => el.name === 'state')}
          />
        </Grid>
        <Grid item >
          <label className={classes.formLabel}>* ZIP/Postal Code</label>
          <TextField
            className={clsx(classes.formInput, classes.formInput2)}
            onChange={handleChange}
            value={formData.zip_code}
            name="zip_code"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter ZIP Code"
            errorMessage={errorMessages.filter((el) => el.name === 'zip_code')}
          />
        </Grid>
        <Grid item>
          <label className={classes.formLabel}>* Phone</label>
          <TextField
            className={classes.formInput}
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            variant="filled"
            size="small"
            fullWidth
            placeholder="Enter Phone"
            errorMessage={errorMessages.filter((el) => el.name === 'phone')}
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