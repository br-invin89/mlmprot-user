import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Grid, Button, Input, CircularProgress, Tooltip, Hidden
} from '@material-ui/core'
import Card from "components/cards/Card";
import { callGetApiWithAuth } from 'utils/api'
import { asPrice, asNumber } from 'utils/text'
import useStyles from './ProductsGrid.style'

export default function ProductsGrid(props) {
  const classes = useStyles()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const myUser = useSelector(state => state.auth.user)

  useEffect(() => {
    if (!myUser) return
    setIsLoading(true)
    let params = []
    params['page'] = 1
    params['per_page'] = 20
    let q = Object.keys(params).map(k => k + '=' + params[k]).join('&')
    callGetApiWithAuth(`subscriptions/products?${q}`, onGetProducts, onFailProducts)
  }, [])
  const onGetProducts = (data) => {
    setIsLoading(false)
    setProducts(data.data.data)
  }
  const onFailProducts = (errMessage) => {
    setIsLoading(false)
  }

  return (
    <div className={classes.root}>
      <div>
        <h2>Products</h2>
      </div>
      <Grid container spacing={3}>
        {products.map(product =>
          <Grid item key={product.id} xs={12} xl={6}
            style={{ height: '100%' }}
          >
            <ProductCard
              cartItems={props.cartItems}
              product={product}
              addCart={props.addCart}
              setErrorMessage={props.setErrorMessage}
              userType={myUser.type}
            />
          </Grid>
        )}
      </Grid>
      {isLoading &&
        <div className={classes.loadingRoot}>
          <CircularProgress size={48} />
        </div>
      }
    </div>
  )
}

const ProductCard = props => {
  const classes = useStyles()
  const myUser = useSelector(state => state.auth.user)
  const [quantity, setQuantity] = useState(1)  

  const addCart = () => {
    let errorMessage = null
    if (myUser.billing_detail.billing_country=='CA') {
      let exQuantity = 0
      props.cartItems.forEach(el => {
        if (el.product.id==props.product.id) {
          exQuantity = el.quantity          
        }        
      })
      const count = exQuantity*1+quantity*1
      if (count>3) {
        errorMessage = 'Limit Line Qty to 3 units per sku'
      }
    }
    if (errorMessage) {
      props.setErrorMessage(errorMessage)
      return
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      props.setErrorMessage('Please input QTY correctly')
      return
    }
    props.addCart({
      product: props.product,
      quantity: quantity
    })
  }

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <div className={classes.productImage}>
            <img src={props.product.image}
              alt={props.product.title}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <h4>{props.product.title}</h4>
          <div className={classes.priceRoot}>Price: {props.userType == 1 ? asPrice(props.product.member_price) : asPrice(props.product.retail_price)}</div>
          <div className={classes.priceRoot}>PV: {asNumber(props.product.pv)}</div>
          <div className={classes.priceRoot}>CV: {asNumber(props.product.cv)}</div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.productActions}>
            <label>QTY:&nbsp;</label>
            <Input
              className={classes.qtyInput}
              value={quantity}
              type={'number'}
              onChange={e => {
                if (e.target.value > 0) {
                  setQuantity(e.target.value)
                }
              }}
            />
            <Button
              className={classes.addBtn}
              onClick={addCart}
              variant={'contained'}
              color={'primary'}
              size={'small'}
            >
              Add to Cart
            </Button>
          </div>
          <Hidden smDown>
            <div className={classes.productBottomRoot}>
              <Tooltip placement="bottom" title={<div className={classes.productDescRoot}
                dangerouslySetInnerHTML={{ __html: props.product.description }}
              />}>
                <div className={classes.desctiption}>
                  View Description
                </div>
              </Tooltip>
              <div className={classes.qtyLimitText}>
                {myUser.billing_detail.billing_country=='CA' && 
                  'Limit Line Qty to 3 units per sku'
                }
              </div>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.productDescRoot}
              dangerouslySetInnerHTML={{ __html: props.product.description }}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Card>
  )
}
