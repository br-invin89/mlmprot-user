import React, { useEffect, useState } from 'react'
import {
  TableContainer, Table, TableHead, 
  TableRow, TableCell, TableBody, 
  Avatar, TableSortLabel, Button,
  Typography,
} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import useStyles from './EnrollerTree.style'
import { Skeleton } from '@material-ui/lab'
import TableCard from "components/cards/TableCard";
import { callGetApiWithAuth } from 'utils/api'
import { asKNumber, asNumber } from 'utils/text'
import NoData from "components/NoData";

export default function SearchedTable (props) {
  const classes = useStyles();
  const [tableData, setTableData] = useState([])
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  const loadTableData = (paginationParam) => {
    setIsLoading(true)
    var params = []
    params['user_id'] = props.searchParam['user_id']
    params['username'] = props.searchParam['username']
    params['level'] = props.searchParam['level']
    params['created_at_range'] = props.searchParam['created_at_range']    
    params['per_page'] = paginationParam.perPage
    params['page'] = paginationParam.currentPage
    var q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`myteam?${q}`, onGetTableData, onFailTableData)
  }

  const onGetTableData = (data) => {
    setIsLoading(false)
    setTableData(data.data.data)
    setPaginationParam({
      ...paginationParam,
      currentPage: data.data.current_page,
      total: data.data.total,
    })
  }

  const onFailTableData = () => {
    setIsLoading(false)
  }

  const goPage = (_, page) => {
    let paginationParam_ = {...paginationParam, currentPage: page}
    loadTableData(paginationParam_)
  }

  useEffect(() => {
    let paginationParam_ = {...paginationParam, currentPage: 1}
    loadTableData(paginationParam_)
  }, [props.searchParam])

  return (
    <TableCard
      title="Searched Results"
      paginationParams={paginationParam}
      onPageChange={goPage}
      className={classes.cardRoot}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={classes.dataCell}>
              <TableCell
                key={0}
                className={classes.headCell}
              >
                User ID
              </TableCell>
              <TableCell
                key={1}
                className={classes.headCell}
              >
                Name
              </TableCell>
              <TableCell
                key={5}
                className={classes.headCell}
              >
                Enroller
              </TableCell>
              <TableCell
                key={4}
                className={classes.headCell}
              >
                Type
              </TableCell>
              <TableCell
                key={5}
                className={classes.headCell}
              >
                Rank
              </TableCell>              
              <TableCell
                key={6}
                className={classes.headCell}
              >
                PV
              </TableCell>
              <TableCell
                key={7}
                className={classes.headCell}
              >
                CV
              </TableCell>
              <TableCell
                key={8}
                className={classes.headCell}
              >
                Affiliates
              </TableCell>
              <TableCell
                key={9}
                className={classes.headCell}
              >
                Customers
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading?
              [...Array(10).keys()].map(index=> 
                <TableRow key={index}  className={classes.dataCell}>
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
              )
            : <>
              {tableData.map((row, index) => (
                <TableRow hover key={index} className={classes.dataCell}>
                  <TableCell>
                    #{row.uuid}
                  </TableCell>
                  <TableCell>
                    <div className={classes.avatarRoot}>
                      <Avatar
                        alt={row.first_name+' '+row.last_name}
                        src={row.image}
                        className={classes.avatar}
                      />
                      <Typography component={'a'}
                        className={classes.userLink}
                        onClick={()=>props.goUser(row)}
                      >
                        {row.first_name+' '+row.last_name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    {row.sponsor?
                      <Typography component={'a'}
                        className={classes.userLink}
                        onClick={()=>props.goUser(row.sponsor)}
                      >
                        {row.sponsor.username}
                      </Typography>
                    :'-'}
                  </TableCell>
                  <TableCell>
                    {row.type===1?'Affiliate':'Customer'}
                  </TableCell>
                  <TableCell>
                    {row.rank?row.rank.name:''}
                  </TableCell>                  
                  <TableCell >{row.qualification?asNumber(row.qualification.pv):'-'}</TableCell>
                  <TableCell>{row.qualification?asNumber(row.qualification.cv):'-'}</TableCell>
                  <TableCell>{row.qualification?(row.qualification.left_pe_brand_partners)*1 + (row.qualification.right_pe_brand_partners)*1:'-'}</TableCell>
                  <TableCell>{row.qualification?(row.qualification.left_pe_customers)*1 + (row.qualification.right_pe_customers)*1:'-'}</TableCell>
                </TableRow>
              ))}
              {tableData.length==0 && (
                <TableRow className={classes.dataCell}>
                  <TableCell colSpan={8}>
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </>}
          </TableBody>
        </Table>
      </TableContainer>

    </TableCard>
  )
}



