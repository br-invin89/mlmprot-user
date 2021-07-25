import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import {
  Typography,
  TableContainer,
  Table, TableBody, TableFooter,
  TableRow, TableCell,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { asPrice } from "utils/text";
import { shippingRate, isMemberPrice } from 'utils/shop'

export default function OrderSummary(props) {
  const classes = useStyles();
  const myUser = useSelector(state=>state.auth.user)
  const [totalCounts, setTotalCounts] = useState(0)
  const [totalPv, setTotalPv] = useState(0)
  const [totalCv, setTotalCv] = useState(0)
  const [totalMemberPrice, setTotalMemberPrice] = useState(0)
  const [totalRetailPrice, setTotalRetailPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (!myUser) return
    let totalCounts = 0
    let totalPv = 0
    let totalCv = 0
    let totalMemberPrice = 0
    let totalRetailPrice = 0
    let totalPrice = 0
    for (let item of props.cartItems) {
      totalPv += item.product.pv*item.quantity
      totalCv += item.product.cv*item.quantity
      totalCounts += item.quantity*1
      totalMemberPrice += item.product.member_price*item.quantity
      totalRetailPrice += item.product.retail_price*item.quantity
      // totalShipping += 1*shippingRate(product, product.count)
    } 
    // totalPrice = (myUser.type==0)?totalRetailPrice:totalMemberPrice
    totalPrice = props.userType==1?totalMemberPrice:totalRetailPrice
    totalPrice += props.shippingPrice?props.shippingPrice*1:0
    totalPrice += props.tax?props.tax*1:0
    setTotalCounts(totalCounts)
    setTotalPrice(totalPrice)
    setTotalRetailPrice(totalRetailPrice)
    setTotalMemberPrice(totalMemberPrice)
    setTotalPv(totalPv)
    setTotalCv(totalCv)
    setTotalPrice(totalPrice)
  }, [props.userType, props.cartItems, props.shippingPrice, props.tax])
  

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5" className={classes.title}>
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
                {asPrice(props.userType==1?totalMemberPrice:totalRetailPrice)}
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
            {/* <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                Shipping Price
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {totalShipping}
              </TableCell>
            </TableRow> */}
            {props.shippingPrice!=undefined ? (
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
                  {asPrice(props.shippingPrice)}
                </TableCell>
              </TableRow>
            ): ''}
            {props.tax!=undefined ? (
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
                  {asPrice(props.tax)}
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
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3.5),
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
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
    paddingRight: 0
  },
  retailPrice: {
    fontSize: 12,
    textDecoration: "line-through",
  },
}));
