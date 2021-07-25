import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
  Typography,
  Card, Button, Divider,
  TableContainer,
  Table, TableBody, TableFooter,
  TableRow, TableCell, 
  IconButton,  TextField
} from '@material-ui/core'
import { callPostApiWithAuth } from 'utils/api'
import { asPrice, asNumber } from 'utils/text'
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import useStyles from './CartSummary.style'

export default function CartSummary(props) {
  const classes = useStyles()
  const [totalCounts, setTotalCounts] = useState(0)
  const [totalPv, setTotalPv] = useState(0)
  const [totalCv, setTotalCv] = useState(0)
  const [totalMemberPrice, setTotalMemberPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [taxAmount, setTaxAmount] = useState(0)

  useEffect(() => {
    let totalCounts = 0
    let totalPv = 0
    let totalCv = 0
    let totalMemberPrice = 0
    let totalPrice = 0
    for (let item of props.cartItems) {
      totalPv += item.product.pv*item.quantity
      totalCv += item.product.cv*item.quantity
      totalCounts += item.quantity*1
      totalMemberPrice += item.product.member_price*item.quantity
      // totalShipping += 1*shippingRate(product, product.count)
    } 
    // totalPrice = (myUser.type==0)?totalRetailPrice:totalMemberPrice
    totalPrice = totalMemberPrice
    totalPrice += shippingPrice?shippingPrice*1:0
    totalPrice += taxAmount?taxAmount*1:0

    setTotalCounts(totalCounts)
    setTotalPrice(totalPrice)
    setTotalMemberPrice(totalMemberPrice)
    setTotalPv(totalPv)
    setTotalCv(totalCv)
    setTotalPrice(totalPrice)
  }, [props.cartItems, shippingPrice, taxAmount])

  useEffect(() => {
    if (props.cartItems.length==0) return
    let orderDetails = props.cartItems.map(item=>
      ({ product_id: item.product.id, quantity: item.quantity })
    )
    let data = {
      orderDetails
    }
    callPostApiWithAuth(`autoships/check/shipping_price`, data, onGetShippingPrice)    
  }, [props.cartItems])
  
  const onGetShippingPrice = (data) => {
    setShippingPrice(data.data.shippingPrice)
    let orderDetails = props.cartItems.map(item => 
      ({ product_id: item.product.id, quantity: item.quantity })
    )
    let order = {
      shipping_price: data.data.shippingPrice
    }
    let data_ = {
      orderDetails,
      order,
    }
    callPostApiWithAuth(`autoships/check/tax`, data_, onGetTaxAmount)
  }
  const onGetTaxAmount = (data) => {
    setTaxAmount(data.data.taxAmount)
  }

  return (
    <div className={classes.root}>
      <div>
        <h2>Autoship Summary</h2>
      </div>
      <Card>
        <div className={classes.cardRoot}>
          {props.cartItems.length>0?
            <>
              {props.cartItems.map(item => 
                <CartItem item={item}
                  removeCart={props.removeCart}
                  decreaseQty={props.decreaseQty}
                  increaseQty={props.increaseQty}
                />
              )}
              <Divider />
              <Typography className={classes.title}>
                Order Summary
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        Items
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {totalCounts}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        {/*props.userType==0?'Member Price':'Retail Price'*/}
                        Subtotal
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {asPrice(totalMemberPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        PV
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {totalPv}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        CV
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {totalCv}
                      </TableCell>
                    </TableRow>
                    {shippingPrice!=undefined ? (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableHead}
                        >
                          Shipping
                        </TableCell>
                        <TableCell
                          scope="row"
                          align="right"
                          className={classes.tableCell}
                        >
                          {asPrice(shippingPrice)}
                        </TableCell>
                      </TableRow>
                    ): ''}
                    {taxAmount!=undefined ? (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableHead}
                        >
                          Tax
                        </TableCell>
                        <TableCell
                          scope="row"
                          align="right"
                          className={classes.tableCell}
                        >
                          {asPrice(taxAmount)}
                        </TableCell>
                      </TableRow>
                    ): ''}            
                  </TableBody>
                  <TableFooter style={{borderTop: '2px solid #eee'}}>
                    {/*
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        You Saved
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {asPrice(totalRetailPrice - totalMemberPrice)}
                      </TableCell>
                    </TableRow>
                    */}
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableHead}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        scope="row"
                        align="right"
                        className={classes.tableCell}
                      >
                        {asPrice(totalPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} className={classes.actionCell}>
                        <div className={classes.actionGroup}>
                          <Button 
                            color={'primary'}
                            variant={'contained'}
                            onClick={props.openMakeModal}
                          >
                            Set Autoship
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </>
          :
            <p>There are no items on cart.</p>
          }
        </div>
      </Card>
    </div>
  )
}

const CartItem = props => {
  const classes = useStyles()
  
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
          Price:&nbsp;{asPrice(props.item.product.member_price)},&nbsp;&nbsp;
          PV:&nbsp;{asNumber(props.item.product.pv)},&nbsp;&nbsp;
          CV:&nbsp;{asNumber(props.item.product.cv)}
        </p>
        <div className={classes.controls}>
          <IconButton
            className={classes.controlBtn}
            color="primary"
            onClick={() => props.increaseQty(props.item)}
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
        <p style={{marginTop: 6}}>
          <span onClick={()=>props.removeCart(props.item)}
            className={classes.removeBtn}
          >
            Remove
          </span>
        </p>
      </div>
    </div>
  )
}
