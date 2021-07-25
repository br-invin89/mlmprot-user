import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Skeleton } from "@material-ui/lab";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import TableCard from "components/cards/TableCard";
import DateRangeField from "components/inputs/DateRangeField";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from "utils/api";
import OrderModal from "./OrderModal";
import ordersData from "testdata/order_history_data.json";
import { orderStatusText, orderStatusColor } from "config/var";
import NoData from "components/NoData";

const headCells = [
  {
    id: "order_number",
    numeric: false,
    disablePadding: true,
    label: "Order Number",
  },
  { id: "Date", numeric: false, disablePadding: false, label: "Date" },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Adj. Order Total(USD)",
  },
  {
    id: 'pc_amount',
    label: 'PC'
  },
  {
    id: 'tc_amount',
    label: 'TC'
  },
  {
    id: "tracking",
    disablePadding: false,
    label: "Tracking",
  },
  {
    id: "refunded_amount",
    numeric: true,
    disablePadding: false,
    label: "Refunded Amount",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  
  // {
  //   id: "dist_center",
  //   disablePadding: false,
  //   label: "Dist Center",
  // },
  // {
  //   id: 'bv',
  //   disabledPadding: false,
  //   label: 'BV'
  // }
//   {
//     id: "is_flagged",
//     disablePadding: false,
//     label: "Flagged",
//   },
//   {
//     id: "source",
//     disablePadding: false,
//     label: "Source",
//   },
  {
    id: "receipt",
    numeric: true,
    disablePadding: false,
    label: "Receipt",
  },
];

export default function OrdersTable() {
  const classes = useStyles();

  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    dateRange: {
      startDate: "",
      endDate: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(undefined);

  useEffect(() => {
    loadData(paginationParam, searchParam);
  }, []);

  const onPageChange = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    setPaginationParam(paginationParam_);
    loadData(paginationParam_, searchParam);
  };
  const onDateChange = (dateRange) => {
    let searchParam_ = { ...searchParam, dateRange };
    setSearchParam(searchParam_);
    loadData(paginationParam, searchParam_);
  };
  const loadData = (paginationParam, searchParam) => {
    let params = [];
    params["page"] = paginationParam.currentPage;
    params["per_page"] = paginationParam.perPage;
    let dateRange = searchParam.dateRange;
    let startDate = dateRange.startDate
      ? moment(dateRange.startDate).format("YYYY-MM-DD")
      : "";
    let endDate = dateRange.endDate
      ? moment(dateRange.endDate).format("YYYY-MM-DD")
      : "";
    params["filter[created_at_range]"] =
      startDate && endDate ? startDate + "|" + endDate : "";
    let q = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    setIsLoading(true);
    callGetApiWithAuth("orders?" + q, onGetTableData, () =>
      setIsLoading(false)
    );
  };
  const onGetTableData = (data) => {
    setIsLoading(false);
    setTableData(data.data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.data.current_page,
      total: data.data.total,
    });
  };
  const onOpenDetail = (id) => {
    setSelectedOrderId(id);
  };

  return (
    <TableCard
      title="My Orders"
      cardHeaderClassName={{
        rootClass: classes.tableCardHeaderClass,
        contentTitleClass: classes.cardContentTitle,
      }}
      toolbar={
        <DateRangeField
          value={searchParam.dateRange}
          label="Start/End Date"
          showClearIcon={
            searchParam.dateRange.startDate && searchParam.dateRange.endDate
          }
          handleChange={onDateChange}
          clearFunc={() => {
            const searchParam_ = {
              ...searchParam,
              dateRange: { startDate: "", endDate: "" },
            };
            setSearchParam(searchParam_);
            loadData(paginationParam, searchParam_);
          }}
          customClasses={{
            crossIconClass: classes.crossIcon,
            rootClass: classes.dateRangeSelector,
          }}
          style={{ width: 155 }}
          isToolbar
        />
      }
      paginationParams={paginationParam}
      onPageChange={onPageChange}
    >
      <TableContainer>
        <Table>
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
            {isLoading ? (
              [...Array(15).keys()].map((index) => (
                <TableRow hover key={index}>
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
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                {tableData.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography
                        component={"a"}
                        className={classes.orderId}
                        onClick={() => onOpenDetail(row.id)}
                      >
                        {row.order_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {moment(row.created_at).format("MM/DD/YY")}
                    </TableCell>
                    <TableCell align="right">
                      {asPrice(row.order_total_amount)}
                    </TableCell>
                    <TableCell>
                      {row.pc_amount?row.pc_amount:''}
                    </TableCell>
                    <TableCell>
                      {row.tc_amount?row.tc_amount:''}
                    </TableCell>
                    <TableCell>
                      {row["tracking_number"] ? (
                        <a href={row["tracking_url"]} target="_blank">
                          {row["tracking_number"]}
                        </a>
                      ) : (
                        "-"
                      )}
                      &nbsp;
                    </TableCell>
                    <TableCell align="right">
                      {(row.refunded_amount && row.refunded_amount>0)?asPrice(row.refunded_amount):'-'}
                    </TableCell>
                    <TableCell>
                      <span className={clsx(classes.statusBadge)} status={orderStatusText(row.status)}>
                        {orderStatusText(row.status)}
                      </span>
                    </TableCell>
                    {/*
                  <TableCell align="right">
                    {row.refunded_amount?asPrice(row.refunded_amount):'-'}
                  </TableCell>
                  <TableCell>
                    {row.dist_center.name}
                  </TableCell>
                  <TableCell>
                    {row.order_total_bv+'BV'}
                  </TableCell>                  
                  */}
                                  
                    <TableCell align={"right"}>
                      <Link to={`/order-receipt/${row["id"]}`} target="_blank">
                        View Receipt
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {tableData.length == 0 && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell><NoData /></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderModal
        selectedOrderId={selectedOrderId}
        closeDetail={() => setSelectedOrderId(undefined)}
      />
    </TableCard>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    textTransform: "capitalize",
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tableCardHeaderClass: {
    flexDirection: 'row',
  },
  cardContentTitle: {
    paddingTop: 5,
  },
  dateRangeSelector: {
    "& label": {
      transform: "translate(14px, 12px) scale(1)",
    },
  },
  orderId: {
    fontSize: 14,
    cursor: "pointer",
    color: "blue",
  },
  crossIcon: {
    height: '16px',
    width: '15px',
    top: '11px'
  },
  statusBadge: {
    width: 100,
    textAlign: 'center',
    padding: "2px 0px",
    display: 'inline-block',
    textTransform: "capitalize",
    fontSize: "0.9em",
    borderRadius: 3,
    color: "white",
    '&[status="pending"]': {
      backgroundColor: "#F9AC38",
    },
    '&[status="confirmed"]': {
      backgroundColor: "#5856D6",
    },
    '&[status="shipped"]': {
      backgroundColor: "#1890FF",
    },
    '&[status="failed"]': {
      backgroundColor: "#F56B6E",
    },
    '&[status="refunded"]': {
      backgroundColor: "#F56B6E",
    },
    '&[status="partial refunded"]': {
      backgroundColor: "#7F8FA4",
    },
    '&[status="resent"]': {
      backgroundColor: "#1890FF",
    },
    '&[status="canceled"]': {
      backgroundColor: "#F56B6E",
    },
    '&[status="chargebacked"]': {
      backgroundColor: "#F56B6E",
    },
  },
}));
