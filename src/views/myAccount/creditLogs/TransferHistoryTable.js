import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Skeleton } from '@material-ui/lab'
import {
  Grid,
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
} from "@material-ui/core";
import { asPrice, asDate } from "utils/text";
import NoData from "components/NoData";
import NoPhotoIcon from 'assets/images/nophoto.jpg'

const headCells = [
  { id: "created",  label: "Transferred On" },
  {
    id: "description",
    disablePadding: false,
    label: "Description",
  },
  {
    id: "receiver",
    disablePadding: false,
    label: "Receiver",
  },
  { id: "amount", disablePadding: false, label: "Amount", align: 'right' },
];

export default function TransferHistoryTable ({ tableData, isLoading }) {
  const classes = useStyles();
  
  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                padding={headCell.disablePadding ? "none" : "default"}
                className={classes.headCell}
                align={headCell.align || 'left'}
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
                  {asDate(row.created_at)}
                </TableCell>
                <TableCell>
                  {row['description']}
                </TableCell>
                <TableCell className={classes.userTd}>
                  <img src={row['receiver']['image'] || NoPhotoIcon} />
                  <span>{row['receiver']['first_name']+' '+row['receiver']['last_name']}</span>
                </TableCell>
                <TableCell align={'right'}>
                  {asPrice(row['amount'])}
                </TableCell>
              </TableRow>
            ))}
            {tableData.length==0 && (
              <TableRow>
                <TableCell colSpan={6}>
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
  userTd: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 30,
      height: 30,
      borderRadius: '50%',
      marginRight: 4,
    }
  },
  table: {
    [theme.breakpoints.down('md')]: {
      width: 1000
    },
  },
}));
