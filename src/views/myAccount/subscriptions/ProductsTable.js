import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core'
import {
  Skeleton
} from '@material-ui/lab'
import Pagination from '@material-ui/lab/Pagination'
import TableCard from 'components/cards/TableCard'
import moment from 'moment'
import { asPrice, asDate } from 'utils/text'
import { callGetApiWithAuth } from 'utils/api'
import { autoshipStatusText } from 'config/var'
import NoData from "components/NoData";

const headCells = [
  { id: 'products', label: 'Products' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'next_billing_at', label: 'Next Billing Date' },
  { id: 'last_billing_at', label: 'Last Billing Date' },
]

export default function ProductsTable() {
  const classes = useStyle()
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  })
  const [tableData, setTableData] = useState(undefined)
  const myUser = useSelector((state) => state.auth.user)

  useEffect(() => {
    loadData(paginationParam)
  }, [])

  const loadData = (paginationParam) => {
    let params = []
    params['page'] = paginationParam.currentPage
    params['per_page'] = paginationParam.perPage
    let paramsQuery = Object.keys(params).map(k => k + '=' + params[k]).join('&')
    callGetApiWithAuth('subscriptions/past_subscriptions?' + paramsQuery, onGetTableData)
  }
  const onGetTableData = (data) => {
    setTableData(data.data.data)
    setPaginationParam({ ...paginationParam, currentPage: data.data.current_page, total: data.data.total })
  }
  const handlePage = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page }
    setPaginationParam(paginationParam_)
    loadData(paginationParam_)
  }

  return (
    <TableCard
      title='Past Subscriptions'
      paginationParams={paginationParam}
      onPageChange={handlePage}
    >
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  className={classes.headCell}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData ? tableData.map((row, index) => (
              <TableRow hover key={index}>
                {/*
                <TableCell component='th' scope='row' padding='none'>
                  <div className={classes.tdCell}>
                    <img
                      className={classes.productImage}
                      src={row.product.image}
                      alt={row.product.title}
                    />
                    {row.product.title}
                  </div>
                </TableCell>
                */}
                <TableCell>
                  {row.details.map(el => el.product.title).join(', ')}
                </TableCell>
                <TableCell>
                  {row.details.map(el => el.quantity).join(', ')}
                </TableCell>
                <TableCell>
                  {asDate(row.next_billing_at)}
                </TableCell>
                <TableCell>
                  {asDate(row.last_billing_at)}
                </TableCell>
              </TableRow>
            )) : [...Array(10).keys()].map(index =>
              <TableRow hover key={index}>
                <TableCell><Skeleton height={24} /></TableCell>
                <TableCell><Skeleton height={24} /></TableCell>
                <TableCell align='right'><Skeleton height={24} /></TableCell>
                <TableCell><Skeleton height={24} /></TableCell>
              </TableRow>
            )}
            {tableData && tableData.length == 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableCard>
  )
}

const useStyle = makeStyles((theme) => ({
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  table: {
    [theme.breakpoints.down('md')]: {
      width: '1000px',
    },
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
  paginationRoot: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 22,
    paddingLeft: 24,
  },
  pagination: {
    marginTop: -10,
  },
  results: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  productImage: {
    width: 40,
    height: 40,
  },
  tdCell: {
    display: 'flex',
    alignItems: 'center',
  }
}))
