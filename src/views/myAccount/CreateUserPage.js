import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import {
  Snackbar, Button, Backdrop,
  CircularProgress,
  Dialog, DialogTitle, DialogActions,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import FormCard from "components/cards/FormCard";
import CountryForm from "./createUser/CountryForm";
import UserForm from "./createUser/UserForm";
import PaymentForm from "./createUser/PaymentForm";
import ShippingForm from "./createUser/ShippingForm";
import AutoshipForm from './createUser/AutoshipForm'
import OrderSummaryCard from "components/cards/OrderSummaryCard";
import NoData from 'components/NoData'
import OrderSummary from "./createUser/OrderSummary";
import CartProductCard from "./createUser/CartProductCard";
import ReviewForm from './createUser/ReviewForm';
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'
import { statesByCountry } from 'config/var'

import { asPrice } from 'utils/text'
import {
  validateCheckout, prepareCheckout,
  validateAutoship, prepareAutoship,
  validateTax, prepareTax,
  validateShipping, prepareShipping,
} from './createUser/CreateUser.func.js'

export default function CreateUserPage() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const myUser = useSelector(state => state.auth.user)
  const [step, setStep] = useState('input')
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [promotionCode, setPromotionCode] = useState(undefined)
  const [isShowAutoship, setIsShowAutoship] = useState(false)
  const [payType, setPayType] = useState(3)
  const [isChecking, setIsChecking] = useState(false)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [userType, setUserType] = useState(1)
  const [userData, setUserData] = useState(undefined)
  const [billingData, setBillingData] = useState(undefined)
  const [shippingData, setShippingData] = useState(undefined)
  const [autoshipData, setAutoshipData] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [distCenter, setDistCenter] = useState(undefined)
  const [tax, setTax] = useState(undefined)
  const [isCalculatingTax, setIsCalculatingTax] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(undefined)
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [needsOrderConfirm, setNeedsOrderConfirm] = useState(false)
  const [needsAutoshipConfirm, setNeedsAutoshipConfirm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [productId, setProductId] = useState(undefined)

  const changeCountry = (country) => {
    setCountry(country)
    setIsLoadingProducts(true)
    setCartItems([])
    setDistCenter(undefined)
    setProducts([])
    setProductId(undefined)
    if (!country) return
    setBillingData({ ...billingData, billing_country: country })
    setShippingData({ ...shippingData, shipping_country: country,})
  }

  const getDistCenter = () => {
    callGetApiWithAuth(`common/dist_center?country=${country}`, onGetDistCenter, onFailDistCenter)
  }
  const onGetDistCenter = (data) => {
    const distCenter = data.data
    setDistCenter(distCenter)
  }
  const onFailDistCenter = (errMessage) => {
    setErrorMessage('No service for this country')
    // setIsLoadingProducts(false)
  }

  const searchProducts = () => {
    var data = {
      shippingDetail: {
        shipping_country: country,
        dist_center_id: distCenter.id,
      },
      user: {
        type: userType,
      }
    }
    // params['filter[collections]'] = selectedCategory

    setIsLoadingProducts(true)
    callPostApiWithAuth('create_member/products', data, onGetProducts, onFailProducts)
  }
  const onGetProducts = (data) => {
    setProducts(data.data)
    setIsLoadingProducts(false)
  }
  const onFailProducts = () => {
    setProducts([])
    setIsLoadingProducts(false)
  }

  const handleCheckout = () => {
    let errorMessage = validateCheckout({ cartItems, userData, shippingData, billingData, isSameAddress })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    let data = prepareCheckout({ cartItems, userData, shippingData, billingData, isSameAddress, distCenter, myUser, payType, userType })
    setIsChecking(true)
    callPostApiWithAuth('create_member/checkout', data, onSuccessCheckout, onFailCheckout)
  }

  const onSuccessCheckout = (data) => {
    setIsChecking(false)
    setStep('input')
    setSuccessMessage(data.message)
    setCountry('')
    setDistCenter(undefined)
    setProducts([])
    setCartItems([])
    setPromotionCode(undefined)
    setIsShowAutoship(false)
    setTax(0)
    setPayType(3)
    setShippingPrice(0)
    setUserType(1)
    setUserData(undefined)
    setBillingData(undefined)
    setShippingData(undefined)
    setAutoshipData(undefined)
    setIsSameAddress(false)
  }
  const onFailCheckout = (errMessage) => {
    setErrorMessage(errMessage)
    setIsChecking(false)
  }
  const checkCoupon = () => {

  }
  const handleAutoship = () => {
    var errorMessage = validateAutoship({ userData, billingData, shippingData, cartItems, autoshipData, isSameAddress })
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    let data = prepareAutoship({ cartItems, userData, shippingData, billingData, isSameAddress, distCenter, myUser, payType, userType, autoshipData })
    setIsChecking(true)
    callPostApiWithAuth('create_member/checkout', data, onSuccessCheckout, onFailCheckout)
  }
  const calculateShipping = () => {
    let errorMessage = validateShipping(cartItems, shippingData, distCenter)
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    setIsLoading(true)
    let data = prepareShipping(cartItems, shippingData, distCenter)
    callPostApiWithAuth('create_member/check/shipping_price', data, onGetShipping)
  }
  const onGetShipping = (data) => {
    setShippingPrice(data.data.shippingPrice)
    calculateTax(data.data.shippingPrice)
  }
  const calculateTax = (shippingPrice_) => {
    let errorMessage = validateTax(distCenter, shippingData, cartItems, shippingPrice_, userType)
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }

    let data = prepareTax(distCenter, shippingData, cartItems, shippingPrice_, userType)
    setIsCalculatingTax(true)
    callPostApiWithAuth('create_member/check/tax', data, onGetTax, onFailTax)
  }
  const onGetTax = (data) => {
    setTax(data.data.taxAmount)
    setStep('review')
    setIsLoading(false)
    setSuccessMessage(`Your tax amount is ${asPrice(data.data.taxAmount)}`)
    setIsCalculatingTax(false)
  }
  const onFailTax = (errMessage) => {
    setIsLoading(false)
    setErrorMessage(errMessage)
    setIsCalculatingTax(false)
  }
  const goReview = () => {
    let user = {
      user: {
        'username': userData.username,
        'email': userData.email,
      }
    }
    let errorMessage = validateCheckout({ cartItems, userData, shippingData, billingData, isSameAddress })
    if (errorMessage) {
      setErrorMessage(errorMessage)
    } else {
      callPostApiWithAuth('create_member/check/username', user, onSuccessCheckUser, onFailCheckUser)
    }    
  }
  const onSuccessCheckUser = (resp) => {
    calculateShipping()
  }
  
  const onFailCheckUser = (errMessage) => {
    setErrorMessage(errMessage)
    setIsChecking(false)
  }
  const removeCart = (item) => {
    const cartItems_ = cartItems.filter(item_ => item.product.id != item_.product.id);
    setCartItems(cartItems_)
  }

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      let cartItems_ = cartItems.map(item_ => {
        if (item_.product.id == item.product.id) {
          return {
            ...item_,
            quantity: Number(item.quantity) - 1
          }
        } else {
          return item_
        }
      })
      setCartItems(cartItems_)
    }
  };

  const increaseQty = (item) => {
    let cartItems_ = cartItems.map(item_ => {
      if (item_.product.id == item.product.id) {
        const quantity = Number(item.quantity)+1
        if (country=='CA') {
          if (quantity>3) {
            setErrorMessage('Limit Line Qty to 3 units per sku')
            return {
              ...item_
            }
          }
        }
        return {
          ...item_,
          quantity,
        }
      } else {
        return item_
      }
    })
    setCartItems(cartItems_)
  };

  useEffect(() => {
    if (country) {
      getDistCenter()
    }
  }, [country])

  useEffect(() => {
    if (distCenter) {
      searchProducts()
    }
  }, [distCenter])

  // useEffect(() => {
  //   if (cartItems.length > 0) {
  //     calculateShipping()
  //   }
  // }, [cartItems])

  return (
    <>
    {step == 'input' &&
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormCard title="Products">
                <CountryForm
                  country={country}
                  changeCountry={changeCountry}
                  products={products}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  userType={userType}
                  setUserType={setUserType}
                  setErrorMessage={setErrorMessage}
                  productId={productId}
                  setProductId={setProductId}
                />
              </FormCard>
            </Grid>
            {distCenter &&
              <>
              <Grid item xs={12}>
                <FormCard title="User Info">
                  <UserForm userData={userData}
                    setUserData={setUserData}
                  />
                </FormCard>
              </Grid>
              <Grid item xs={12}>
                <FormCard title="Shipping Info">
                  <ShippingForm shippingData={shippingData}
                    setShippingData={setShippingData}
                    goReview={goReview}
                    isLoading={isLoading}
                  />
                </FormCard>
              </Grid>
              {/*
              <Grid item xs={12}>
                <FormCard title="Payment">
                  <PaymentForm
                    billingData={billingData} 
                    setBillingData={setBillingData}
                    payType={payType}
                    setPayType={setPayType}
                    goReview={goReview}
                    checkCoupon={checkCoupon}
                    isShowAutoship={isShowAutoship}
                    setIsShowAutoship={setIsShowAutoship}
                    isSameAddress={isSameAddress}
                    setIsSameAddress={setIsSameAddress}
                    calculateTax={calculateTax}
                    isCalculatingTax={isCalculatingTax}
                    calculateShipping={calculateShipping}
                  />
                </FormCard>
              </Grid>
              */}
              {isShowAutoship &&
                <Grid item xs={12}>                  
                    <FormCard title="Autoship">
                      <AutoshipForm
                        autoshipData={autoshipData}
                        setAutoshipData={setAutoshipData}
                        handleAutoship={() => setNeedsAutoshipConfirm(true)}
                      />
                    </FormCard>
                  
                </Grid>
              }
              </>}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <OrderSummaryCard className={classes.summaryCard}>
            <div className={classes.topRow}>
              <Typography component="h2" className={classes.title}>
                Products
              </Typography>
            </div>
            {cartItems.map((item, index) => (
              <CartProductCard
                item={item} key={index}
                userType={userType}
                editable={true}
                removeCart={removeCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
              />
            ))}
            {cartItems.length == 0 &&
              <Typography align='center' component={'p'} color={'textSecondary'}>
                No products
              </Typography>
            }
            <OrderSummary
              cartItems={cartItems}
              tax={tax}
              userType={userType}
              shippingPrice={shippingPrice}
            />
          </OrderSummaryCard>
        </Grid>
      </Grid>
    }
    {step == 'review' &&
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <FormCard title="Review">
            <ReviewForm
              userData={userData}
              userType={userType}
              shippingData={shippingData}
              billingData={billingData}
              isSameAddress={isSameAddress}
              cartItems={cartItems}
              shippingPrice={shippingPrice}
              tax={tax}
              calculateShipping={calculateShipping}
              calculateTax={calculateTax}
              handleCheckout={handleCheckout}
            />
          </FormCard>
        </Grid>
      </Grid>
    }
    <Dialog
      open={needsOrderConfirm || needsAutoshipConfirm}
      onClose={() => {
        setNeedsOrderConfirm(false)
        setNeedsAutoshipConfirm(false)
      }}
    >
      <DialogTitle>
        Are you sure?
        </DialogTitle>
      <DialogActions>
        <Button color='secondary'
          onClick={() => {
            setNeedsOrderConfirm(false)
            setNeedsAutoshipConfirm(false)
          }}
        >
          No
          </Button>
        <Button color='primary'
          onClick={() => {
            if (needsOrderConfirm) {
              handleCheckout()
            } else if (needsAutoshipConfirm) {
              handleAutoship()
            }
            setNeedsOrderConfirm(false)
            setNeedsAutoshipConfirm(false)
          }}
        >
          Yes
          </Button>
      </DialogActions>
    </Dialog>
    {(isChecking) &&
      <Backdrop open={true} className={classes.backdrop}>
        <CircularProgress color="secondary" />
      </Backdrop>
    }
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom', horizontal: 'left'
      }}
      open={errorMessage}
      autoHideDuration={2000}
      onClose={(e, r) => {
        if (r == 'timeout') setErrorMessage('')
      }}
    >
      <Alert severity="error"
        variant="filled"
        onClose={() => setErrorMessage('')}
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
        if (r == 'timeout') setSuccessMessage('')
      }}
    >
      <Alert severity="success"
        variant="filled"
        onClose={() => setSuccessMessage('')}
      >
        {successMessage}
      </Alert>
    </Snackbar>
    </>
  )
}

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
  summaryCard: { height: "100%" },
  backdrop: {
    zIndex: 9999
  },
}));
