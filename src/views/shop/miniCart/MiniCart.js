import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Typography,
  IconButton,
  Button,
  CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CartProductCard from "components/cards/CartProductCard";
import OrderSummary from "components/orderSummary/OrderSummary";
import { callPostApiWithAuth, callGetApiWithAuth } from 'utils/api';
import { refreshStorage } from 'utils/auth'
import PaymentMethodOptions from './PaymentMethodOptions'
import ShippingAddressModal from '../checkout/ShippingAddressModal'
import CreditCardModal from '../checkout/CreditCardModal'

export default function MiniCart({ open, toggleDrawer }) {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch()
  const products = useSelector(state=>state.cart.products)
  const myUser = useSelector(state=>state.auth.user)
  const promotionCode = useSelector(state=>state.cart.promotionCode)
  const cartType  = useSelector(state=>state.cart.cartType)
  const [shippingPrice, setShippingPrice] = useState(undefined)
  const [taxAmount, setTaxAmount] = useState(undefined)
  const [discountAmount, setDiscountAmount] = useState(undefined)
  const [isOpenedShippingEdition, setIsOpenedShippingEdition] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [hasCredit, setHasCredit] = useState(false)
  const [isOpenedBillingDetailModal, setIsOpenedBillingDetailModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)  

  const onGetDiscountAmount = (data) => {
    setDiscountAmount(data.data.orderTotalDiscount)
  }
  const getDiscountAmount = () => {
    if (!promotionCode) return
    let orderDetails = products.map(el=>({ product_id: el.id, quantity: el.count }))
    const data = {
      promoCode: promotionCode,
      orderDetails,
    }
    callPostApiWithAuth('shop/check/promo_code', data, onGetDiscountAmount)
  }
  const onGetTaxAmount = (data) => {
    setTaxAmount(data.data.taxAmount)
    dispatch({ type: 'cart.SET_TAX_AMOUNT', payload: { taxAmount: data.data.taxAmount } })
    setIsLoading(false)
    history.push({
      pathname: '/shop/checkout',
      state: {
        editable: false,
        tax_amount: data.data.taxAmount,
        shipping_price: shippingPrice,
      }
    });
  }
  const onFailTax = (errMessage) => {
    setIsOpenedShippingEdition(true)
    setIsLoading(false)

    if (hasCredit == false) {
      setIsOpenedBillingDetailModal(true)
    }
  }
  const getTaxAmount = (shipping_price) => {
    let orderDetails = products.map(el=>({ product_id: el.id, quantity: el.count }))
    const data = {
      order: {
        shipping_price: shipping_price,
      },
      orderDetails: orderDetails,
    }
    callPostApiWithAuth('shop/check/tax', data, onGetTaxAmount, onFailTax)
  }
  const onGetShippingPrice = (data) => {
    let shippingPrice0 = data.data.shippingPrice
    setShippingPrice(shippingPrice0)
    dispatch({ type: 'cart.SET_SHIPPING_PRICE', payload: { shippingPrice: shippingPrice0 } })
    getTaxAmount(shippingPrice0)
  }

  const onFailShippingPrice = () => {
    setIsLoading(false)
  }

  const getShippingPrice = () => {
    let orderDetails = products.map(el=>({ product_id: el.id, quantity: el.count }))
    const data = {
      orderDetails
    }
    callPostApiWithAuth('shop/check/shipping_price', data, onGetShippingPrice, onFailShippingPrice)
  }
  const handleClickCheckout = () => {
    setIsLoading(true)
    dispatch({
      type: 'cart.SET_PC_SUBSCRIPTION',
      payload: { isPcSubscription: false }
    })
    getShippingPrice()
  }

  const handleClickCheckoutWithSubscription = () => {
    setIsLoading(true)
    dispatch({
      type: 'cart.SET_PC_SUBSCRIPTION',
      payload: { isPcSubscription: true }
    })
    getShippingPrice()
  }
  const loadUserData = () => {
    callGetApiWithAuth('profile', onGetUserData)
  }
  const onGetUserData = (data) => {
    // setUserData(data.data)
    dispatch({
      type: 'auth.REFRESH',
      payload: { user: data.data }
    })
    refreshStorage(data.data)
    // getTaxAmount()
  }
  const afterUpdateSuccess = (successMessage) => {
    loadUserData()
    // setSuccessMessage(successMessage)
  }

  const onErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage)
  }

  const closeShippingEdition = () => {
    setIsOpenedShippingEdition(false)
    dispatch({
      type: 'cart.CLOSE_SIDEBAR_CART'
    })
  }

  // useEffect(() => {
  //   if (products.length==0) {
  //     setShippingPrice(undefined)
  //   }
  // }, [products])

  // useEffect(() => {
  //   if (products.length==0) {
  //     setTaxAmount(undefined)
  //   } else {
  //     if (shippingPrice!=undefined) {
  //       getTaxAmount()
  //     }
  //   }
  // }, [products, shippingPrice])

  useEffect(()=> {
    if (myUser && myUser.billing_detail && myUser.billing_detail.last_cc_4 != 'none') {
      setHasCredit(true)
    }
  }, [myUser])

  useEffect(() => {
    if (products.length==0) {
      setDiscountAmount(undefined)
    } else {
      if (shippingPrice!=undefined) {
        getDiscountAmount()
      }
    }
  }, [products, shippingPrice])

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      classes={{
        paper: classes.root,
      }}
    >
      <div className={classes.topRow}>
        <Typography component="h2" className={classes.title}>
          YOUR CART
        </Typography>
        <IconButton
          component="span"
          className={classes.close}
          onClick={() => toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {products.map((product, index) => (
        <CartProductCard product={product} key={index} />
      ))}
      {products.length>0 && 
        <PaymentMethodOptions />
      }
      {products.length>0 ?
        <>
        <OrderSummary products={products}
          // shippingPrice={shippingPrice}
          // taxAmount={taxAmount}
          discountAmount={discountAmount}
          showAutoshipPrice={cartType=='product_credits'}
        />
        <ShippingAddressModal isOpened={isOpenedShippingEdition}
          data={myUser} afterUpdateSuccess={afterUpdateSuccess}
          closeEdition={closeShippingEdition}
          onErrorMessage={onErrorMessage}
        />
        <CreditCardModal isOpened={isOpenedBillingDetailModal}
          data={myUser} afterUpdateSuccess={afterUpdateSuccess}
          closeEdition={()=>setIsOpenedBillingDetailModal(false)}
          onErrorMessage={onErrorMessage}
          isSelectedTab="info"
        />
        <div className={classes.actions}>
          {cartType=='product_credits' ?
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={clsx(classes.btn)}
              onClick={handleClickCheckoutWithSubscription}
              style={{marginBottom: 12}}
            >
              {isLoading ? <CircularProgress className={classes.circularProgressIcon} size={24} /> : <>Subscribe &amp; Save</>}
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={clsx(classes.btn)}
              onClick={handleClickCheckout}
              // component={Link}
              // to={"/shop/checkout"}
            >
              {isLoading ? <CircularProgress className={classes.circularProgressIcon} size={24} /> : <>One time Checkout</>}
            </Button>
          </>
          :
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={clsx(classes.btn)}
            onClick={handleClickCheckout}
            // component={Link}
            // to={"/shop/checkout"}
          >
            {isLoading ? <CircularProgress className={classes.circularProgressIcon} size={24} /> : <>Redeem Credits</>}
          </Button>
          }
          {/* <Button
            variant="outlined"
            color="primary"
            fullWidth
            className={clsx(classes.btn, classes.btnMargin)}
            onClick={()=>toggleDrawer(false)}
          >
            Continue Shopping
          </Button> */}
        </div>
        </>
      : <Typography component={'p'}>There are no items.</Typography>}

    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2.6),
    paddingRight: 23,
    paddingTop: theme.spacing(3),
    width: 324,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  circularProgressIcon: {
    color: 'white',
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  title: {
    fontWeight: 500,
  },
  close: {
    padding: 4,
  },
  actions: {
    marginTop: 23,
    marginBottom: 50
  },
  btn: {
    textTransform: "capitalize",
  },
  btnMargin: {
    marginTop: 12,
  },
}));
