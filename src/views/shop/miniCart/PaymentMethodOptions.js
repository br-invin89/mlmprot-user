import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { callPostApiWithAuth } from 'utils/api';

export default function PaymentMethodOptions() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const cartType = useSelector(state=>state.cart.cartType)
  const products = useSelector(state=>state.cart.products)
  const [payType2, setPayType2] = useState(1)
  const [payOptions, setPayOptions] = useState([])

  useEffect(() => {
    if (products.length>0) {
      const orderDetails = products.map(el => ({
        product_id: el.id,
        quantity: el.count,
      }))
      callPostApiWithAuth('shop/check/total_price', { orderDetails }, 
        onCalcPrice, onFailCalc
      )
    }
  }, [products])

  useEffect(() => {
    setPayOptions(cartType=='products' ? [
      { value: '1', label: "Use Credit Card only" },
      { value: '3', label: "Use Credit Wallet only" },
      { value: '6-1', label: "Redeem PCs + Credit Card" },
      { value: '6-3', label: "Redeem PCs + Credit Wallet" },
    ] : [
      { value: '1', label: "Credit Card" },
      { value: '3', label: "Credit Wallet" },
    ])
  }, [cartType])

  const onCalcPrice = (data) => {
    const { 
      totalPrice, subPrice, pcAmount, scAmount,
      myCreditAmount, myPcAmount, myScAmount, 
    } = data.data
    if (pcAmount>0 && myPcAmount>=pcAmount && 
      myCreditAmount>=subPrice
    ) {
      setPayType2('6-3')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: 6,
          pcPayType: 3,
        }
      })
    } else if (scAmount>0 && myScAmount>=scAmount && 
      myCreditAmount>=subPrice
    ) {
      setPayType2('6-3')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: '6',
          pcPayType: '3',
        }
      })
    } else if (myCreditAmount>=totalPrice) {
      setPayType2('3')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: '3',
          pcPayType: '',
        }
      })
    } else if (pcAmount>0 && myPcAmount>=pcAmount) {
      setPayType2('6-1')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: '6',
          pcPayType: '1',
        }
      })
    }  else if (scAmount>0 && myScAmount>=scAmount) {
      setPayType2('6-1')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: '6',
          pcPayType: '1',
        }
      })
    } else {
      setPayType2('1')
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: '1',
          pcPayType: '',
        }
      })
    }
  }

  const onFailCalc = () => {

  }

  const onChangePayType2 = (_, value) => {
    setPayType2(value)
    if (isNaN(value)) {
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: value.split('-')[0],
          pcPayType: value.split('-')[1],
        }
      })
    } else {
      dispatch({
        type: 'cart.SET_PAY_TYPE',
        payload: {
          payType: value,
          pcPayType: ''
        }
      })
    }
  }

  return (
    <div className={classes.root}>
      <h5 className={classes.title}>Payment Option</h5>
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
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0',
    marginTop: '28px'
  },
  title: {
    margin: '0 0 4px 0',
  },
  checkGroup: {

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
}))
