import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { asPrice } from "utils/text";
import { countryName } from 'config/var';

export default function ReviewForm(props) {
  const classes = useStyles();
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPv, setTotalPv] = useState(0);
  const [totalCv, setTotalCv] = useState(0);
  const [totalMemberPrice, setTotalMemberPrice] = useState(0);
  const [totalRetailPrice, setTotalRetailPrice] = useState(0);

  useEffect(() => {
    let totalCounts = 0;
    let totalPv = 0;
    let totalCv = 0;
    let totalMemberPrice = 0;
    let totalRetailPrice = 0;
    let totalPrice = 0;
    for (let item of props.cartItems) {
      totalPv += item.product.pv * item.quantity;
      totalCv += item.product.cv * item.quantity;
      totalCounts += item.quantity * 1;
      totalMemberPrice += item.product.member_price * item.quantity;
      totalRetailPrice += item.product.retail_price * item.quantity;
    }
    totalPrice = props.userType == 1 ? totalMemberPrice : totalRetailPrice;
    totalPrice += props.shippingPrice ? props.shippingPrice * 1 : 0;
    totalPrice += props.tax ? props.tax * 1 : 0;

    setTotalCounts(totalCounts);
    setTotalAmount(totalPrice);
    setTotalRetailPrice(totalRetailPrice);
    setTotalMemberPrice(totalMemberPrice);
    setTotalPv(totalPv);
    setTotalCv(totalCv);
    setTotalAmount(totalPrice);
  }, [props.userType, props.cartItems, props.shippingPrice, props.tax]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h2 className={classes.title}>- Personal Information</h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>First Name:</label>
        <span className={classes.desc}>{props.userData.first_name}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Last Name:</label>
        <span className={classes.desc}>{props.userData.last_name}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>User Type:</label>
        <span className={classes.desc}>
          {props.userType == 1
            ? "Affiliate"
            : props.userType == 2
            ? "Customer"
            : ""}
        </span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Email:</label>
        <span className={classes.desc}>{props.userData.email}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Phone:</label>
        <span className={classes.desc}>{props.userData.phone}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Username:</label>
        <span className={classes.desc}>{props.userData.username}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Password:</label>
        <span className={classes.desc}>{"*****"}</span>
      </Grid>
      <Grid item xs={12}>
        <h2 className={classes.title}>- Shipping Address</h2>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>Address Line 1:</label>
        <span className={classes.desc}>
          {props.shippingData.shipping_address}
        </span>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>Address Line 2:</label>
        <span className={classes.desc}>
          {props.shippingData.shipping_address_line2}
        </span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Country:</label>
        <span className={classes.desc}>
          {countryName(props.shippingData.shipping_country)}
        </span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>State:</label>
        <span className={classes.desc}>
          {props.shippingData.shipping_state}
        </span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>City:</label>
        <span className={classes.desc}>{props.shippingData.shipping_city}</span>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className={classes.label}>Zipcode:</label>
        <span className={classes.desc}>
          {props.shippingData.shipping_zipcode}
        </span>
      </Grid>
      {/*
      <Grid item xs={12} >
        <h2 className={classes.title}>- Billing Address</h2>
      </Grid>
      <Grid item xs={12} >
        <label className={classes.label}>Address:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_address
          : props.shippingData.shipping_address}
        </span>
      </Grid>
      <Grid item xs={12} >
        <label className={classes.label}>Address Line 2:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_address_line2
          : props.shippingData.shipping_address_line2}
        </span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>Country:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_country
          : props.shippingData.shipping_country}
        </span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>State:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_state
          : props.shippingData.shipping_state}
        </span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>City:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_city
          : props.shippingData.shipping_city}
        </span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>Zipcode:</label>
        <span className={classes.desc}>
          {props.isSameAddress?props.billingData.billing_zipcode
          : props.shippingData.shipping_zipcode}
        </span>
      </Grid>
      <Grid item xs={12} >
        <h2 className={classes.title}>- Credit Card Information</h2>
      </Grid>
      <Grid item xs={12} >
        <label className={classes.label}>Name on Card:</label>
        <span className={classes.desc}>{props.billingData.cc_name}</span>
      </Grid>
      <Grid item xs={12} >
        <label className={classes.label}>Card Type:</label>
        <span className={classes.desc}>{props.billingData.cc_type}</span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>Credit Card Number:</label>
        <span className={classes.desc}>{props.billingData.cc_number}</span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>Exp Date:</label>
        <span className={classes.desc}>{props.billingData.cc_exp_month+'/'+props.billingData.cc_exp_year}</span>
      </Grid>
      <Grid item xs={12} md={6} >
        <label className={classes.label}>Security Code:</label>
        <span className={classes.desc}>{props.billingData.cc_cvv}</span>
      </Grid>
          */}
      <Grid item xs={12}>
        <h2 className={classes.title}>- Products</h2>
      </Grid>
      {props.cartItems.map((el) => (
        <Grid item xs={12}>
          <span className={classes.desc}>{el.product.title}</span>
          <br />
          <span className={classes.label}>
            Price:{" "}
            {asPrice(
              props.userType == 1
                ? el.product.member_price
                : el.product.retail_price
            )}
            &nbsp; PV: {el.product.pv}&nbsp; CV: {el.product.cv}&nbsp; QTY:{" "}
            {el.quantity}
          </span>
        </Grid>
      ))}
      <Grid item xs={12}>
        <h2 className={classes.title}>- Order Summary</h2>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>Items</label>
        <span className={classes.desc}>{totalCounts}</span>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>Subtotal</label>
        <span className={classes.desc}>
          {asPrice(props.userType == 1 ? totalMemberPrice : totalRetailPrice)}
        </span>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>PV</label>
        <span className={classes.desc}>{totalPv}</span>
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>CV</label>
        <span className={classes.desc}>{totalCv}</span>
      </Grid>
      {props.shippingPrice != undefined && (
        <Grid item xs={12}>
          <label className={classes.label}>Shipping Price</label>
          <span className={classes.desc}>{asPrice(props.shippingPrice)}</span>
        </Grid>
      )}
      {props.tax != undefined && (
        <Grid item xs={12}>
          <label className={classes.label}>Tax</label>
          <span className={classes.desc}>{asPrice(props.tax)}</span>
        </Grid>
      )}
      <Grid item xs={12}>
        <label className={classes.label}>Total</label>
        <span className={classes.desc}>{asPrice(totalAmount)}</span>
      </Grid>
      <Grid item container xs={12} justify={"space-between"}>
        <Button
          color="primary"
          variant="contained"
          onClick={props.handleCheckout}
        >
          Purchase
        </Button>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
  label: {
    color: theme.palette.text.disabled,
    fontWeight: 500,
    fontSize: 14,
    marginRight: 8,
  },
  desc: {
    color: theme.palette.text.primary,
    fontSize: 14,
  },
}));
