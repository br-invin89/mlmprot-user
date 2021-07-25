import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import {
  Card, CardContent, CardMedia, Box, 
  IconButton, Typography, TextField, Snackbar
} from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import productImage from "assets/images/product_image.png";
import { asPrice } from "utils/text";
import { isMemberPrice } from "utils/shop"
import Alert from '@material-ui/lab/Alert'
export default function CartProductCard({ product, editable = true, payType }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [qty, setQty] = useState(1)
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setQty(product.count)
  }, [product])
  const removeProduct = () => {
    dispatch({ type: 'cart.REMOVE_CART', payload: { product } })
  }
  const increaseQty = () => {
    let qty_ = qty*1+1
    if (myUser.billing_detail.billing_country=='CA' && 
      qty_>3
    ) {
      setErrorMessage('Limit Line Qty to 3 units per sku')
      return
    }
    setQty(qty_)
    dispatch({ type: 'cart.CHANGE_QTY', payload: { product, count: qty_ } })
  }
  const decreaseQty = () => {
    if (qty>1) {
      setQty(qty-1)
      dispatch({ type: 'cart.CHANGE_QTY', payload: { product, count: qty-1 } })
    }    
  }
  
  return (
    <Card className={classes.root}>
      {editable && (
        <IconButton
          className={classes.removIcon}
          onClick={() => removeProduct()}
        >
          <CloseIcon />
        </IconButton>
      )}
      <CardMedia
        className={classes.cover}
        image={product.image}
        title="Product on cart"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h2"
            variant="h5"
            className={classes.productName}
          >
            {product.title}
          </Typography>
          <Box display='flex'>
            <Typography variant="subtitle1" color="textSecondary"
              className={classes.bv}
            >
              {`PV: ${product.pv}`}&nbsp;{`CV: ${product.cv}`}
            </Typography>
          </Box>
        </CardContent>

        <div className={classes.controls}>
          {editable ? (
            <div className={classes.controlBtnGroup}>
              <IconButton
                className={classes.controlBtn}
                color="primary"
                onClick={() => {
                  // if ((product.max_order_quantity == 0) || (product.max_order_quantity > product.count)) {
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
                value={product.count}
                InputProps={{
                  classes: { root: classes.inputRoot },
                  disableUnderline: true,
                }}
                inputProps={{
                  className: classes.controlInput,
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
          ) : (
            <Typography component="span" className={classes.price}>
              QTY:&nbsp;{product.count}
            </Typography>
          )}
          {payType!=6 && 
            <Typography component="span" className={classes.price}>            
              {asPrice(isMemberPrice()?product.member_price:product.retail_price)}
            </Typography>
          }
          {payType==6 && 
            <Typography component="span" className={classes.price}>            
              {product.is_sample==1?product.required_sc:product.required_pc}&nbsp;PC
            </Typography>
          }
        </div>
      </div>
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

    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 12,
    boxShadow: "0px 1px 4px rgba(203, 209, 223, 0.5)",
    marginTop: theme.spacing(2),
    position: "relative",
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: 15
  },
  content: {
    flex: "1 0 auto",
    padding: theme.spacing(1),
  },
  cover: {
    width: 110,
    marginTop: 15,
    height: 82,
    alignSelf: "center",
    backgroundSize: "contain",
  },
  productName: {
    fontSize: 15,
    fontWeight: 500,
  },
  bv: {
    fontSize: 14,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    flexFlow: "wrap"
  },
  controlBtnGroup: {
    marginLeft: 5,
    marginBottom: 5
  },
  controlBtn: {
    background: "#F5F5F5",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.19971)",
    borderRadius: 5,
    width: 24,
    height: 24,
  },
  controlField: {
    width: 40,
  },
  controlInput: {
    border: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
    fontSize: 14,
  },
  price: {
    fontWeight: 500,
    fontSize: 14,
  },
  removIcon: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 4,
    
  },
  inputRoot: {
    paddingLeft: 4,
    paddingRight: 4,
  },
}));
