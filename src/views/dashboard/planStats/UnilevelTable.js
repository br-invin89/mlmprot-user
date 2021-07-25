import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import { callGetApiWithAuth } from "utils/api";
import { asNumber } from "utils/text";
import NoPhotoIcon from "assets/images/nophoto.jpg";

const UnilevelTable = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // setInitialSelectedTab();
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/unilevel_table", onGetData, () =>
      setIsLoading(false)
    );
  };

  const onGetData = (data) => {
    setIsLoading(false);
    setData(data.data);
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headCelll}>Name</TableCell>
            {/* <TableCell className={classes.headCelll}>
              Rank
            </TableCell> */}
            <TableCell className={classes.headCelll}>GV</TableCell>
            <TableCell className={classes.headCelll}>
              Customers
            </TableCell>
            <TableCell className={classes.headCelll}>
              Affiliates
            </TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? [...Array(5).keys()].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton height={24} />
                  </TableCell>
                  {/* <TableCell>
                  <Skeleton height={24} />
                </TableCell> */}
                  <TableCell>
                    <Skeleton height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={24} />
                  </TableCell>
                </TableRow>
              ))
            : data &&
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className={clsx(classes.userCell, classes.cell)}>
                    <img
                      className={classes.userAvatar}
                      src={row.image ? row.image : NoPhotoIcon}
                    />
                    <Typography component={"p"}>
                      {row.first_name + " " + row.last_name}
                    </Typography>
                  </TableCell>
                  {/*
                <TableCell
                  className={clsx(classes.cell)}
                >
                  {row.rank.name}
                </TableCell>
                */}
                  <TableCell className={clsx(classes.cell)}>
                    {row.gv}
                  </TableCell>
                  <TableCell className={clsx(classes.cell)}>
                    {row.customers}
                  </TableCell>
                  <TableCell className={clsx(classes.cell)}>
                    {row.affiliates}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UnilevelTable;

const useStyles = makeStyles((theme) => ({
  noBorder: {
    borderBottom: 0,
  },
  tableContainer: {
    height: 300,
    "&::-webkit-scrollbar": {
      height: 5,
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  headCelll: {
    fontSize: 12,
    fontWeight: 300,
  },
  cell: {
    fontSize: 14,
    fontWeight: 400,
    "& p": {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  normalCell: {
    fontWeight: "normal",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    border: `1px solid ${theme.palette.border.active}`,
    borderRadius: "50%",
    marginRight: "4px",
    objectFit: "cover",
  },
  table: {
    [theme.breakpoints.between("md", "lg")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "600px",
    },
  },
}));
