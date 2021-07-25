import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Avatar, TableSortLabel, Button,
  Typography,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import moment from 'moment'
import { asKNumber, asNumber } from 'utils/text'
import useStyles from './EnrollerTree.style'
import UplineBar from './UplineBar'
import TableCard from "components/cards/TableCard";
import NoData from "components/NoData";
import { callGetApiWithAuth } from 'utils/api'

const headCells = [
  { label: "User ID" },
  { label: "Name" },
  { label: 'Type' },
  { label: 'Rank' },
  { label: 'PV' },
  { label: 'CV' },
  { label: 'Affiliates' },
  { label: 'Customers' },
];

export default function EnrollerTable(props) {
  const classes = useStyles();
  const myUser = useSelector(state=>state.auth.user)
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0
  })
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [uplines, setUplines] = useState([])

  useEffect(() => {
  }, [])

  useEffect(() => {
    if (myUser) {
      loadTableData(props.userId, paginationParam)
    }
  }, [myUser, props.userId])

  const loadTableData = (userId, paginationParam_) => {
    setIsLoading(true)
    var params = []
    params['per_page'] = paginationParam_.perPage
    params['page'] = paginationParam_.currentPage
    params['user_id'] = userId
    var queryString = Object.keys(params).filter(key => params[key]).map(key => key + '=' + params[key]).join('&')
    callGetApiWithAuth('myteam/unilevel_tree?'+queryString, onGetTableData, ()=>setIsLoading(false))
  }

  const onGetTableData = (data) => {
    setIsLoading(false)
    setTableData(data.data.childrenData.data)
    setPaginationParam({ 
      ...paginationParam, 
      currentPage: data.data.childrenData.current_page, 
      total: data.data.childrenData.total 
    })
    setUplines(data.data.uplines)
  }

  const goPage = (_, page) => {
    let paginationParam_ = {...paginationParam, currentPage: page}
    loadTableData(props.userId, paginationParam_)
  }

  return (
    <TableCard
      title="Genealogy"
      paginationParams={paginationParam}
      onPageChange={goPage}
      className={classes.cardRoot}
    >
      <UplineBar uplines={uplines} 
        goUser={props.goUser}
      />
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.dataCell}>
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
  );
};

