import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Divider,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import { asPrice } from "utils/text";
import { isMemberPrice } from "utils/shop";

export default function OrderSummary({
  products,
  taxAmount,
  shippingPrice,
  discountAmount,
  className,
  promotionDiscountCode,
  ...props
}) {
  const classes = useStyles();
  const promotionCode = useSelector((state) => state.cart.promotionCode);
  const myUser = useSelector((state) => state.auth.user);
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalPv, setTotalPv] = useState(0);
  const [totalCv, setTotalCv] = useState(0);
  const [totalMemberPrice, setTotalMemberPrice] = useState(0);
  const [totalRetailPrice, setTotalRetailPrice] = useState(0);
  const [totalAutoshipPrice, setTotalAutoshipPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [requiredPc, setRequiredPc] = useState(0)
  const [ablePc, setAblePc] = useState(0)
  const [tc, setTc] = useState(0)
  const [remainingPc, setRemainingPc] = useState(0)
  const [showShippingPrice, setShowShippingPrice] = useState(false);
  const [handlingPrice, setHandlingPrice] = useState(0)

  useEffect(() => {
    if (!myUser) return;
    let totalCounts = 0;
    let totalPv = 0;
    let totalCv = 0;
    let totalMemberPrice = 0;
    let totalRetailPrice = 0;
    let totalAutoshipPrice = 0;
    let totalPrice = 0;
    let requiredPc = 0;
    let ablePc = 0;
    if (props.cartType=='products') {
      ablePc = myUser.product_credit.pc_amount
    }
    if (props.cartType=='sample_products') {
      ablePc = myUser.product_credit.sc_amount
    }
    let tc = 0;
    let remainingPc = 0;
    let showShippingPrice_ = false;
    for (let product of products) {
      if (product.is_pc===2) {
        showShippingPrice_ = true
      }
      totalPv += product.pv * product.count;
      totalCv += product.cv * product.count;
      totalCounts += product.count * 1;
      if (props.payType==6) {
        if (props.cartType=='products') {
          requiredPc += product.required_pc*product.count
        }
        if (props.cartType=='sample_products') {
          requiredPc += product.required_sc*product.count
        }
      } else {
        totalMemberPrice += product.member_price * product.count;
        totalRetailPrice += product.retail_price * product.count;
      }
      totalAutoshipPrice += product.autoship_price * product.count;
    }
    totalPrice = isMemberPrice() ? totalMemberPrice : totalRetailPrice;
    let handlingPrice = 0
    if (props.cartType=='products') handlingPrice = totalPrice * 0.1;

    if (requiredPc>ablePc) {
      tc = requiredPc - ablePc;
      totalPrice += 45*tc;
    }
    if (ablePc>requiredPc) {
      remainingPc = ablePc - requiredPc;
    }
    // totalPrice = (myUser.type==0)?totalRetailPrice:totalMemberPrice
    totalPrice +=
      (shippingPrice ? shippingPrice * 1 : 0) +
      (taxAmount ? taxAmount * 1 : 0) -
      (discountAmount ? discountAmount : 0);
    totalAutoshipPrice +=
      (shippingPrice ? shippingPrice * 1 : 0) +
      (taxAmount ? taxAmount * 1 : 0) -
      (discountAmount ? discountAmount : 0);    

    setTotalCounts(totalCounts);
    setTotalPrice(totalPrice);
    setTotalRetailPrice(totalRetailPrice);
    setTotalMemberPrice(totalMemberPrice);
    setTotalPv(totalPv);
    setTotalCv(totalCv);
    setTotalPrice(totalPrice);
    setTotalAutoshipPrice(totalAutoshipPrice)
    setRequiredPc(requiredPc)
    setAblePc(ablePc)
    setTc(tc)
    setRemainingPc(remainingPc)
    setShowShippingPrice(showShippingPrice_)
    setHandlingPrice(handlingPrice)
  }, [myUser, products, discountAmount, taxAmount, shippingPrice, props.cartType, props.payType]);

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h5" className={classes.title}>
        Order Summary
      </Typography>
      {props.pcPayType==1 && props.payType==6 ? 
        <Alert severity="info">
          Shipping price &amp; Top-up product credit amount will be paid from your credit card.
        </Alert>
      : ''}
      {props.pcPayType==3 && props.payType==6 ? 
      <>
        <Alert severity="info" style={{marginBottom: 6}}>
          Shipping price &amp; Top-up product credit amount will be paid from your credit wallet amount.
        </Alert>        
        {myUser.wallet.current_balance<totalPrice?
        <Alert severity="error">          
          Your current credit wallet amount is {asPrice(myUser.wallet.current_balance)}.<br/>
          It's not enough for required amount of {asPrice(totalPrice)}
        </Alert>
        : ''}
      </>
      : ''}
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
            {props.payType!=6 && 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                {/*isMemberPrice()?'Member Price':'Retail Price' */}
                Subtotal
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {asPrice(isMemberPrice() ? totalMemberPrice : totalRetailPrice)}
              </TableCell>
            </TableRow>
            }
            {props.payType==6 && 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                Credits Needed
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {requiredPc}&nbsp;PC
              </TableCell>
            </TableRow>
            }
            {props.payType==6 && 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                Redeemable 
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {ablePc}&nbsp;PC
              </TableCell>
            </TableRow>
            }
            {(props.payType==6 && tc>0) ? 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={`${classes.tableHead} ${classes.emTableCell}`}
              >
                Top up Credits 
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={`${classes.tableCell} ${classes.emTableCell}`}
              >
                {tc}&nbsp;PC
              </TableCell>
            </TableRow>
            : ''}
            {(props.payType==6) ? 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                Credits Balance
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {remainingPc}&nbsp;PC
              </TableCell>
            </TableRow>
            : ''}
            {props.payType!=6 ?
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
            : ''}
            {props.payType!=6 ?
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
            : ''}
            {showShippingPrice && shippingPrice != undefined ? (
            <>
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
                  {myUser['shipping_detail']['shipping_country']=='US'?
                    asPrice(shippingPrice)
                  : asPrice(shippingPrice - handlingPrice)
                  }
                </TableCell>
              </TableRow>
              {(myUser['shipping_detail']['shipping_country']=='CA' && handlingPrice>0) ? 
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableHead}
                >
                  Handling Charge
                </TableCell>
                <TableCell
                  scope="row"
                  align="right"
                  className={classes.tableCell}
                >
                  {asPrice(handlingPrice)}
                </TableCell>
              </TableRow>
              : ''}
            </>
            ) : (
              ""
            )}
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
            {(promotionDiscountCode || promotionCode) && (
              <TableRow>
                <TableCell scope="row" className={classes.tableHead}>
                  <Typography component="p" color="secondary">
                    Promotion Code
                  </Typography>
                </TableCell>
                <TableCell
                  scope="row"
                  align="right"
                  className={classes.tableCell}
                >
                  <Typography component="p" color="secondary">
                    {promotionDiscountCode || promotionCode}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {discountAmount != undefined && Number(discountAmount) > 0 && (
              <TableRow>
                <TableCell scope="row" className={classes.tableHead}>
                  Discount Amount
                </TableCell>
                <TableCell
                  scope="row"
                  align="right"
                  className={classes.tableCell}
                >
                  {`-${asPrice(discountAmount)}`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter style={{ borderTop: "2px solid #eee" }}>
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
            {props.showAutoshipPrice && 
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                After 30 days
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {asPrice(totalAutoshipPrice)}
              </TableCell>
            </TableRow>
            }
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3.5),
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 10,
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
  emTableCell: {
    color: theme.palette.text.primaryInverted,
    backgroundColor: theme.palette.error.dark,
  },
  retailPrice: {
    fontSize: 12,
    textDecoration: "line-through",
  },
}));
