import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid, Button, Select,
  MenuItem, CircularProgress
} from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { statesByCountry } from 'config/var'
import { countryName } from 'config/var'

export default function ShippingForm(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    shipping_zipcode: '', shipping_country: '',
    shipping_state: '', shipping_address: '',
    shipping_city: '', shipping_address_line2: ''
  })

  const onFormData = (e) => {
    let formData_ = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(formData_)
    props.setShippingData(formData_)
  }

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.shippingData,
    })
  }, [props.shippingData])
  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Address Line 1</label>
        <TextField
          value={formData.shipping_address}
          onChange={onFormData}
          name="shipping_address"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Shipping Address"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Address Line 2 (Optional)</label>
        <TextField
          value={formData.shipping_address_line2}
          onChange={onFormData}
          name="shipping_address_line2"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Shipping Address line 2"
        />
      </Grid>
      
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>City</label>
        <TextField
          value={formData.shipping_city}
          onChange={onFormData}
          name="shipping_city"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Shipping City"
        />
      </Grid>
      
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>State/Province</label>
        <SelectField
          value={formData.shipping_state}
          onChange={onFormData}
          defaultValue="asd"
          name="shipping_state"
          variant="filled"
          size="small"
          fullWidth
          options={[
            ...statesByCountry(formData.shipping_country).map((state) => {
              return ({
                label: state['name'],
                value: state['name'],
              })
            })
          ]}
          placeholder="Shipping State"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Country</label>
        <TextField
          value={countryName(formData.shipping_country)}
          disabled
          name="shipping_country"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Shipping Country"
        />
      </Grid>
      
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Zip/Postal Code</label>
        <TextField
          value={formData.shipping_zipcode}
          onChange={onFormData}
          name="shipping_zipcode"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Shipping Zip/Postal Code"
        />
      </Grid>
      <Grid item container xs={12} justify={'space-between'} >
        <Button
          color='primary'
          variant='contained'
          onClick={props.goReview}
          disabled={props.isLoading}
        >
          {props.isLoading?<CircularProgress size={24} />:'Confirm'}
        </Button>
      </Grid>
    </Grid>
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
