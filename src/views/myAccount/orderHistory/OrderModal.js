import React, { useEffect, useState } from 'react'
import {
  Modal, Fade, Grid,
  Typography, Table,
  TableContainer, TableHead, TableBody,
  TableRow, TableCell, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'
import { callGetApiWithAuth } from 'utils/api'
import { asPrice, asNumber } from 'utils/text'
import CloseIcon from "@material-ui/icons/Close";
import { orderStatusText } from 'config/var'
const plan = process.env.REACT_APP_COMPENSATION_PLAN

export default function OrderModal ({ selectedOrderId, closeDetail }) {
  const classes = useStyles()
  const [orderData, setOrderData] = useState(undefined)
  const [orderDetailData, setOrderDetailData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedOrderId) {
      setIsLoading(true)
      callGetApiWithAuth(`orders/${selectedOrderId}`, onGetData, onFailData)
    } else {
      setOrderData(undefined)
      setOrderDetailData(undefined)
      setIsLoading(false)
    }
  }, [selectedOrderId])
  const onGetData = (data) => {
    setIsLoading(false)
    setOrderData(data.data)
    setOrderDetailData(data.data['details'])
  }
  const onFailData = () => {
    setIsLoading(false)
  }

  return (
    <Modal open={selectedOrderId} onClose={closeDetail} className={classes.modal}>
      {selectedOrderId &&
        <Fade in={selectedOrderId}>
          <div className={classes.modalRoot}>
            <Typography className={classes.title} component={'h4'}>
              {orderData ? 'Order #' + orderData.order_number : ''}
              {isLoading ?
                <Skeleton width={80} />
                : orderData ?
                  <span className={clsx(classes.statusText, )} component={'p'} status={orderStatusText(orderData.status)}>
                    {orderStatusText(orderData.status)}
                  </span>
                  : '-'
              }
              <IconButton
                component="span"
                className={classes.close}
                onClick={closeDetail}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <div className={classes.subtitleLine}>
              <Typography className={classes.trackingNumber} component={'p'}>
                Tracking Number:&nbsp;
              {isLoading ?
                  <Skeleton width={80} />
                  : orderData && orderData.tracking_number ?
                    <Typography component={'a'} href={orderData.tracking_url}>
                      {orderData.tracking_number}
                    </Typography>
                    : '-'
                }
              </Typography>
            </div>
            <div className={classes.tableCard}>
              <Typography className={classes.tableTitle} component={'p'}>
                Products
              </Typography>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>PC</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total PV</TableCell>
                      <TableCell>Total CV</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetailData ?
                      orderDetailData.map((record, index) => (
                        <TableRow>
                          <TableCell className={classes.cell}>{index + 1}</TableCell>
                          <TableCell className={classes.cell}>{record['product']['title']}</TableCell>
                          <TableCell className={classes.cell}>{asPrice(record['total_amount'])}</TableCell>
                          <TableCell className={classes.cell}>{asNumber(record['pc_amount'])}</TableCell>
                          <TableCell className={classes.cell}>{asNumber(record['quantity'])}</TableCell>
                          <TableCell className={classes.cell}>{asNumber(record['total_pv'])}</TableCell>
                          <TableCell className={classes.cell}>{asNumber(record['total_cv'])}</TableCell>
                        </TableRow>
                      ))
                      : [...Array(3).keys()].map(index => (
                        <TableRow>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                          <TableCell className={classes.cell}><Skeleton /></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>  
            <Grid container spacing={2} style={{ marginTop: 12 }}>
              <Grid item>
                <Typography>Total: {orderData && orderData.order_total_amount ? asPrice(orderData.order_total_amount) : '-'}</Typography>&nbsp;
              </Grid>
              <Grid item>
                <Typography>PV: {orderData && orderData.order_total_pv ? asNumber(orderData.order_total_pv) : '-'}</Typography>&nbsp;
              </Grid>
              <Grid item>
                <Typography>CV: {orderData && orderData.order_total_cv ? asNumber(orderData.order_total_cv) : '-'}</Typography>&nbsp;
              </Grid>
              <Grid item>
                <Typography>Shipping Price: {orderData && orderData.shipping_price ? asPrice(orderData.shipping_price) : '-'}</Typography>&nbsp;
              </Grid>
              <Grid item>
                <Typography>PC: {orderData && orderData.pc_amount 
                ? orderData.pc_amount : '-'}</Typography>&nbsp;
              </Grid><Grid item>
                <Typography>TC: {orderData && orderData.tc_amount ? orderData.tc_amount : '-'}</Typography>&nbsp;
              </Grid>
              {(orderData && orderData.refunded_amount>0) && 
              <Grid item>
                <Typography>
                  Refunded Amount:&nbsp;{asPrice(orderData.refunded_amount)}
                </Typography>
              </Grid>
              }
            </Grid>
          </div>
        </Fade>
      }
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
  modalRoot: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 2, 2),
    top: `100px`,
    left: `calc(50% - 315px)`,
    transform: `translate(-100px, -50% + 100px)`,
    [theme.breakpoints.down('xs')]: {
      width: '85%',
      left: 0
    },
    marginLeft: 2,
    "&:focus": {
      outline: 'none',
    }
  },
  title: {
    fontSize: 16,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      // marginRight: 40
    },
  },
  subtitleLine: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
  },

  tableCard: {
    [theme.breakpoints.down('xs')]: {
      // marginRight: 40
    },
  },
  trackingNumber: {
    fontSize: 14,
  },
  statusText: {
    padding: '2px 8px',
    textTransform: 'capitalize',
    fontSize: '0.9em',
    borderRadius: 3,
    color: 'white',
    right: '68px',
    padding: '4px',
    marginLeft: '5px',
    '&[status="pending"]': {
      backgroundColor: '#F9AC38',
    },
    '&[status="confirmed"]': {
      backgroundColor: '#5856D6',
    },
    '&[status="shipped"]': {
      backgroundColor: '#1890FF',
    },
    '&[status="failed"]': {
      backgroundColor: '#F56B6E',
    },
    '&[status="refunded"]': {
      backgroundColor: '#F56B6E',
    },
    '&[status="partial refunded"]': {
      backgroundColor: '#7F8FA4',
    },
    '&[status="resent"]': {
      backgroundColor: '#1890FF',
    },
    '&[status="canceled"]': {
      backgroundColor: '#F56B6E',
    },
  },
  tableTitle: {
    fontSize: 14,
    marginTop: 12,
  },
  table: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: 700
    },
  },
  cell: {
    padding: '4px 16px'
  },
  close: {
    position: 'absolute',
    right: -8,
    top: -8,
    padding: 4,
  },
}))
