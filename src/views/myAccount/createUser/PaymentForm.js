import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Grid, Checkbox, 
  FormControlLabel, Button, 
  Typography, CircularProgress,
} from '@material-ui/core'
import TextField from 'components/inputs/TextField'
import SelectField from 'components/inputs/SelectField'
import { countryName } from 'config/var'

export default function PaymentForm(props) {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    cc_name: '', cc_number: '', cc_type: '',
    cc_cvv: '', cc_exp_year: '', cc_exp_month: '', 
    billing_zipcode: '', billing_country: '',
    billing_state: '', billing_address: '',
    billing_city: '', billing_address_line2: ''
  })

  const onFormData = (e) => {
    let formData_ = { ...formData, 
      [e.target.name]: e.target.value
    }
    setFormData(formData_)
    props.setBillingData(formData_)
  }

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.billingData,
    })
  }, [props.billingData])

  return (
    <Grid container spacing={1} className={classes.root}>
      {/*
      promotionCode ?
        <Grid item xs={12} direction='column'>
          <Grid item xs={12} md={6} lg={6}>
            <label>Promotion coode {promotionCode} is applied.</label>
          </Grid>
        </Grid>
      :
        <Grid item xs={12} direction='column'>
          <Grid item xs={12} md={6} lg={6} >
            <label className={classes.formLabel}>Promotion Code</label>
            <Grid>
              <TextField
                value={couponCode}
                onChange={e=>setCouponCode(e.target.value)}
                name='coupon_code'
                variant='filled'
                size='small'
                fullWidth
                placeholder='Promotion code'
                className={classes.promotionInput}
              />
              <Button 
                variant={'contained'}
                color={'primary'}
                size={'small'}
                className={classes.promotionBtn}
                onClick={()=>checkCoupon(couponCode)}
              >Apply</Button>
            </Grid>
          </Grid>
        </Grid>
      */}
      <Grid item xs={12} direction='column'>
        <Grid item xs={12} md={4} lg={4} >
          <label className={classes.formLabel}>Payment Method</label>
          <SelectField 
            value={props.payType}
            onChange={e=>props.setPayType(e.target.value)}
            placeholder={'Payment Method'}
            fullWidth
            options={[
              // {value: 'credit', label: 'Credit Card'},
              // {value: 'coin', label: 'Bitcoin'},
              {value: 'wallet', label: 'Credit Wallet'},
            ]}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction='column'>
        <label className={classes.formLabel}>Name on Card</label>
        <TextField
          value={formData.cc_name}
          onChange={onFormData}
          name='cc_name'
          variant='filled'
          size='small'
          fullWidth
          placeholder='Name on Card'
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction='column'>
        <label className={classes.formLabel}>Credit Card Type</label>
        <SelectField
          value={formData.cc_type}
          onChange={onFormData}
          name='cc_type'
          variant='filled'
          size='small'
          fullWidth
          placeholder='Credit Card Type'
          options={[
            { label: '', value: '' },
            { label: 'Visa', value: 'Visa'},
            { label: 'Mastercard', value: 'Mastercard'},
          ]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={5} direction='column'>
        <label className={classes.formLabel}>Credit Card Number</label>
        <TextField
          value={formData.cc_number}
          onChange={onFormData}
          name='cc_number'
          variant='filled'
          size='small'
          fullWidth
          placeholder='Credit Card Number'
        />
      </Grid>      
      <Grid item xs={12} md={4} lg={4} direction='column'>
        <label className={classes.formLabel}>Exp Date</label>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <SelectField
            value={formData.cc_exp_month}
            onChange={onFormData}
            name='cc_exp_month'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Exp.Month'
            style={{ width: 100 }}
            options={[
              { label: '', value: '' },
              ...[...Array(12).keys()].map(i => (
                { label: i+1, value: i<9?('0'+(i+1)):(i+1)}
              ))
            ]}
          />&nbsp;/&nbsp;
          <SelectField
            value={formData.cc_exp_year}
            onChange={onFormData}
            name='cc_exp_year'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Exp.Year'
            style={{ width: 100 }}
            options={[
              { label: '', value: '' },
              ...[...Array(20).keys()].map(i => (
                { label: moment().add(i, 'years').format('YYYY'), value: moment().add(i, 'years').format('YY')}
              ))
            ]}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={3} lg={3} direction='column'>
        <label className={classes.formLabel}>Security Code</label>
        <TextField
          value={formData.cc_cvv}
          onChange={onFormData}
          name='cc_cvv'
          variant='filled'
          size='small'
          fullWidth
          placeholder='Security Code'
        />
      </Grid>      
      <Grid item xs={12} md={12} lg={12} direction='column'>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isSameAddress}
              onChange={e=>props.setIsSameAddress(e.target.checked)}
            />
          }
          label='Same as Shipping Address'
        />
      </Grid>      
      {!props.isSameAddress && 
      <>
        <Grid item xs={12} md={12} lg={6} direction='column'>
          <label className={classes.formLabel}>Address</label>
          <TextField
            value={formData.billing_address}
            onChange={onFormData}
            name='billing_address'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing Address'
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} direction='column'>
          <label className={classes.formLabel}>Address Line 2</label>
          <TextField
            value={formData.billing_address_line2}
            onChange={onFormData}
            name='billing_address_line2'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing Address Line 2'
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={3} direction='column'>
          <label className={classes.formLabel}>Country</label>
          <TextField
            value={countryName(formData.billing_country)}
            disabled
            name='billing_country'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing Country'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} direction='column'>
          <label className={classes.formLabel}>State</label>
          <TextField
            value={formData.billing_state}
            onChange={onFormData}
            name='billing_state'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing State'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} direction='column'>
          <label className={classes.formLabel}>City</label>
          <TextField
            value={formData.billing_city}
            onChange={onFormData}
            name='billing_city'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing City'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3} direction='column'>
          <label className={classes.formLabel}>Zip/Postal Code</label>
          <TextField
            value={formData.billing_zipcode}
            onChange={onFormData}
            name='billing_zipcode'
            variant='filled'
            size='small'
            fullWidth
            placeholder='Billing Zip/Postal Code'
          />
        </Grid>
      </>
      }
      {/*
      <Grid item xs={12} md={12} lg={12} direction='column'>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isShowAutoship}
              onChange={e=>props.setIsShowAutoship(e.target.checked)}
              name='autoship'
            />
          }
          label='Setup Autoship'
        />
      </Grid>
      */}
      { !props.isShowAutoship &&
      <Grid item container xs={12} justify={'space-between'} >
        <Button
          color='primary'
          variant='contained'
          onClick={props.goReview}
        >
          Confirm
        </Button>
        {/*
        <div>
          <Button
            color='secondary'
            onClick={props.calculateShipping}
            disabled={props.isCalculatingTax}
          >
            Calculate Shipping
          </Button>
          <Button
            color='secondary'
            onClick={props.calculateTax}
            disabled={props.isCalculatingTax}
          >
            {props.isCalculatingTax &&
              <CircularProgress size={18} style={{marginRight: 8}} />
            }
            Calculate Tax
          </Button>
        </div>
        */}
      </Grid>
      }
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
  },
  formLabel: {
    display: 'block',
    color: theme.palette.text.disabled,
    fontWeight: 500,
    marginBottom: 3,
  },
  promotionInput: {
    width: 'calc(100% - 120px)',
    marginRight: 8
  },
  promotionBtn: {
    width: '100px'
  }
}))
