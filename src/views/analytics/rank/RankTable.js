import React, { useState, useEffect } from 'react'
import clsx from "clsx";
import moment from 'moment'
import { callGetApiWithAuth } from 'utils/api'
import useStyles from './RankTable.style'
import {
  Grid, Box, Tooltip, 
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Avatar, Typography, Button, Select, MenuItem,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import DateRangeField from 'components/inputs/DateRangeField'
import TableCard from "components/cards/TableCard";
import CountryFlag from 'components/flag/CountryFlag'
import NoData from "components/NoData";
import NoPhotoIcon from 'assets/images/nophoto.jpg'
import NumberRange from './NumberRange'
import SelectRange from './SelectRange'

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name/User" },
  { id: "rank", numeric: false, disablePadding: false, label: "Rank" },
  /*
  {
    id: "pv",
    numeric: false,
    disablePadding: false,
    label: "PV",
  },
  {
    id: "gv",
    numeric: false,
    disablePadding: false,
    label: "GV",
  },
  {
    id: "pe",
    numeric: false,
    disablePadding: false,
    label: "PE",
  },
  */
  {
    id: "qualified_pack",
    numeric: false,
    disablePadding: false,
    label: "Qualified Pack?",
  },
  {
    id: "left_brand_partners",
    numeric: false,
    disablePadding: false,
    label: "Left Brand Partners",
  },
  {
    id: "right_brand_partners",
    numeric: false,
    disablePadding: false,
    label: "Right Brand Partners",
  },
  {
    id: "lessor_volume_cv",
    numeric: false,
    disablePadding: false,
    label: "CV in Lesser Team",
  },
  {
    id: "lessor_volume_cnt",
    numeric: false,
    disablePadding: false,
    label: "Weeks",
  },
  {
    id: "next_rank",
    numeric: false,
    disablePadding: false,
    label: "Next Rank",
  },
  {
    id: "ranked_on",
    numeric: false,
    disablePadding: false,
    label: "Ranked On",
  },
  {
    id: "country",
    numeric: false,
    disablePadding: false,
    label: "Country",
  },
];

