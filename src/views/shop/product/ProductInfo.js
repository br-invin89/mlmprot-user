import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, IconButton, TextField, Snackbar } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { asPrice } from "utils/text";
import { isMemberPrice } from "utils/shop"
import Alert from '@material-ui/lab/Alert'

export default function ProductInfo({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const products = useSelector(state=>state.cart.products)
  const myUser = useSelector(state=>state.auth.user)
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCart = () => {
    let errorMessage = null
    if (myUser.billing_detail.billing_country=='CA') {
      let qtyAlready = 0
      products.forEach(el => {
        if (el.id==product.id) {
          qtyAlready = Number(product.count)
        }
      })
      const qty_ = qtyAlready+Number(qty)
      if (qty_>3) {
        errorMessage = 'Limit Line Qty to 3 units per sku'
      }
    }
    if (errorMessage) {
      setErrorMessage(errorMessage)
      return
    }
    dispatch({
      type: 'cart.ADD_PRODUCT',
      payload: { product, count: qty }
    })
  }
  const [qty, setQty] = useState(1);
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  return (
    <div className={classes.root}>
      <Typography component="h2">
        {product?product.title:<Skeleton variant={'rect'} height={24} />}
      </Typography>
      <Typography component="p" color="primary" className={classes.price}>
        {product?isMemberPrice()?asPrice(product.member_price):asPrice(product.retail_price)
        : <Skeleton variant={'rect'} height={24} />}
        {" "}
        {product && product['is_pc']==1?
          <>
            <Typography component="span" className={classes.memberPrice}>
              &nbsp;monthly tuition:&nbsp;
            </Typography>
            {asPrice(product.autoship_price)}&nbsp;
            <Typography component="span" className={classes.memberPrice}>
              after 30 days
            </Typography>
          </>
        : ''}
      </Typography>
      <Typography component="p" color="primary" className={classes.price}>
        <Typography component="span" className={classes.memberPrice}>
          {product?`PV: ${product.pv}`:<Skeleton variant={'rect'} height={24} />}
        </Typography>
        {" "}
        <Typography component="span" className={classes.memberPrice}>
          {product?`CV: ${product.cv}`:<Skeleton variant={'rect'} height={24} />}
        </Typography>
      </Typography>
      <Typography component="p" color="primary" className={classes.price}>
        {product?
          <Typography component="p" className={classes.memberPrice}
            dangerouslySetInnerHTML={{ __html:product.description }}
          />
        : <Skeleton variant={'rect'} height={24} />
        }
      </Typography>
      {product?
        <div className={classes.controls}>
          <IconButton
            className={classes.controlBtn}
            color="primary"
            onClick={() => {
              // let count = 0;
              // for (let item of products) {
              //   if (item.id == product.id) {
              //     count = item.count;
              //     break;
              //   }
              // }
              // if ((product.max_order_quantity == 0) || (product.max_order_quantity > (count + qty))) {
                increaseQty()
              // } else {
              //   setErrorMessage(`We are sorry, but you can't buy more ${product.max_order_quantity} for this product.`);
              // }
            }}
          >
            <AddIcon />
          </IconButton>
          <TextField
            size="small"
            value={qty}
            InputProps={{
              classes: { input: classes.controlInput },
              disableUnderline: true,
            }}
            className={classes.controlField}
          />
          <IconButton
            className={classes.controlBtn}
            color="primary"
            onClick={decreaseQty}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      : <Skeleton width={150} height={24} variant={'rect'} />}
      {(myUser && myUser.billing_detail.billing_country=='CA')?
        <Typography component="p" className={classes.memberPrice}>
          * Limit Line Qty to 3 units per sku
        </Typography>
      : ''}
      {product? 
        <Button 
          variant="contained" color="primary" 
          className={classes.btn}
          onClick={() => {
            // let count = 0;
            // for (let item of products) {
            //   if (item.id == product.id) {
            //     count = item.count;
            //     break;
            //   }
            // }
            // if ((product.max_order_quantity == 0) || product.max_order_quantity >= (count + qty)) {
              handleAddCart()
            // } else {
            //   setErrorMessage(`We are sorry, but you can't buy more ${product.max_order_quantity} for this product.`);
            // }
          }}
        >
          Add to Cart
        </Button>
      : 
        <Button 
          variant="contained" color="primary" 
          className={classes.btn}
        >
          &nbsp;
        </Button>}
        <Snackbar open={errorMessage} 
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          onClose={(e, r) => { if (r=='timeout') setErrorMessage('')}}          
        >
          <Alert severity="error"
            variant="filled"
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
                
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
  },
  price: {
    marginTop: 6,
    marginBottom: 13,
    fontSize: 18,
    fontWeight: 500,
  },
  memberPrice: {
    color: theme.palette.text.disabled,
    fontSize: 14,
  },
  btn: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
    width: 218,
    marginTop: 12,
  },
  productRoot: {},
  paper: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(6),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 35,
    marginBottom: 24,
  },
  input: {    
    textAlign: 'center',
  },
  submitBtn: {
    marginTop: 2,
    marginLeft: theme.spacing(2),
  },
  select: {
    padding: theme.spacing(0.5, 1.2),
    width: 134,
  },
  sortRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 10,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    width: 100,
  },

  controlBtn: {
    background: "#F5F5F5",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.19971)",
    borderRadius: 5,
    width: 24,
    height: 24,
  },
  controlField: {
    width: 30,
    textAlign: 'center',
  },
  controlInput: {
    border: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
  },
  inputRoot: {
    paddingLeft: 14,
    paddingRight: 14,
  },
}));
