import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { 
  Grid, Typography, Backdrop,
  CircularProgress, Button, 
  Dialog, DialogTitle, DialogActions,
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import OrderSummaryCard from "components/cards/OrderSummaryCard";
import CartProductCard from "components/cards/CartProductCard";
import FormCard from "components/cards/FormCard";
import OrderSummary from "components/orderSummary/OrderSummary";
import OrderCheckoutSummary from "components/orderSummary/OrderCheckoutSummary";
import UserForm from "./checkout/UserForm";
import PaymentForm from "./checkout/PaymentForm";
import ShippingForm from "./checkout/ShippingForm";
import AutoshipForm from './checkout/AutoshipForm'
import ConfirmationCard from "components/cards/ConfirmationCard";
import cartData from "testdata/cart_data.json";
import moment from 'moment'
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'
import { asPrice } from 'utils/text'
import { 
  validateCheckout, prepareCheckout,
  validateAutoship, prepareAutoship, 
  validateCoupon, prepareCoupon, 
  validateTax, prepareTax,
  validateShipping, prepareShipping,
} from './checkout/Checkout.func'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { refreshStorage } from 'utils/auth'

export default function CheckoutPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const [pageStep, setPageStep] = useState('checkout') // checkout, review
  const myUser = useSelector(state=>state.auth.user)
  const products = useSelector(state=>state.cart.products)
  const confirmedCoupon = useSelector(state=>state.cart.promotionCode)
  const payType_ = useSelector(state=>state.cart.payType)
  const pcPayType_ = useSelector(state=>state.cart.pcPayType)
  const [autoshipData, setAutoshipData] = useState({
    day_of_month: ''
  })
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false)
  const [coupon, setCoupon] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  const [isChecking, setIsChecking] = useState(false)
  const [isShowAutoship, setIsShowAutoship] = useState(false)
  const [isOrderingAutoship, setIsOrderingAutoship] = useState(false)
  const [payType, setPayType] = useState(1)
  const [pcPayType, setPcPayType] = useState(1)
  const [isCalculatingTax, setIsCalculatingTax] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(undefined)
  // const shippingPrice = useSelector(state=>state.cart.shippingPrice)
  // const taxAmount = useSelector(state=>state.cart.taxAmount)
  const cartType = useSelector(state=>state.cart.cartType)
  const isPcSubscription = useSelector(state=>state.cart.isPcSubscription)
  const [taxAmount, setTaxAmount] = useState(undefined)
  const [discountAmount, setDiscountAmount] = useState(undefined)
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [confirmResult, setConfirmResult] = useState(undefined)
  const [needsOrderConfirm, setNeedsOrderConfirm] = useState(false)
  const [needsAutoshipConfirm, setNeedsAutoshipConfirm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [isFlagged, setIsFlagged] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [subTitle, setSubTitle] = useState(undefined)

  useEffect(() => {
    setUserData({ ...myUser })
  }, [myUser])

  useEffect(() => {
    
  }, props.location.state)
  // useEffect(() => {
  //   dispatch({
  //     type: 'cart.RESET_COUPON'
  //   })
  // }, [])
  useEffect(() => {
    if (payType=='coin' || payType=='wallet') setIsShowAutoship(false)
  }, [payType])
  useEffect(() => {
    if (userData && products && products.length>0) {
      calculateShipping()
    }
    if (userData && products && products.length>0 && shippingPrice!==undefined) {
      calculateTax()
    }    
  }, [userData, products, shippingPrice])
  useEffect(() => {
    if (confirmedCoupon && !coupon) {
      setCoupon(confirmedCoupon)
      checkCoupOnAlready(confirmedCoupon)
    }    
  }, [confirmedCoupon])
  useEffect(() => {
    setPcPayType(pcPayType_)
    setPayType(payType_)
  }, [pcPayType_, payType_])

  const loadUserData = () => {
    callGetApiWithAuth('profile', onGetUserData)
  }
  const onGetUserData = (data) => {
    setUserData(data.data)
    dispatch({
      type: 'auth.REFRESH',
      payload: { user: data.data }
    })
    refreshStorage(data.data)
  }

  const calculateTax = () => {
    let errorMessage = validateTax({
      userData, products, shippingPrice
    })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return 
    }

    let data = prepareTax({
      userData, products, shippingPrice
    })
    setIsCheckingCoupon(true)
    callPostApiWithAuth('shop/check/tax', data, onGetTax, onFailTax)
  }
  const onGetTax = (data) => {
    setTaxAmount(data.data.taxAmount)
    setSuccessMessage(`Your tax amount is ${asPrice(data.data.taxAmount)}`)
    setIsCheckingCoupon(false)
  }
  const onFailTax = (errMessage) => {
    setErrorMessage(errMessage)
    setIsCheckingCoupon(false)
  }
  const calculateShipping = () => {    
    let errorMessage = validateShipping({
      userData, products
    })
    if (errorMessage) return 

    let data = prepareShipping({ 
      userData, products 
    })
    callPostApiWithAuth('shop/check/shipping_price', data, onGetShipping, onFailShipping)
  }
  const onGetShipping = (data) => {
    setShippingPrice(data.data.shippingPrice)
  }
  const onFailShipping = (errMessage) => {
    // setErrorMessage(errMessage)
  }
  const doCheckout = () => {
    let errorMessage = validateCheckout({ 
      userData, isSameAddress 
    })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    
    let data = prepareCheckout({ 
      userData, isSameAddress, products, promotionCode: coupon, payType, pcPayType, isPcSubscription 
    })
    setIsChecking(true)
    let checkoutUrl = 'shop/checkout'
    if (cartType=='product_credits') {
      checkoutUrl = 'shop/checkout_pc'
    }
    callPostApiWithAuth(checkoutUrl, data, onSuccessCheckout, onFailCheckout)
  }
  const onSuccessCheckout = (data) => {
    if (payType==3 || payType==1 || payType==6) {
      setPageStep('review')
      setConfirmResult(data.data)
      setIsFlagged(data.data.order.is_flagged)
      if (data.data.order.is_flagged == 2) {
        setTitle('Congratulations, ' + myUser.first_name + ' ' + myUser.last_name + '! ' + 'Order is completed!')
        setSubTitle('You will be recieving an email with your order details shortly.')
      } else {
        setTitle('Sorry, ' + myUser.first_name + ' ' + myUser.last_name + '! ' + 'Order is failed!')
        setSubTitle('You will be logged out automatically in 5 secs.')
        setTimeout(() => {
          history.push('/logout');
        }, 5000)
      }
      // setProcessedOrder(data.data.order)
      setIsChecking(false)
      setSuccessMessage(data.message)
      dispatch({
        type: 'cart.EMPTY_CART'
      })
      loadUserData()
    } else {
      window.location.href=data.payResult.response.result.status_url
    }
  }
  const onFailCheckout = (errMessage) => {
    setErrorMessage(errMessage)
    setIsChecking(false)
  }

  const checkCoupon = () => {
    let errorMessage = validateCoupon({ promotionCode: coupon })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    let data = prepareCoupon({
      userData, products, promotionCode: coupon
    })
    setIsCheckingCoupon(true)
    callPostApiWithAuth('shop/check/promo_code', data, onCheckCoupon, onFailCoupon)
  }

  const checkCoupOnAlready = (coupon) => {
    let data = prepareCoupon({
      userData, products, promotionCode: coupon
    })
    setIsCheckingCoupon(true)
    callPostApiWithAuth('shop/check/promo_code', data, onCheckCoupon, onFailCoupon)
  }

  const onCheckCoupon = (data) => {
    setDiscountAmount(data.data.orderTotalDiscount)
    dispatch({
      type: 'cart.APPLY_COUPON',
      payload: { 
        promotionCode: data.data.promotion.discount_code
      }
    })
    setIsCheckingCoupon(false)
  }
  const onFailCoupon = (errMessage) => {
    setErrorMessage(errMessage)
    setIsCheckingCoupon(false)
  }

  const showAutoship = (e) => {    
    setIsShowAutoship(e.target.checked)
  }
  const doAutoship = () => {
    let errorMessage = validateAutoship({ userData, isSameAddress, autoshipData })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    
    let data = prepareAutoship({ userData, isSameAddress, products, coupon, payType, autoshipData })
    setIsOrderingAutoship(true)
    callPostApiWithAuth('checkout', data, onSuccessAutoship, onFailAutoship)
  }
  const onSuccessAutoship = (data) => {
    if (payType=='credit') {
      setIsOrderingAutoship(false)
      setPageStep('review')
      setConfirmResult(data.data)
      // setProcessedOrder(data.data.order)
      dispatch({
        type: 'cart.EMPTY_CART'
      })
    } else { 
      // will go to coinpayments pay page
      window.location.href=data.payResult.response.result.status_url
    }
  }
  const onFailAutoship = (errMessage) => {
    setErrorMessage(errMessage)
    setIsOrderingAutoship(false)
  }

  const clearCouponCode = () => {
    setCoupon(undefined)
    setDiscountAmount(undefined)
    dispatch({
      type: 'cart.RESET_COUPON'
    })
  }
  return (
    <>
      {pageStep=='checkout'?
      products.length>0?
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormCard title="1. User Info">
                <UserForm userData={userData} />
              </FormCard>
            </Grid>
            <Grid item xs={12}>
              <FormCard title="2. Shipping Info">
                <ShippingForm userData={userData} />
              </FormCard>
            </Grid>
            <Grid item xs={12}>
              <FormCard title="3. Payment">
                <PaymentForm
                  userData={userData} 
                  cartType={cartType}
                  payType={payType}
                  setPayType={setPayType}
                  pcPayType={pcPayType}
                  setPcPayType={setPcPayType}
                  doCheckout={()=>setNeedsOrderConfirm(true)}
                  coupon={coupon}
                  setCoupon={setCoupon}
                  checkCoupon={checkCoupon}
                  isCheckingCoupon={isCheckingCoupon}
                  showAutoship={showAutoship}
                  isShowAutoship={isShowAutoship}
                  // calculateTax={calculateTax}
                  isCalculatingTax={isCalculatingTax}
                  isSameAddress={isSameAddress}
                  setIsSameAddress={setIsSameAddress}
                  clearCouponCode={clearCouponCode}
                />
              </FormCard>
            </Grid>
            <Grid item xs={12}>
              {isShowAutoship && 
                <FormCard title="4. Autoship">
                  <AutoshipForm
                    autoshipData={autoshipData}
                    setAutoshipData={setAutoshipData} 
                    doAutoship={()=>setNeedsAutoshipConfirm(true)}
                  />
                </FormCard>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <OrderSummaryCard className={classes.summaryCard}>
            <div className={classes.topRow}>
              <Typography component="h2" className={classes.title}>
                Order Summary
              </Typography>
            </div>
            {products.map((product, index) => (
              <CartProductCard 
                product={product} 
                key={index} editable={false} 
                payType={payType}
              />
            ))} 
            <OrderSummary 
              products={products} 
              taxAmount={taxAmount} 
              shippingPrice={shippingPrice}
              discountAmount={discountAmount} 
              showAutoshipPrice={isPcSubscription}
              payType={payType}
              cartType={cartType}
              pcPayType={pcPayType}
            />
          </OrderSummaryCard>
        </Grid>
        <Dialog 
          open={needsOrderConfirm || needsAutoshipConfirm}
          onClose={()=>{
            setNeedsOrderConfirm(false)
            setNeedsAutoshipConfirm(false)
          }}
        >
          <DialogTitle>
            Are you sure?
          </DialogTitle>
          <DialogActions>
            <Button color='secondary'
              onClick={()=>{
                setNeedsOrderConfirm(false)
                setNeedsAutoshipConfirm(false)
              }}
            >
              No
            </Button>
            <Button color='primary'
              onClick={()=>{
                if (needsOrderConfirm)
                  doCheckout()
                else if (needsAutoshipConfirm)
                  doAutoship()
                setNeedsOrderConfirm(false)
                setNeedsAutoshipConfirm(false)
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        {(isChecking || isOrderingAutoship) &&
          <Backdrop open={true} className={classes.backdrop}>
            <CircularProgress color="secondary" />
          </Backdrop>
        }
      </Grid>
      :
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component={'p'}>There are no items on your cart.</Typography>
          <Typography component={Link} to={'/shop/home'}>Continue Shopping</Typography>
        </Grid>
      </Grid>
      : ''
      }
      {(pageStep=='review' && confirmResult) && 
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <OrderSummaryCard className={classes.summaryCard}>
            <div className={classes.topRow}>
              <Typography component="h2" className={classes.title}>
                Order Summary
              </Typography>
            </div>
            {confirmResult.order.details.map(el=>({
              ...el.product,
              count: el.quantity,
            })).map((product, index) => (
              <CartProductCard 
                key={index} editable={false} 
                product={product} 
                payType={payType}
              />
            ))}
            <OrderCheckoutSummary 
              confirmResult={confirmResult}
            />
          </OrderSummaryCard>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <ConfirmationCard
            title={title}
            subTitle={subTitle}
            confirmResult={confirmResult}
            isFlagged={isFlagged}
          />
        </Grid>
      </Grid>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r=='timeout') setErrorMessage('')
        }}
      >
        <Alert severity="error" 
          variant="filled"
          onClose={()=>setErrorMessage('')}
        >
          {errorMessage}
          </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom', horizontal: 'left'
        }}
        open={successMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r=='timeout') setSuccessMessage('')
        }}
      >
        <Alert severity="success" 
          variant="filled"
          onClose={()=>setSuccessMessage('')}
        >
          {successMessage}
          </Alert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: 23,
    paddingTop: theme.spacing(3),
    width: 324,
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 500,
  },
  backdrop: {
    zIndex: 9999
  },
  summaryCard: { height: "100%" },
}));
