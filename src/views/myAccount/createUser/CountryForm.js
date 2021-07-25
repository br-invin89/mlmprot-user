import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Grid, Button, Checkbox, FormControlLabel
} from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { countryStates, statesByCountry } from 'config/var'

export default function CountryForm(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1)

  const handleAddCart = () => {
    if (!props.productId) {
      props.setErrorMessage('Please select product')
      return
    }
    let product = undefined
    for (let product_ of props.products) {
      if (product_.id==props.productId) {
        product = product_
      }
    }
    var cartItems = [...props.cartItems]
    let isExists = false
    for (let item of cartItems) {
      if (item.product.id == props.productId) {
        const quantity_ = item.quantity*1+quantity*1
        if (props.country=='CA' && quantity_>3) {
          props.setErrorMessage('Limit Line Qty to 3 units per sku')
          return
        }
        item.quantity = quantity_
        isExists = true
      }
    }

    if (!isExists) {
      if (props.country=='CA' && quantity>3) {
        props.setErrorMessage('Limit Line Qty to 3 units per sku')
        return
      }
      cartItems.push({ product, quantity })
    }
    
    props.setCartItems(cartItems)
  }

  return (
    <>
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Shipping Country</label>
        <SelectField
          value={props.country}
          onChange={e=>props.changeCountry(e.target.value)}
          options={[
            { label: 'Select country', value: '' },
            ...countryStates.map(el => ({ label: el.name, value: el.code2 }))
          ]}
          variant="filled"
          size="small"
          fullWidth
          placeholder="Country"
        />
      </Grid>
    </Grid>
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Product</label>
        <SelectField
          value={props.productId}
          onChange={e=>props.setProductId(e.target.value)}
          options={[
            { label: 'Select product', value: '' },
            ...props.products.map(el => ({ label: el.title, value: el.id }))
          ]}
          variant="filled"
          size="small"
          fullWidth
          placeholder="Product"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>&nbsp;</label>
        <div style={{ display: 'flex' }}>
          <TextField
            type='number'
            value={quantity}
            onChange={e=>{
              if (e.target.value*1 < 1) {
                props.setErrorMessage('Quantity should be greater than 1')
                return
              }
              setQuantity(e.target.value)
            }}
            style={{ marginRight: 12, width: 'calc(50% - 6px)' }}
          />
          <Button onClick={handleAddCart}
            color='primary'
            variant='contained'
            size='small'
          >
            Add to Cart
          </Button>
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} direction="column">
        <label className={classes.formLabel}>User Type</label>
        <div style={{display: 'flex'}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.userType==1}
                onChange={e=>props.setUserType(1)}
              />
            }
            label='Affiliate'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.userType==2}
                onChange={e=>props.setUserType(2)}
              />
            }
            label='Customer'
          />
        </div>
      </Grid>
    </Grid>
    </>
  )
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
  },
}));
