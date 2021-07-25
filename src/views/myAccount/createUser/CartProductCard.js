import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar"
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import productImage from "assets/images/product_image.png";
import { asPrice, asNumber } from "utils/text";
import { isMemberPrice } from "utils/shop"
import Alert from '@material-ui/lab/Alert'

export default function CartProductCard(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const myUser = useSelector(state => state.auth.user)
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={classes.cartItem}>
      <div className={classes.productImage}>
        <img src={props.item.product.image} />
      </div>
      <div className={classes.descRoot}>
        <h4>
          {props.item.product.title}&nbsp;x&nbsp;
          {props.item.quantity}
        </h4>
        <p className={classes.itemPriceRoot}>
          Price:&nbsp;{asPrice(props.userType == 1 ? props.item.product.member_price : props.item.product.retail_price)},&nbsp;&nbsp;
          PV:&nbsp;{asNumber(props.item.product.pv)},&nbsp;&nbsp;
          CV:&nbsp;{asNumber(props.item.product.cv)}
        </p>
        <div className={classes.controls}>
          <IconButton
            className={classes.controlBtn}
            color="primary"
            onClick={() => {
              props.increaseQty(props.item)
            }}
          >
            <AddIcon />
          </IconButton>
          <TextField
            size="small"
            value={props.item.quantity}
            InputProps={{
              classes: { input: classes.controlInput },
              disableUnderline: true,
            }}
            className={classes.controlField}
          />
          <IconButton
            className={classes.controlBtn}
            color="primary"
            onClick={() => props.decreaseQty(props.item)}
          >
            <RemoveIcon />
          </IconButton>
        </div>
        <p style={{ marginTop: 6 }}>
          <span onClick={() => props.removeCart(props.item)}
            className={classes.removeBtn}
          >
            Remove
          </span>
        </p>
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

    </div>

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
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  content: {
    flex: "1 0 auto",
    padding: theme.spacing(1),
  },
  cover: {
    width: 82,
    height: 82,
    alignSelf: "center",
  },
  productName: {
    fontSize: 18,
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
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  productImage: {
    '& img': {
      width: 80,
      height: 80,
      objectFit: 'contain'
    }
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 12,
  },
  itemPriceRoot: {
    margin: 0,
    fontSize: 14,
  },
  descRoot: {
    width: 'calc(100% - 92px)',
    '& h4': {
      margin: 0
    }
  },
  removeBtn: {
    fontSize: 14,
    color: `${theme.palette.secondary.main}`,
    cursor: 'pointer'
  },
  totalPriceRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      margin: '8px 0'
    }
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  tableHead: {
    paddingLeft: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  tableCell: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    width: 100,
    marginTop: 10
  },

  controlBtn: {
    background: "#F5F5F5",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.19971)",
    borderRadius: '50%',
    width: 20,
    height: 20,
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
