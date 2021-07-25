import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TableContainer,
  Table, TableBody, TableFooter,
  TableRow, TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { asPrice } from "utils/text";

export default function OrderCheckoutSummary({
  confirmResult,
  ...props
}) {
  const classes = useStyles();

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
                {confirmResult.order.details.length}
              </TableCell>
            </TableRow>
            {confirmResult.order.pay_type!=6 && 
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
                {asPrice(confirmResult.order.order_total_amount)}
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
                {confirmResult.order.pc_amount}&nbsp;PC
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
                Top-up Credits
              </TableCell>
              <TableCell
                scope="row"
                align="right"
                className={classes.tableCell}
              >
                {confirmResult.order.tc_amount}&nbsp;PC
              </TableCell>
            </TableRow>
            }
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
                {confirmResult.order.order_total_pv}
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
                {confirmResult.order.order_total_cv}
              </TableCell>
            </TableRow>
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
                {asPrice(confirmResult.order.shipping_price)}
              </TableCell>
            </TableRow>
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
                {asPrice(confirmResult.order.tax_amount)}
              </TableCell>
            </TableRow>
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
                {asPrice(confirmResult.order.order_total_amount)}
              </TableCell>
            </TableRow>
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
  retailPrice: {
    fontSize: 12,
    textDecoration: "line-through",
  },
}));
