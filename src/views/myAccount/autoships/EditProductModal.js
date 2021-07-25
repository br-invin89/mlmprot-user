import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Modal,
  Grid,
  Typography,
  Fade,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TableContainer, Table, TableBody,
  TableRow, TableCell, TableHead,
  Snackbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Alert } from '@material-ui/lab'
import TableCard from 'components/cards/TableCard'
import Popconfirm from 'components/confirm/Popconfirm'
import SelectField from 'components/inputs/SelectField'
import TextField from 'components/inputs/TextField'
import TickImage from 'assets/images/tickIcon.png';
import DeleteIcon from 'assets/icons/deleteIcon.svg';
import EditIcon from 'assets/icons/editIcon.svg';
import { callPutApiWithAuth, callGetApiWithAuth } from 'utils/api'
import { asPrice } from "utils/text";
import NoData from "components/NoData";

export default function EditProductModal({ data, closeEdition, afterSuccessUpdate }) {
  const classes = useStyles()
  const myUser = useSelector(state => state.auth.user)
  const [products, setProducts] = useState([])
  const [details, setDetails] = useState([])
  const [dayOfMonth, setDayOfMonth] = useState(undefined)
  const [isUpdating, setIsUpdating] = useState(false)
  const [confirmingAction, setConfirmingAction] = useState(undefined)
  const [updatingAnchor, setUpdatingAnchor] = useState(null)
  const [error, setError] = useState({
    open: false,
    message: ''
  })
  useEffect(() => {
    if (!data) return
    setDetails(data.details)
    setDayOfMonth(data.day_of_month)
  }, [data])

  const onGetProducts = (data) => {
    setProducts(data.data.data)
  }
  const onFailProducts = (errMessage) => {
  }

  const update = () => {
    let validate = true
    if (details.length==0) {
      validate = false
    }
    details && details.map((el) => {
      if (el.isNew) {
        validate = false
      }
    })
    if (validate) {
      setIsUpdating(true)
      let payload = details.map((el) => {
        return {
          product_id: el.product.id,
          quantity: el.quantity
        }
      })
      callPutApiWithAuth(
        `autoships/${data.id}`,
        {
          autoshipDetails: payload,
        },
        onSuccessUpdate
      )
    } else {
      setError({
        open: true,
        message: 'Please add or remove the row new row first'
      })
    }
  }
  const onSuccessUpdate = () => {
    setIsUpdating(false)
    closeEdition()
    afterSuccessUpdate('Autoship updated.')
  }

  const removeRow = (index) => {
    setDetails([
      ...details.filter((d, i) => {
        if (i !== index) {
          return d
        }
      })
    ])
  }

  const onChangeQuantity = (index, value) => {
    if (value > 0) {
      setDetails([
        ...details.filter((d, i) => {
          if (i === index) {
            d['quantity'] = value
            return d
          }
          return d
        })
      ])
    }
  }

  const onSelectProduct = (index, value) => {
    let productExists = false
    details && details.map((el) => {
      if (el.product && (el.product.id === value)) {
        productExists = true
      }
    })
    if (productExists) {
      setError({
        open: true,
        message: 'Product Already Exists'
      })
    } else {
      setDetails([
        ...details.filter((d, i) => {
          if (i === index) {
            let product = products.filter((el) => el.id === value)
            d['product'] = product[0]
            return d
          }
          return d
        })
      ])
    }
  }

  const onAllowEditQuantity = (index) => {
    setDetails([
      ...details.filter((d, i) => {
        if (i === index) {
          d['isEditing'] = true
          return d
        }
        return d
      })
    ])
  }

  const addData = (index) => {
    let product = details[index]
    if (!product.product) {
      setError({
        open: true,
        message: 'Select Product'
      })
    } else if (!product.quantity) {
      setError({
        open: true,
        message: 'Enter Quantity'
      })
    } else if (product.quantity <= 0) {
      setError({
        open: true,
        message: 'Quantity should be greater than 0'
      })
    } else {
      setDetails([
        ...details.filter((d, i) => {
          if (i === index) {
            delete d['isNew']
            return d
          }
          return d
        })
      ])
    }
  }

  const onUpdateQuantity = (index, value) => {
    if (value > 0) {
      setDetails([
        ...details.filter((d, i) => {
          if (i === index) {
            delete d['isEditing']
            return d
          }
          return d
        })
      ])
    } else {
      setError({
        open: true,
        message: 'Quantity should be greater than 0'
      })
    }
  }

  const onAddRow = () => {
    setDetails([
      ...details.map(d => d),
      {
        quantity: '',
        product: null,
        isNew: true
      }
    ])
  }

  useEffect(() => {
    let params = []
    params['page'] = 1
    params['per_page'] = 20
    let q = Object.keys(params).map(k => k + '=' + params[k]).join('&')
    callGetApiWithAuth(`autoships/products?${q}`, onGetProducts, onFailProducts)
  }, [])
  return (
    data ?
      <Modal open={data} onClose={closeEdition} className={classes.modal}>
        <Fade in={data}>
          <div className={classes.modalRoot}>
            <Typography component={'h2'}>Edit Autoship #{data.id}</Typography>
            <div className={classes.btnAddWrapper}>
              <Button
                variant='contained'
                color='primary'
                className={classes.addBtn}
                onClick={onAddRow}
              >
                Add
              </Button>
            </div>
            <TableCard
              className={classes.tableCard}
            >
              <TableContainer className={classes.tableContainer}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={classes.headCell}
                        align={'left'}
                      >
                        Product
                    </TableCell>
                      <TableCell
                        className={classes.headCell}
                        align={'left'}
                      >
                        Quantity
                  </TableCell>
                      <TableCell
                        className={classes.headCell}
                        align={'left'}
                      >
                        Total Price
                  </TableCell>
                      <TableCell
                        className={classes.headCell}
                        align={'left'}
                      >
                        Action
                  </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details.map((detail, index) => {
                      if (detail.isNew) {
                        return (
                          <TableRow className={classes.td}>
                            <TableCell className={classes.newRow}>

                              <Select
                                value={detail && detail.product && detail.product.id}
                                onChange={(e) => onSelectProduct(index, e.target.value)}
                                className={classes.selectRoot}
                              >
                                {products.map((product, k) => (
                                  <MenuItem value={product['id']} key={k}>
                                    {product['title']}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell className={classes.newRow}>
                              <Input value={detail.quantity} autofocus className={classes.textField} type="number" onChange={(e) => onChangeQuantity(index, e.target.value)} />
                            </TableCell>
                            <TableCell className={classes.newRow}>
                              {' '}
                            </TableCell>
                            <TableCell className={classes.newRow}>
                              <img src={TickImage} onClick={() => addData(index)} className={classes.tickIcon} /><img src={DeleteIcon} className={classes.deleteIcon} onClick={() => removeRow(index)} />
                            </TableCell>
                          </TableRow>
                        )
                      } else {
                        return (
                          <TableRow className={classes.td}>
                            <TableCell>
                              <div className={classes.titleRoot}>
                                <img src={detail.product.image}
                                  className={classes.productImage}
                                />
                                {detail.product.title}
                              </div>
                            </TableCell>
                            <TableCell>
                              {
                                detail.isEditing ?
                                  <input value={detail.quantity} autofocus className={classes.textField} onBlur={() => onUpdateQuantity(index, detail.quantity)} type="number" onChange={(e) => onChangeQuantity(index, e.target.value)} />
                                  :
                                  <span>
                                    {detail.quantity} <img src={EditIcon} className={classes.editIcon} onClick={() => onAllowEditQuantity(index)} />
                                  </span>
                              }
                            </TableCell>
                            <TableCell>
                              {asPrice((myUser.type == 1 ? detail.product.member_price : detail.product.retail_price) * detail.quantity)}
                            </TableCell>
                            <TableCell>
                              <img src={DeleteIcon} className={classes.deleteIcon} onClick={() => removeRow(index)} />
                            </TableCell>
                          </TableRow>
                        )
                      }
                    })}
                    {details.length == 0 && (
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
            <div className={classes.btnWrapper}>
              <Button
                variant='contained'
                color='primary'
                className={classes.btn}
                onClick={(e) => setUpdatingAnchor(e.currentTarget)}
                disabled={isUpdating}
              >
                Save
            </Button>
              <Popconfirm
                anchorEl={updatingAnchor}
                onConfirm={() => {
                  update()
                  setUpdatingAnchor(null)
                }}
                onCancel={() => setUpdatingAnchor(null)}
              />
              {isUpdating && (
                <CircularProgress
                  color={'primary'}
                  size={24}
                  className={classes.btnProgress}
                />
              )}
            </div>
            {/*
          confirmingAction=='update' && 
          <>
            <Typography component={'p'}
            >
              Are you sure?
            </Typography>
            <div className={classes.btnWrapper}>
              <Button
                variant='contained'
                color='primary'
                className={classes.btn}
                onClick={()=>{update();setConfirmingAction(undefined)}}
              > 
                Yes
              </Button>
            </div>
            <div className={classes.btnWrapper}>
              <Button
                variant='contained'
                color='default'
                className={classes.btn}
                onClick={()=>setConfirmingAction(undefined)}
              > 
                No
              </Button>
            </div>
          </>
          */}
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={error.open}
              autoHideDuration={2000}
              onClose={(e, r) => {
                if (r == 'timeout') setError({
                  open: false,
                  message: ''
                })
              }}
            >
              <Alert
                severity='error'
                variant='filled'
                onClose={() => setError({
                  open: false,
                  message: ''
                })}
              >
                {error.message}
              </Alert>
            </Snackbar>
          </div>
        </Fade>
      </Modal>
      : ''
  )
}

const useStyles = makeStyles((theme) => ({
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  modalRoot: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
    top: `100px`,
    left: `calc(50% - 315px)`,
    transform: `translate(-100px, -50% + 100px)`,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      left: 0
    },
    outline: 'none',
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
  form: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  formControl: {
    width: '100%',
  },
  addBtn: {
    width: 80,
    [theme.breakpoints.down('xs')]: {
      marginRight: 60
    },
  },
  table: {
    [theme.breakpoints.down('xs')]: {
      width: 500
    },
  },
  tableCard: {
    [theme.breakpoints.down('xs')]: {
      marginRight: 60
    },
  },
  btn: {
    width: '100%',
  },
  btnProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  btnWrapper: {
    position: 'relative',
    width: '80px',
    marginTop: '20px',
  },
  btnAddWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '5px 0 20px',
  },
  confirmModal: {
    padding: 10,
  },
  th: {
    padding: '0 2px 0 2px'
  },
  td: {
    padding: '0 2px 0 2px'
  },
  deleteIcon: {
    cursor: 'pointer'
  },
  tickIcon: {
    cursor: 'pointer',
    paddingRight: 5,
  },
  editIcon: {
    cursor: 'pointer',
    paddingLeft: 5,
  },
  textField: {
    width: 70
  },
  selectRoot: {
    width: 150,
    '& label': {
      background: '#fff',
    },
    '& .MuiSelect-select': {
      // paddingTop: 12,
      // paddingBottom: 12,
    }
  },
  newRow: {
    padding: '0px 16px 16px 16px'
  },
  titleRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  productImage: {
    width: '20px',
    height: '30px',
    marginRight: '4px'
  }
}))
