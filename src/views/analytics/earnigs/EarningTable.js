import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Button, CircularProgress,
  Typography,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import moment from 'moment'
import TableCard from "components/cards/TableCard";
import { asPrice, asDate } from "utils/text";
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'
import NoData from "components/NoData";

const headCells = [
  { id: "pay_period", label: "Pay Period" },
  { id: "earned", label: "Earned Amount", },
  { id: 'status', label: 'Status' },
  // { id: 'comment', label: 'Comment'},  
  { id: 'action', label: 'Action' },
];

const EarningTable = (props) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([])
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
  const [paramPagination, setParamPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0
  })
  const [isExporting, setIsExporting] = useState(false)
  
  const searchTableData = (paramPagination_) => {
    setIsLoadingTableData(true)
    let params = {}
    params['per_page'] = paramPagination_['perPage']
    params['page'] = paramPagination_['currentPage']
    let queryString = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth('earnings?'+queryString, onGetTableData, ()=>setIsLoadingTableData(false))
  }
  const onGetTableData = (data) => {
    setParamPagination({ ...paramPagination, total: data.data.total, currentPage: data.data.current_page })
    setIsLoadingTableData(false)
    setTableData(data.data.data)
  }
  const goPage = (_, page) => {
    let paramPagination_ = {...paramPagination, currentPage: page}
    setParamPagination(paramPagination_)
    searchTableData(paramPagination_)
  }
  const handleExport = () => {
    setIsExporting(true)
    callGetApiWithAuth(`earnings/export`, onGetCsvData, ()=>setIsExporting(false))
  }
  const onGetCsvData = (data) => {
    setIsExporting(false)
    window.open(data.data.csv_file, '_blank')
  }
  const openDetail = (userBonusId) => {
    props.setSelectedId(userBonusId)
  }

  useEffect(() => {
    searchTableData(paramPagination)
  }, [])

  return (
    <TableCard
      title="Earnings"
      toolbar={
        <div>
          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting && <CircularProgress size={16} color={'#fff'} style={{marginRight: 8}} />}
            Export
          </Button>
        </div>
      }
      paginationParams={paramPagination}
      onPageChange={goPage}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  className={classes.headCell}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingTableData?
              [...Array(10).keys()].map(index => (
                <TableRow key={index}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              ))
            : <>
              {tableData.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    {`${asDate(row['from'])} - ${asDate(row['to'])}`}
                  </TableCell>
                  <TableCell>
                    {asPrice(row['amount'])}
                  </TableCell>
                  <TableCell>
                    {row['status']===1?'Pending':
                    row['status']===2?'Paid':
                    row['status']===3?'Rejected':
                    ''}
                  </TableCell>
                  <TableCell>
                    <Typography 
                      className={classes.link}
                      component={'a'} 
                      variant={'a'}
                      onClick={()=>openDetail(row['id'])}
                    >
                      details
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {tableData.length==0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>      
    </TableCard>
  );
};

export default EarningTable

const useStyles = makeStyles((theme) => ({
  earningRoot: {
    marginBottom: theme.spacing(3),
  },
  avatarRoot: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 13,
  },
  btn: {
    textTransform: "capitalize",
    minWidth: 92,
  },
  actionBtn: {
    width: 60,
  },
  btnMargin: {
    marginRight: 12,
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link :{
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  btnEmail: {
    marginLeft: theme.spacing(3),
  },
}));
