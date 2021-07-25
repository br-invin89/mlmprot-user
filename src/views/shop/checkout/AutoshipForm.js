import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import DateRangeField from 'components/inputs/DateRangeField'
import moment from 'moment'
import { countryStates, statesByCountry } from 'config/var'

export default function AutoshipForm({ autoshipData, setAutoshipData, doAutoship }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    day_of_month: ''
  })

  const onFormData = (field, value) => {
    let formData_ = {...formData, [field]: value}
    setAutoshipData(formData_)
    setFormData(formData_)
  }

  useEffect(() => {
    if (autoshipData) {
      setFormData(autoshipData)
    }
  }, [autoshipData])

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={24} md={12} lg={8} direction="column">
        <label className={classes.formLabel}>Day of month</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={formData.day_of_month}
            onChange={e=>onFormData('day_of_month', e.target.value )}
            size="small"
          />
        </div>
      </Grid>
      <Grid item xs={12} md={5} lg={5} direction='column'>
        <Button
          fullWidth
          color='primary'
          variant='contained'
          onClick={() => doAutoship()}
        >
          Autoship
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
    overflow: 'visible'
  },
  formLabel: {
    display: "block",
    color: theme.palette.text.disabled,
    fontWeight: 500,
    marginBottom: 3,
  },
}));
