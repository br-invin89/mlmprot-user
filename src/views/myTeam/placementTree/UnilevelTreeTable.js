import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Button, CircularProgress,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import moment from 'moment'
import TableCard from "components/cards/TableCard";
import { asPrice } from "utils/text";
import { callGetApiWithAuth, callPostApiWithAuth } from 'utils/api'
import NoData from "components/NoData";

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type' },
  { id: 'join_date', label: 'Join Date' },
  { id: 'rank', label: 'Rank' },
  { id: 'ibo_kit', label: 'IBO Kit' },
  { id: 'level', label: 'Level' },
  { id: 'pv', label: 'PV' },
  { id: 'psv', label: 'PSV' },
  { id: 'prsv', label: 'PRSV' },
  { id: "total_gv", label: "Total GV" },
  { id: 'total_customer_gv', label: 'Total Customer GV' },
  { id: 'fifty_five_gv', label: '55/45 GV' },
  { id: 'placement_sponser', label: 'Placement Sponsor' },
];

const UnilevelTreeTable = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([
    {
      id: 12,
      name: 'Ali',
      type: 1,
      join_date: "2020-10-25",
      rank: 3,
      ibo_kit: 10,
      level: 5,
      pv: 14,
      psv: 23,
      prsv: 0,
      total_gv: 200,
      total_customer_gv: 153,
      gv_55_45: 22,
      placement_sponsor: 'Joker'
    },
    {
      id: 15,
      name: 'Boby',
      type: 1,
      join_date: "2020-10-25",
      rank: 3,
      ibo_kit: 10,
      level: 5,
      pv: 14,
      psv: 23,
      prsv: 0,
      total_gv: 200,
      total_customer_gv: 153,
      gv_55_45: 22,
      placement_sponsor: 'Joker'
    },
    {
      id: 21,
      name: 'Clark',
      type: 1,
      join_date: "2020-10-25",
      rank: 3,
      ibo_kit: 10,
      level: 5,
      pv: 14,
      psv: 23,
      prsv: 0,
      total_gv: 200,
      total_customer_gv: 153,
      gv_55_45: 22,
      placement_sponsor: 'Joker'
    },
  ])
  const [parentPath, setParentPath] = useState(
    [
      {id: 1, name: 'John Doe'}, 
      {id: 3, name: 'Simon'}, 
      {id: 8, name: 'Puppy'},
    ]
  )
  const [isLoadingTableData, setIsLoadingTableData] = useState(false)
  const [paramPagination, setParamPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0
  })
  
  // const searchTableData = (paramPagination_) => {
  //   setIsLoadingTableData(true)
  //   let params = {}
  //   params['per_page'] = paramPagination_['perPage']
  //   params['page'] = paramPagination_['currentPage']
  //   let queryString = Object.keys(params).map(k=>k+'='+params[k]).join('&')
  //   callGetApiWithAuth('earnings?'+queryString, onGetTableData, ()=>setIsLoadingTableData(false))
  // }
  // const onGetTableData = (data) => {
  //   // setParamPagination({ ...paramPagination, total: data.data.total, currentPage: data.data.current_page })
  //   setIsLoadingTableData(false)
  //   setTableData(data.data)
  // }
  // const goPage = (_, page) => {
  //   let paramPagination_ = {...paramPagination, currentPage: page}
  //   setParamPagination(paramPagination_)
  //   searchTableData(paramPagination_)
  // }

  // useEffect(() => {
  //   searchTableData(paramPagination)
  // }, [])



  return (
    <TableCard
      title="Placement Tree"
      paginationParams={paramPagination}
      // onPageChange={goPage}
      toolbar={<div>

        {parentPath.map((item, index) => (<>
          <span style={{fontSize: 12, fontWeight:300}}>{index > 0 ? " > " : ""}</span>
          <a href={`#${item.id}`} key={index} style={{fontSize: 12, fontWeight:300, textDecoration: 'none'}}>
            {item.name}
          </a>
        </>))}
      </div>}
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
            {isLoadingTableData?
              [...Array(10).keys()].map(index => (
                <TableRow key={index}>
                  <TableCell padding="none"><Skeleton /></TableCell>
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
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              ))
            : <>
              {tableData.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.join_date}</TableCell>
                  <TableCell>{row.rank}</TableCell>
                  <TableCell>{row.ibo_kit}</TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.pv}</TableCell>
                  <TableCell>{row.psv}</TableCell>
                  <TableCell>{row.prsv}</TableCell>
                  <TableCell>{row.total_gv}</TableCell>
                  <TableCell>{row.total_customer_gv}</TableCell>
                  <TableCell>{row.gv_55_45}</TableCell>
                  <TableCell>{row.placement_sponsor}</TableCell>
                </TableRow>
              ))}
              {tableData.length==0 && (
                <TableRow>
                  <TableCell colSpan={14}>
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

export default UnilevelTreeTable

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

  btnEmail: {
    marginLeft: theme.spacing(3),
  },
}));
