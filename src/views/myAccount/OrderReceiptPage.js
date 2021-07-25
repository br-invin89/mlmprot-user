import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  TableContainer, Table, TableHead,
  TableBody, TableRow, TableCell, Divider
} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import moment from 'moment'
import { callGetApiWithAuth } from 'utils/api'
import { asPrice } from "utils/text";
import { countryName } from 'config/var/country'

export default function OrderReceiptPage(props) {
  const { orderId } = useParams()
  const classes = useStyles();
  const [orderData, setOrderData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    callGetApiWithAuth(`orders/${orderId}`, onGetOrderDetail, onFailOrderDetail)
  }, [])

  const onGetOrderDetail = (data) => {
    setIsLoading(false)
    setOrderData(data.data)
  }
  const onFailOrderDetail = () => {
    setIsLoading(false)
  }

  return (
    <div className={classes.root}>
    {orderData?
      <div className={classes.contentRoot}>
        <h2>Aluva</h2>
        <h6>RECEIPT</h6>
        <div>
          <h4>Order Info</h4>
          <table>
            <tr>
              <td>Order Number:</td>
              <td>{orderData.order_number}</td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td>{moment(orderData.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
            <tr>
              <td>PV:</td>
              <td>{orderData.order_total_pv}</td>
            </tr>
            <tr>
              <td>CV:</td>
              <td>{orderData.order_total_cv}</td>
            </tr>            
          </table>
          <Divider className={classes.divider}/>
          <h4>User Info</h4>
          <table>
            <tr>
              <td>User ID:</td>
              <td>{orderData.user.uuid}</td>          
            </tr>
            <tr>
              <td>First Name:</td>
              <td>{orderData.user.first_name}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{orderData.user.last_name}</td>
            </tr>
            <tr>
              <td>E-Mail:</td>
              <td>{orderData.user.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{orderData.user.phone}</td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>{orderData.user.username}</td>
            </tr>
          </table>
          <Divider className={classes.divider}/>          
          <h4>Order Detail</h4>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Count</th>
                <th style={{paddingLeft: 15}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderData.details.map(orderDetail => 
                <tr>
                  <td>{orderDetail.product.title}</td>
                  <td>{orderDetail.quantity}&nbsp;@&nbsp;{asPrice(orderData.user_type ===1 ? orderDetail.product.member_price : orderDetail.product.retail_price)}</td>
                  <td style={{paddingLeft: 15}}>{asPrice(orderDetail.quantity * (orderData.user_type ===1 ? orderDetail.product.member_price : orderDetail.product.retail_price))}</td>
                </tr>
              )}
              <tr>
                <td>Shipping and Handling</td>
                <td></td>
                <td style={{paddingLeft: 15}}>{asPrice(orderData.shipping_price)}</td>
              </tr>
              <tr>
                <td>Sales Tax</td>
                <td></td>
                <td style={{paddingLeft: 15}}>{asPrice(orderData.tax_amount)}</td>
              </tr>
              {
                Number(orderData.order_total_discount) > 0 &&
                <tr>
                  <td>Discount Amount</td>
                  <td></td>
                  <td>-{asPrice(orderData.order_total_discount)}</td>
                </tr>
              } 
              <tr>
                <td><strong>Totals:</strong></td>
                <td></td>
                <td  style={{paddingLeft: 15}}>{asPrice(orderData.order_total_amount)}</td>
              </tr>
            </tbody>
          </table>
          <Divider className={classes.divider}/>
          <h4>Shipping Info</h4>
          <table>
            <tr>
              <td>Address Line 1:</td>
              <td>{orderData.shipping_address}</td>
            </tr>
            <tr>
              <td>Address Line 2(optional):</td>
              <td>{orderData.shipping_address_line2}</td>
            </tr>
            <tr>
              <td>City:</td>
              <td>{orderData.shipping_city}</td>
            </tr>
            <tr>
              <td>State/Province:</td>
              <td>{orderData.shipping_state}</td>
            </tr>
            <tr>
              <td>ZIP/Postal Code:</td>
              <td>{orderData.shipping_zipcode}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{countryName(orderData.shipping_country)}</td>
            </tr>
          </table>
        </div>  
      </div>
      : ''}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%', 
    background: '#fff'
  },
  divider: {
    background: 'lightgray',
    marginTop: 10
  },
  contentRoot: {
    width: '100%',
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .table': {
      width: '100%',
      backgroundColor: 'rgb(245, 246, 249)',
    },
    '& th': {
      fontSize: 15,
      padding: '2px 8px'
    },
    '& td': {
      fontSize: 15,
      padding: '2px 8px',
    },
    '& h2': {
      textAlign: 'center', 
      fontSize: 24,
    },
    '& h6': {
      margin: '12px 0',
      fontSize: 16,
      textAlign: 'center',
    },
    '& h4': {
      color: 'rgb(112, 189, 230)',
      margin: '15px 0 7px',
    }
  }
}))
