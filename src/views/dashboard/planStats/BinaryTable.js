import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { callGetApiWithAuth } from "utils/api";
import { asNumber } from "utils/text";

const BinaryTable = ({ data }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(undefined);
  const titles = {
    customers: "Customers",
    affiliates: "Affiliate",
    autoships: "Total Autoships",
    bv: "Binary CV",
    carry_over: "Carry Over",
    total_tree: "Total Tree",
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    callGetApiWithAuth("dashboard/binary_stats", onGetTableData);
  };
  const onGetTableData = (data) => {
    setTableData(data.data);
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headCelll} padding="none">
              Type
            </TableCell>
            <TableCell align="right" className={classes.headCelll}>
              Left Leg
            </TableCell>
            <TableCell align="right" className={classes.headCelll}>
              Right Leg
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(titles).map((k) => {
            let row = tableData ? tableData[k] : undefined;
            return (
              <TableRow key={k}>
                <TableCell
                  component="th"
                  scope="row"
                  className={clsx(classes.mainCell, classes.normalCell)}
                  padding="none"
                >
                  {titles[k]}
                </TableCell>
                <TableCell align="right" className={clsx(classes.normalCell)}>
                  {row ? asNumber(row.left) : <Skeleton />}
                </TableCell>
                <TableCell align="right" className={clsx(classes.normalCell)}>
                  {row ? asNumber(row.right) : <Skeleton />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BinaryTable

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: 26,
  },
  headCelll: {
    fontSize: 12,
    fontWeight: 300,
  },
  mainCell: {
    fontWeight: "600",
  },
  normalCell: {
    fontWeight: "normal",
    fontSize: 14,
    paddingTop: "6px",
    paddingBottom: "6px",
  },
}));
