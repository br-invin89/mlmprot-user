import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import DateRangeField from 'components/inputs/DateRangeField'
import moment from 'moment'
import { countryStates, statesByCountry } from 'config/var'

export default function AutoshipForm(props) {
  const classes = useStyles();
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  })
  const [formData, setFormData] = useState({
    start_date: undefined,
    end_date: undefined,
    recurring_period: ''
  })

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.autoshipData,
    })
  }, [props.autoshipData])

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={8} lg={8} direction="column" style={{position: 'relative'}}>
        <label className={classes.formLabel}>Start/End Date</label>
        <DateRangeField
          value={date}
          handleChange={date=>{
            setDate(date)
            let formData_ = {
              ...formData,
              start_date: moment(date.startDate).format('YYYY-MM-DD'),
              end_date: moment(date.endDate).format('YYYY-MM-DD'),
            }
            setFormData(formData_)
            props.setAutoshipData(formData_)
          }}
          name="date"
          placeholder="Start/End Date"
          style={{width: '100%'}}
          leftAligned
          bottomAligned
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4} direction="column">
        <label className={classes.formLabel}>Frequency(days)</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={formData.recurring_period}
            onChange={e=>{
              let formData_ = {
                ...formData,
                recurring_period: e.target.value
              }
              setFormData(formData_)
              props.setAutoshipData(formData_)
            }}
            name="recurring_period"
            size="small"
          />
        </div>
      </Grid>
      <Grid item xs={12} md={5} lg={5} direction='column'>
        <Button
          fullWidth
          color='primary'
          variant='contained'
          onClick={props.handleAutoship}
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
