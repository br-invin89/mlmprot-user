import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import ProductsGrid from './createSubscription/ProductsGrid'
import CartSummary from './createSubscription/CartSummary'
import MakeSubscriptionModal from './createSubscription/MakeSubscriptionModal'
import { callPostApiWithAuth } from 'utils/api'

export default function CreateSubscriptionPage() {
  const history = useHistory()
  const classes = useStyles()
  const myUser = useSelector(state => state.auth.user)
  const [cartItems, setCartItems] = useState([])
  const [isOpenedCreate, setIsOpenedCreate] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const addCart = (item) => {
    let cartItems_ = [...cartItems]
    let isAlready = false
    for (let item_ of cartItems_) {
      if (item_.product.id==item.product.id) {
        item_.quantity = item_.quantity*1+item.quantity*1
        isAlready = true
      }
    }
    if (!isAlready) {
      cartItems_.push(item)
    }
    setCartItems(cartItems_)
  }
  const removeCart = (item) => {
    let cartItems_ = cartItems.filter(item_ => 
      item_.product.id!=item.product.id
    )
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
        if (myUser.billing_detail.billing_country=='CA' && 
          quantity>3
        ) {
          setErrorMessage('Limit Line Qty to 3 units per sku')
          return item_
        }
        return {
          ...item_,
          quantity: quantity
        }
      } else {
        return item_
      }
    })
    setCartItems(cartItems_)
  };

  const openMakeModal = () => {
    setIsOpenedCreate(true)
  }
  const closeMakeModal = () => {
    setIsOpenedCreate(false)
  }
  const handleSubscribe = (subscriptionData) => {
    let orderDetails = []
    cartItems.map(item => {
      orderDetails.push({
        product_id: item.product.id,
        quantity: item.quantity,
      })
    })
    let data = {
      subscription: {
        day_of_month: subscriptionData['day_of_month'],
        pay_type: subscriptionData['pay_type'],
      },
      subscriptionDetails: orderDetails,
    }
    setIsSubmiting(true)
    callPostApiWithAuth(`subscriptions`, data, onDoneAutoship, onFailAutoship)
  }
  const onDoneAutoship = () => {
    setIsSubmiting(false)
    setIsOpenedCreate(false)
    setSuccessMessage('Subscription created successfully')
    setCartItems([])
    setTimeout(() => {
      history.push('/subscription/current-subscriptions')
    }, 500)
  }
  const onFailAutoship = (errMessage) => {
    setIsSubmiting(false)
    setErrorMessage(errMessage)
  }

  return (
    <div className={classes.container}>
      <Grid container spacing={3} justify={'space-between'}>
        <Grid item xs={12} lg={6} xl={9} sm={6}>
          <ProductsGrid 
            cartItems={cartItems}
            addCart={addCart}
            setErrorMessage={setErrorMessage}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={3} sm={6}>
          <CartSummary 
            cartItems={cartItems}
            removeCart={removeCart}
            openMakeModal={openMakeModal}
            isSubmiting={isSubmiting}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        </Grid>
        {isOpenedCreate && 
          <MakeSubscriptionModal 
            closeMakeModal={closeMakeModal}
            handleSubscribe={handleSubscribe}
            isSubmiting={isSubmiting}
            setErrorMessage={setErrorMessage}
          />
        }
      </Grid>  
      {successMessage &&     
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={successMessage}
          autoHideDuration={2000}
          onClose={(_, r) => {
            if (r == 'timeout') setSuccessMessage(undefined)
          }}
        >
          <Alert
            severity='success'
            variant='filled'
            onClose={() => setSuccessMessage(undefined)}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      }
      {errorMessage && 
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(_, r) => {
          if (r == 'timeout') setErrorMessage(undefined)
        }}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      }
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    '& h2': {
      fontSize: 18,
    }
  }
}))
