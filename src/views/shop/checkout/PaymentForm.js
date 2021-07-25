import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Checkbox, FormControlLabel, Button,
  Typography, InputAdornment, IconButton,
  RadioGroup, Radio, 
} from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { countryName } from "config/var";
import closeIcon from "assets/images/close-icon.png";

export default function PaymentForm({
  userData,
  showAutoship,
  cartType,
  payType,
  setPayType,
  pcPayType,
  setPcPayType,
  isShowAutoship,
  doCheckout,
  checkCoupon,
  setCoupon,
  clearCouponCode,
}) {
  const classes = useStyles();
  const promotionCode = useSelector((state) => state.cart.promotionCode);
  const [couponCode, setCouponCode] = useState("");
  const [payType2, setPayType2] = useState(1)
  const cardTypeOptions = [
    { value: '', label: '' },
    { value: 1, label: "Visa", },
    { value: 2, label: "Mastercard", },
    { value: 3, label: "Discover", },
    { value: 4, label: "Amex", },
    { value: 5, label: "Diners", },
  ];
  const [payOptions, setPayOptions] = useState([])

  useEffect(() => {
    let payType2_ = payType
    if (pcPayType) {
      payType2_ = payType+'-'+pcPayType
    }
    setPayType2(payType2_)
  }, [payType, pcPayType])
  
  useEffect(() => {
    setPayOptions(cartType=='products' ? [
      { value: '1', label: "CC" },
      { value: '3', label: "Credit" },
      { value: '6-1', label: "PC + CC" },
      { value: '6-3', label: "PC + Credit" },
    ] : [
      { value: '1', label: "Credit Card" },
      { value: '3', label: "Credit Wallet" },
    ])
  }, [cartType])

  const varLabel = (value) => {
    let label = '';
    cardTypeOptions.forEach((el) => {
      if (el.value === value * 1) {
        label = el.label;
      }
    });
    return label;
  };

  const onChangePayType2 = (_, value) => {
    // setPayType2(value)
    if (isNaN(value)) {
      setPayType(value.split('-')[0])
      setPcPayType(value.split('-')[1])
    } else {
      setPayType(value)
      setPcPayType('')
    }
  }

  return userData ? (
    <Grid container spacing={3} className={classes.root}>
      {/* <Grid item xs={12} direction="column">
        <Grid item xs={12} md={6} lg={6}>
          <label className={classes.formLabel}>Promotion Code</label>
          <Grid>
            <TextField
              value={promotionCode || couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCoupon(e.target.value);
              }}
              name="coupon_code"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Promotion code"
              className={classes.promotionInput}
              endAdornment={
                promotionCode && (
                  <InputAdornment position="end">
                    <img
                      src={closeIcon}
                      className={classes.closeIcon}
                      onClick={() => {
                        setCouponCode("");
                        clearCouponCode();
                      }}
                      alt="Clear coupon code"
                    />
                  </InputAdornment>
                )
              }
            />
            <Button
              variant={"contained"}
              color={"primary"}
              className={classes.promotionBtn}
              onClick={() => checkCoupon(couponCode)}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12} direction="column">
        <Grid item xs={12} className={classes.paymentMethod} direction="column">
          <label className={classes.formLabel}>Payment Method</label>
          <RadioGroup 
            className={classes.checkGroup}
            value={payType2} onChange={onChangePayType2}
          >
            {payOptions.map(el => 
              <FormControlLabel className={classes.checkRoot}
                value={el.value}
                label={el.label}
                control={<Radio />}
              />
            )}
          </RadioGroup>
        </Grid>
      </Grid>
      {payType == '1' ? (
        <>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Name on Card</label>
            <TextField
              value={userData.billing_detail.cc_name}
              disabled
              name="name_on_card"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Name on Card"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Credit Card Type</label>
            <SelectField
              value={userData.billing_detail.cc_type}
              disabled
              placeholder={"Credit Card Type"}
              fullWidth
              options={cardTypeOptions}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Credit Card Number</label>
            <TextField
              value={userData.billing_detail.last_cc_4 != 'none' ? (`************${userData.billing_detail.last_cc_4}`) : (
                'NA'
              )}
              disabled
              name="card_number"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Credit Card Number"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Exp Date</label>
            <TextField
              value={userData.billing_detail.cc_exp_date}
              disabled
              name="exp_date"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Exp Date"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Security Code</label>
            <TextField
              value={userData.billing_detail.last_cc_4 != 'none' ? ('***') : (
                'NA'
              )}
              disabled
              name="security_code"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Security Code"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column"></Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Address Line 1</label>
            <TextField
              value={userData.billing_detail.billing_address}
              disabled
              name="billing_address"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Address"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Address Line 2</label>
            <TextField
              value={userData.billing_detail.billing_address_line2}
              disabled
              name="billing_address_line2"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Address Line 2"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>City</label>
            <TextField
              value={userData.billing_detail.billing_city}
              disabled
              name="billing_city"
              variant="filled"
              size="small"
              fullWidth
              placeholder="City"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>State/Province</label>
            <TextField
              value={userData.billing_detail.billing_state}
              disabled
              name="billing_state"
              variant="filled"
              size="small"
              fullWidth
              placeholder="State"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Zip/Postal Code</label>
            <TextField
              value={userData.billing_detail.billing_zipcode}
              disabled
              name="billing_zipcode"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Zip/Postal Code"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} direction="column">
            <label className={classes.formLabel}>Country</label>
            <TextField
              value={countryName(userData.billing_detail.billing_country)}
              disabled
              name="billing_country"
              variant="filled"
              size="small"
              fullWidth
              placeholder="Country"
            />
          </Grid>

          {/*
        <Grid item xs={12} md={12} lg={12} direction='column'>
          <FormControlLabel
            control={
              <Checkbox
                checked={isShowAutoship}
                onChange={showAutoship}
                name='autoship'
              />
            }
            label='Setup Autoship'
          />
        </Grid>
          */}
        </>
      ) : payType == '2' ? (
        <>
          <Grid item xs={12}>
            <label className={classes.formLabel}>Pay using Bitcoin</label>
            <Typography component={"p"}>
              Upon confirming your information and agreeing to our Policies
              &amp; Procedures, we will direct you to CoinPayments to complete
              your MLMProtec purchase with Bitcoin. Bitcoin purchases are
              non-refundable due to the fluctuation of the cryptocurrency
              market. Any refund requests will be sent in the form of a credit
              added to your credit wallet.
            </Typography>
          </Grid>
        </>
      ) : payType == '3' ? (
        <>
          <Grid item xs={12}>
            <label className={classes.formLabel}>Pay using Credit Wallet</label>
            <Typography component={"p"}>
              It will check current wallet status of your account, and if you
              have, it will be paid by that amount.
            </Typography>
          </Grid>
        </>
      ) : payType == '6'? (
        <>
          <Grid item xs={12}>
            <label className={classes.formLabel}>Pay using Product Credit</label>
            <Typography component={"p"}>
              It will check your product credit amount, and it will consume pc first.
            </Typography>
          </Grid>
        </>
      ) : (
        ""
      )}
      {
        !isShowAutoship && (
          // <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={6}
            className={classes.purchanceContainer}
          >
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={doCheckout}
            >
              Purchase
            </Button>
          </Grid>
        )
        // </Grid>
      }
    </Grid>
  ) : (
    ""
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
  },
  promotionInput: {
    width: "calc(100% - 120px)",
    marginRight: 8,
  },
  promotionBtn: {
    width: "100px",
  },
  closeIcon: {
    width: 24,
    height: 24,
    opacity: 0.5,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  purchanceContainer: {
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "15px !important",
  },
  paymentMethod: {
    paddingRight: 12,
  },
  checkGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  checkRoot: {
    marginLeft: 0,
    '& span': {
      fontSize: '12px'
    },
    '& .MuiRadio-root': {
      padding: '2px'
    }
  }
}));
