import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
} from "@material-ui/core";
import TableCard from "components/cards/TableCard";
import { asPrice } from "utils/text";
import SelectField from 'components/inputs/SelectField'
import { callGetApiWithAuth } from 'utils/api'
import WithdrawHistoryTable from './creditLogs/WithdrawHistoryTable'
import TransferHistoryTable from './creditLogs/TransferHistoryTable'
import ReceivedHistoryTable from './creditLogs/ReceivedHistoryTable'
import PurchasedHistoryTable from './creditLogs/PurchasedHistoryTable'
import WithdrawRequestTable from './creditLogs/WithdrawRequestTable'
import { useEffect } from "react";

const headCells = [
  { id: "created", numeric: false, disablePadding: true, label: "Created" },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
];

export default function CreditLogPage() {
  const classes = useStyles();
  const [historyType, setHistoryType] = useState('withdraw_request')
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  })
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    searchTableData(historyType, paginationParam)
  }, [])

  const searchTableData = (historyType, paginationParam) => {
    setIsLoading(true)
    let params = []
    params['page'] = paginationParam['currentPage']
    params['per_page'] = paginationParam['perPage']
    let query = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    if (historyType=='withdraw') {
      callGetApiWithAuth('wallet/withdraw_histories?'+query, onGetTableData, onFailTableData)
    } else if (historyType=='transfer') {
      callGetApiWithAuth('wallet/transfer_histories?'+query, onGetTableData, onFailTableData)
    } else if (historyType=='received') {
      callGetApiWithAuth('wallet/received_histories?'+query, onGetTableData, onFailTableData)
    } else if (historyType=='purchased') {
      callGetApiWithAuth('wallet/purchased_histories?'+query, onGetTableData, onFailTableData)
    } else if (historyType=='withdraw_request') {
      callGetApiWithAuth('wallet/withdraw_requests?'+query, onGetTableData, onFailTableData)
    }
  }
  const onGetTableData = (data) => {
    setTableData(data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: data.current_page,
      total: data.total
    })
    setIsLoading(false)
  }
  const onFailTableData = () => {
    setIsLoading(false)
  }
  const handlePageChange = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page }
    setPaginationParam(paginationParam_)
    searchTableData(historyType, paginationParam_)
  };
  const onChangeType = (historyType) => {
    setHistoryType(historyType)
    let paginationParam_ = {...paginationParam, currentPage: 1}
    setPaginationParam(paginationParam_)
    searchTableData(historyType, paginationParam_)
  }
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableCard
          title="Credit Logs"
          toolbar={
            <SelectField
              value={historyType}
              onChange={e=>onChangeType(e.target.value)}
              options={[
                // {label: 'Withdraw Histories', value: 'withdraw'},
                {label: 'Transfer Histories', value: 'transfer'},
                {label: 'Received Histories', value: 'received'},
                {label: 'Purchased Histories', value: 'purchased'},
                {label: 'Withdraw Requests', value: 'withdraw_request'},
              ]}
            />
          }
          paginationParams={paginationParam}
          onPageChange={handlePageChange}
        >
          {historyType=='withdraw' &&
            <WithdrawHistoryTable tableData={tableData} isLoading={isLoading} />
          }
          {historyType=='transfer' &&
            <TransferHistoryTable tableData={tableData} isLoading={isLoading} />
          }
          {historyType=='received' &&
            <ReceivedHistoryTable tableData={tableData} isLoading={isLoading} />
          }
          {historyType=='purchased' &&
            <PurchasedHistoryTable tableData={tableData} isLoading={isLoading} />
          }
          {historyType=='withdraw_request' &&
            <WithdrawRequestTable tableData={tableData} isLoading={isLoading} />
          }
        </TableCard>
      </Grid>
    </Grid>
  );
};

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

  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #CED2DA",
    borderRadius: 5,
    width: 134,
  },
}));