const RankTable = () => {
  const classes = useStyles();
  const [paramSearch, setParamSearch] = useState({ 
    month_range: moment().format('YYYY-MM-DD|YYYY-MM-DD'),
    pv_range: '0|0',
    pe_range: '0|0',
    gv_range: '0|0',
    qualified_pack: '',
    left_brand_partners_range: '0|0',
    right_brand_partners_range: '0|0',
    lessor_volume_cv_range: '0|0',
    lessor_volume_cnt_range: '0|0',
    rank_range: '0|0'
  })
  const [paramPagination, setParamPagination] = useState({ 
    currentPage: 1,
    perPage: 10,
    total: 0
  })
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
  const [tableData, setTableData] = useState([])
  const [rankOptions, setRankOptions] = useState([])

  useEffect(() => {
    searchTableData(paramSearch, paramPagination)
    getRankOptions()
  }, [])
  const searchTableData = (paramSearch_, paramPagination_) => {
    var params = {}
    // params['month_range'] = paramSearch_['month_range']
    params['page'] = paramPagination_['currentPage']
    params['per_page'] = paramPagination_['perPage']
    params['gv'] = paramSearch_['gv_range']
    params['pv'] = paramSearch_['pv_range']
    params['pe'] = paramSearch_['pe_range']
    params['qualified_pack'] = paramSearch_['qualified_pack']
    params['left_brand_partners'] = paramSearch_['left_brand_partners_range']
    params['right_brand_partners'] = paramSearch_['right_brand_partners_range']
    params['lessor_volume_cv'] = paramSearch_['lessor_volume_cv_range']
    params['lessor_volume_cnt'] = paramSearch_['lessor_volume_cnt_range']
    params['rank'] = paramSearch_['rank_range']
    var queryString = Object.keys(params).map(key => key+'='+params[key]).join('&')
    setIsLoadingTableData(true)
    callGetApiWithAuth('ranks?'+queryString, onGetTableData, ()=>setIsLoadingTableData(false))
  }
  const onGetTableData = (data) => {
    setIsLoadingTableData(false)
    setParamPagination({ ...paramPagination, currentPage: data.data.current_page, total: data.data.total })
    setTableData(data.data.data)
  }
  const goPage = (_, page) => {
    let paramPagination_ = { ...paramPagination, currentPage: page }
    setParamPagination(paramPagination_)
    searchTableData(paramSearch, paramPagination_)
  }
  const onSearchByRange = (monthRange) => {    
    let paramSearch_ = {...paramSearch}
    paramSearch_['month_range'] = monthRange
    setParamSearch(paramSearch_)
    let paramPagination_ = {...paramPagination, currentPage: 1}
    setParamPagination(paramPagination_)
    searchTableData(paramSearch_, paramPagination_)
  }
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf('Month'),
  })
  
  const onChangeDate = (dateRange) => {
    setDateRange(dateRange)
    onSearchByRange(moment(dateRange.startDate).format('YYYY-MM-DD')+'|'+
      moment(dateRange.endDate).format('YYYY-MM-DD')
    )
  }

  const getRankOptions = () => {
    callGetApiWithAuth('setting/ranks', onGetRankOptions)
  }
  const onGetRankOptions = (data) => {
    let rankOptions = []
    data.data.map(el => {
      rankOptions.push({
        label: el.name, 
        value: el.id
      })
    })
    setRankOptions(rankOptions)
  }

  const handleSearch = () => {
    const paramPagination_ = { ...paramPagination, currentPage: 1 }
    searchTableData(paramSearch, paramPagination_)
  }

  return (
    <TableCard
      title="Current Group Rank Volume"
      toolbar={
        <>
        {/*
        <DateRangeField
          value={dateRange}
          label="Date Range"
          className={clsx(classes.input)}
          handleChange={onChangeDate}
        />
        */}
        </>
      }
      paginationParams={paramPagination}
      onPageChange={goPage}
    >
      <Grid container spacing={2}>
        {/*
        <Grid item xs={12} sm={4} md={3}>
          <NumberRange label={'GV Range'}
            value={paramSearch.gv_range} 
            onChange={gv_range => setParamSearch({...paramSearch, gv_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <NumberRange label={'PV Range'}
            value={paramSearch.pv_range} 
            onChange={pv_range => setParamSearch({...paramSearch, pv_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <NumberRange label={'PE Range'}
            value={paramSearch.pe_range} 
            onChange={pe_range => setParamSearch({...paramSearch, pe_range})}
          />          
        </Grid>
        */}
        <Grid item xs={12} sm={4}>
          <label>Quailifed Pack?</label><br/>
          <Select 
            value={paramSearch.qualified_pack}
            onChange={e=>setParamSearch({...paramSearch, qualified_pack: e.target.value})}
            options={[
              { label: '', value: '' },
              { label: 'Yes', value: 1 },
              { label: 'No', value: 0 },
            ]}
            style={{ minWidth: '80px' }}
          >
            <MenuItem value={''}>&nbsp;</MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberRange label={'Left Partners Range'}
            value={paramSearch.left_brand_partners_range} 
            onChange={left_brand_partners_range => setParamSearch({...paramSearch, left_brand_partners_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberRange label={'Right Partners Range'}
            value={paramSearch.right_brand_partners_range} 
            onChange={right_brand_partners_range => setParamSearch({...paramSearch, right_brand_partners_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberRange label={'Lesser Volume Range'}
            value={paramSearch.lessor_volume_cv_range} 
            onChange={lessor_volume_cv_range => setParamSearch({...paramSearch, lessor_volume_cv_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberRange label={'Weeks Range'}
            value={paramSearch.lessor_volume_cnt_range} 
            onChange={lessor_volume_cnt_range => setParamSearch({...paramSearch, lessor_volume_cnt_range})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectRange label={'Rank Range'}
            value={paramSearch.rank_range} 
            onChange={rank_range => setParamSearch({...paramSearch, rank_range})}
            options={rankOptions}
          />
        </Grid>
      </Grid>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <p className={classes.searchDesc}>* Please make the field as zero if you do not want to set the filter.</p>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
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
          {isLoadingTableData?
            [...Array(10).keys()].map(index => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            )) : <>
              {tableData.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <div className={classes.avatarRoot}>
                      <Avatar
                        src={row.image?row.image : NoPhotoIcon}
                        className={classes.avatar}
                      />
                      {row.first_name+' '+row.last_name}
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Tooltip title={
                      <Typography component={'div'}>
                        <Typography component={'p'} className={classes.tooltipText}>
                          {row['rank']['qualifications']}
                        </Typography>
                      </Typography>
                    } placement={'right'}>
                      <Box>
                        <Typography component={'a'} className={classes.rankName}>
                          {row['rank']['name']}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  {/*
                  <TableCell>{row['qualifications']?row['qualifications']['pv']:'-'}</TableCell>
                  <TableCell>{row['qualifications']?row['qualifications']['gv']:'-'}</TableCell>
                  <TableCell>
                    {row['qualifications']?row['qualifications']['pe']:'-'}
                  </TableCell>
                  */}
                  <TableCell>
                    {row['qualifications']?row['qualifications']['qualified_pack']==1?'Yes':'No':'-'}
                  </TableCell>
                  <TableCell>
                    {row['qualifications']?row['qualifications']['left_brand_partners']:'-'}
                  </TableCell>
                  <TableCell>
                    {row['qualifications']?row['qualifications']['right_brand_partners']:'-'}
                  </TableCell>
                  <TableCell>
                    {row['qualifications']?row['qualifications']['lessor_volume_cv']:'-'}
                  </TableCell>
                  <TableCell>
                    {row['qualifications']?row['qualifications']['lessor_volume_cnt']:'-'}
                  </TableCell>
                  <TableCell>
                    {row['next_rank']?
                      <Tooltip title={
                        <Typography component={'div'}>
                          <Typography component={'p'} className={classes.tooltipText}>
                            {row['next_rank']['qualifications']}
                          </Typography>
                        </Typography>
                      } placement={'right'}>
                        <Box>
                          <Typography component={'a'} className={classes.rankName}>
                            {row['next_rank']['name']}
                          </Typography>
                        </Box>
                      </Tooltip>
                    :''}
                  </TableCell>
                  <TableCell>
                    {row['ranked_at']?moment(row['ranked_at'], 'YYYY-MM-DD').format('MM/DD/YY'):''}
                  </TableCell>
                  <TableCell>
                    {row.shipping_detail?
                      <Tooltip title={row.shipping_detail.shipping_country}>
                        <Box>
                          <CountryFlag countryCode={row.shipping_detail.shipping_country} />
                        </Box>
                      </Tooltip>
                    : ''}
                  </TableCell>
                </TableRow>
              ))}
              {tableData.length===0 && (
                <TableRow>
                  <TableCell colSpan={10}>
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </>}
          </TableBody>
        </Table>
      </TableContainer>
    </TableCard>
  );
};

export default RankTable
