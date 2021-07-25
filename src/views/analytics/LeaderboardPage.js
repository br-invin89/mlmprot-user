import React, { useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Avatar, Tooltip, IconButton, Box,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import TableCard from "components/cards/TableCard";
import DateRangeField from "components/inputs/DateRangeField";
import ordersData from "testdata/orders_table_data.json";
import NoData from "components/NoData";
import { callGetApiWithAuth } from 'utils/api'
import { countryName } from 'config/var'
import { asPrice, asNumber } from 'utils/text'
import CountryFlag from 'components/flag/CountryFlag'
import StatCardsSection from './leaderboard/StatCardsSection'
import crownImg from 'assets/images/crown.png'

const plan = process.env.REACT_APP_COMPENSATION_PLAN

const headCells = [
  { label: "#", align: 'center' },
  { label: "Name" },
  { label: "Country" },
  { label: "Personal Enrollments", align: 'center' },
];

export default function LeaderboardPage() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([])
  const [statData, setStatData] = useState(undefined)
  const [searchData, setSearchData] = useState({
    month_range: moment().startOf('month').format('YYYY-MM-DD')+'|'+
      moment().endOf('month').format('YYYY-MM-DD')
  })
  const [monthRange, setMonthRange] = useState({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    perPage: 100,
    total: 0
  })  
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
  useEffect(() => {
    searchTableData(searchData, paginationData)
    // searchStatData()
  }, [])
  const searchTableData = (searchData_, paginationData_) => {
    var params = {}
    params['date_range'] = searchData_.month_range
    params['page'] = paginationData_.currentPage
    params['per_page'] = paginationData_.perPage
    var q = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    setIsLoadingTableData(true)
    callGetApiWithAuth('leaderboard?'+q, onGetTableData, ()=>setIsLoadingTableData(false))
  }
  const onGetTableData = (data) => {
    setTableData(data.data)
    setPaginationData({...paginationData, currentPage: data.data.current_page, total: data.data.total})
    setIsLoadingTableData(false)
  }  
  const searchStatData = () => {
    callGetApiWithAuth('leaderboard/stats', onGetStatData)
  }
  const onGetStatData = (data) => {
    setStatData(data.data)
  }
  const goPage = (_, page) => {
    let paginationData_ = {...paginationData, currentPage: page}
    setPaginationData(paginationData_)
    searchTableData(searchData, paginationData_)
  }
  const onSearchByRange = (monthRange) => {    
    let searchData_ = {...searchData}
    setMonthRange(monthRange)
    let month_range = moment(monthRange.startDate).format('YYYY-MM-DD')+'|'+
    moment(monthRange.endDate).format('YYYY-MM-DD')
    searchData_['month_range'] = month_range
    setSearchData(searchData_)
    let paginationData_ = {...paginationData, currentPage: 1}
    setPaginationData(paginationData_)
    searchTableData(searchData_, paginationData_)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <StatCardsSection statData={statData} /> */}
      </Grid>
      <Grid item xs={12}>
        <TableCard
          title="Top 100 Leaderboard"
          toolbar={
            <>
            {/*
            <DateRangeField
              value={monthRange}
              className={clsx(classes.input)}
              handleChange={onSearchByRange}
            />
            */}
            </>
          }
          paginationParams={paginationData}
          onPageChange={goPage}
        >
          <TableContainer className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, index) => (
                    <TableCell
                      key={index}
                      align={headCell.align || 'left'}
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
                    </TableRow>
                  ))
                : <>
                  {tableData.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align={'center'}>
                        {index==0?
                          <img src={crownImg} alt={'Top 1'}
                            style={{ width: 16, height: 12 }}
                          />
                        : index+1}
                      </TableCell>
                      <TableCell>
                        <div className={classes.avatarRoot}>
                          <Avatar
                            src={row.user.image}
                            className={classes.avatar}
                          />
                          {row.user.first_name+' '+row.user.last_name}
                        </div>
                      </TableCell>
                      <TableCell >
                        <Tooltip title={countryName(row.user.billing_detail.billing_country)}>
                          <Box>
                            <CountryFlag countryCode={row.user.billing_detail.billing_country} />
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        {asNumber(row.pe)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {tableData.length==0 && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <NoData />
                      </TableCell>
                    </TableRow>
                  )}
                </>}                
              </TableBody>
            </Table>
          </TableContainer>
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
  userAvatar: {
    width: 70,
    height: 70,
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
    // backgroundColor: "#FAFAFA",
    // border: "1px solid #CED2DA",
    borderRadius: 5,
    width: 134,
  },
  username: {
    marginTop: 8,
    marginBottom: 7,
    fontSize: 16,
    fontWeight: 500,
  },
  title: {
    color: theme.palette.text.disabled,
    fontWeight: 500,
  },
  score: {
    fontSize: 22,
    fontWeight: 500,
    marginTop: 7,
  },
  star: {
    backgroundColor: theme.palette.text.primaryInverted,
    width: 29,
    height: 29,
    borderRadius: "100%",
  },
  yellow: {
    color: theme.palette.info.light,
  },
  pink: {
    color: theme.palette.secondary.dark,
  },
  purple: {
    color: theme.palette.primary.darker,
  },
}));
