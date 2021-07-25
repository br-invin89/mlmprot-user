import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody,
  Typography, IconButton, Collapse, Box,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Skeleton } from '@material-ui/lab'
import moment from 'moment'
import { asNumber } from 'utils/text'
import TableCard from "components/cards/TableCard";
import NoData from "components/NoData";
import { callGetApiWithAuth } from 'utils/api'
import { userPowerLegText, userTypeText } from 'config/var'

const plan = process.env.REACT_APP_COMPENSATION_PLAN

const headCells = [  
  { label: "Level", align: 'center' },
  { label: "Leg" },
  { label: "Name" },
  { label: "ID", align: 'center' },
  { label: "Type" },
  { label: "Personal Enrollment", align: 'center' },
  { label: "Personal Volume", align: 'center' },
  { label: "Team Volume", align: 'center' },
  { label: '', align: 'center' },
];

const ListViewPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [nodeCount, setNodeCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const shouldSearchAgain = useSelector(state=>state.binaryTree.shouldSearchAgain)
  const searchingUserId = useSelector(state=>state.binaryTree.searchingUserId)  
  const previousSearchingUserIds = useSelector(state=>state.binaryTree.previousSearchingUserIds)

  useEffect(() => {
    loadTableData('')
    dispatch({ type: 'binaryTree.INIT' })
  }, [])
  useEffect(() => {
    if (shouldSearchAgain) {
      loadTableData(searchingUserId)
    }
  }, [shouldSearchAgain])
  const loadTableData = (userId) => {
    setIsLoading(true)
    let params = []
    params['user_id'] = userId
    params['nodes'] = nodeCount
    let q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth('myteam/tree?'+q, onGetTableData, onFailTableData)
  }
  const onGetTableData = (data) => {
    setIsLoading(false)
    let data_ = data.data
    
    let tableData = []
    prepareTableData(data_, 0, tableData)
    setTableData(tableData)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }
  const onFailTableData = () => {
    setIsLoading(false)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }
  const prepareTableData = (data, level, tableData) => {    
    if (data) {
      let { children, ...data_ } = data
      data_['level'] = level+1
      if (!children && data.hasChildren) {
        data_['has_more'] = true
      }
      if (level>0 && !data_.is_empty) {
        tableData.push(data_) 
      }
      if (children) {
        for (let childData of children) {
          prepareTableData(childData, level+1, tableData)
        }
      }
    }
  }
  const searchMore = (user_id) => {
    dispatch({ type: 'binaryTree.SEARCH', payload: { user_id } })
  }
  const searchBack = () => {
    dispatch({ type: 'binaryTree.SEARCH_BACK' })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableCard
          title={
            <Typography component={'p'} className={classes.title}>
              Genealogy
              
            </Typography>
          }
          toolbar={
            previousSearchingUserIds.length>0 && 
              <Typography component={'a'} 
                onClick={searchBack} className={classes.btnBack}
              >
                <ArrowBackIcon />&nbsp;Go Back
              </Typography>            
          }
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell, index) => (
                    <TableCell
                      key={index}
                      align={headCell.align || "left"}
                      className={classes.headCell}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading?
                  [...Array(15).keys()].map(index => (
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
                    </TableRow>
                  ))
                : <>
                  {tableData.map((row, index) => (
                    <Row row={row} key={index} searchMore={searchMore} />
                  ))}
                  {tableData.length==0 && (
                    <TableRow>
                      <TableCell colSpan={9}>
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

const Row = ({ row, searchMore }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow hover className={classes.root}>        
        <TableCell align={'center'}>
          {row.level}
        </TableCell>
        <TableCell>
          {userPowerLegText(row.leg_position)}
        </TableCell>
        <TableCell>{row.first_name+' '+row.last_name}</TableCell>
        <TableCell align={'center'}>
          {row.has_more?
            <Typography component={'a'}
              onClick={() => searchMore(row.id)}
            >
              {row.id}
            </Typography>
          : 
            <Typography component={'span'}>
              {row.id}
            </Typography>
          }
        </TableCell>
        <TableCell>
          {userTypeText(row.type)}
        </TableCell>
        <TableCell align={'center'}>
          {asNumber(row.qualifications.pe)}
        </TableCell>
        <TableCell align={'center'}>
          {asNumber(row.qualifications.pv)}
        </TableCell>
        <TableCell align={'center'}>
          {asNumber(row.qualifications.gv)}
        </TableCell>
        <TableCell align={'center'}>
          <IconButton aria-label="expand row" size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                More Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell>Personal Enrollment Volume</TableCell>
                    <TableCell>{row.qualifications.pev}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Has Qualified Pack?</TableCell>
                    <TableCell>{row.qualifications.qualified_pack==1?'Yes':'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Left Brand Partners</TableCell>
                    <TableCell>{row.qualifications.left_brand_partners}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Right Brand Partners</TableCell>
                    <TableCell>{row.qualifications.right_brand_partners}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CV in Lesser Team</TableCell>
                    <TableCell>{row.qualifications.lessor_volume_cv}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weeks</TableCell>
                    <TableCell>{row.qualifications.lessor_volume_cnt}</TableCell>
                  </TableRow>
                  {/*
                  <TableRow>
                    <TableCell>Join Date</TableCell>
                    <TableCell>{moment(row.joinedDate).format('M/D/YYYY')}</TableCell>
                  </TableRow>
                  */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ListViewPage

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 13,
  },
  btnBack: {
    color: theme.palette.text.primary,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
  },
  btn: {
    textTransform: "capitalize",
    minWidth: 92,
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
