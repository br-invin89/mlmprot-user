import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import { asPrice, asDate } from "utils/text";
import { creditWithdrawRequestStatusText } from 'config/var/creditWithdrawRequest'
import NoData from "components/NoData";

const headCells = [
  { id: "requested",  label: "Requested on" },
  {
    id: "amount",
    disablePadding: false,
    label: "Amount",
  },
  { id: "status", disablePadding: false, label: "Status" },
  { id: "paid", disablePadding: true, label: "Paid on" },
];

export default function WithdrawRequestTable({ tableData, isLoading }) {
  const classes = useStyles();
  
  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
                className={classes.headCell}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading?
            [...Array(15).keys()].map(index => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))
          :
          <>
            {tableData.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  {asDate(row.requested_at)}
                </TableCell>
                <TableCell>
                  {asPrice(row.amount)}
                </TableCell>
                <TableCell>
                  {creditWithdrawRequestStatusText(row['status'])}
                </TableCell>
                <TableCell>
                  {row.paid_at?asDate(row.paid_at):'-'}
                </TableCell>
              </TableRow>
            ))}
            {tableData.length==0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </> }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainer: {
    '&::-webkit-scrollbar': {
      width: 3,
      height: 5,
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '5px'
    },
  },
  btn: {
    textTransform: "capitalize",
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #CED2DA",
    borderRadius: 5,
    width: 134,
  },
  table: {
    [theme.breakpoints.down('md')]: {
      width: 1000
    },
  },
}));
