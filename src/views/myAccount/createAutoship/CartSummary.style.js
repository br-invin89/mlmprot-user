import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  root: {    
    // [theme.breakpoints.only('sm')]: {
    //   position: 'fixed',
    //   width: '45%',
    // },
    // [theme.breakpoints.only('md')]: {
    //   position: 'fixed',
    //   width: '32%',
    // },
    // [theme.breakpoints.only('lg')]: {
    //   position: 'fixed',
    //   width: '36%',
    // },
  },
  cardRoot: {
    padding: '20px 25px 10px',
    '& h4': {
      margin: 0,
    }
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  productImage: {
    '& img': {
      width: 80,    
      height: 80,
      objectFit: 'contain'
    }
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 12,
  },
  itemPriceRoot: {
    margin: 0,
    fontSize: 14,
  },
  descRoot: {
    width: 'calc(100% - 92px)'
  },
  removeBtn: {
    fontSize: 14,
    color: `${theme.palette.secondary.main}`,
    cursor: 'pointer'
  },
  totalPriceRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      margin: '8px 0'
    }
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  tableHead: {
    paddingLeft: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  tableCell: {
    paddingRight: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  actionCell: {
    paddingRight: 0,    
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    width: 100,
    marginTop: 10
  },

  controlBtn: {
    background: "#F5F5F5",
    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.19971)",
    borderRadius: '50%',
    width: 20,
    height: 20,
  },
  controlField: {
    width: 30,
    textAlign: 'center',
  },
  controlInput: {
    border: 0,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center',
  },
  inputRoot: {
    paddingLeft: 14,
    paddingRight: 14,
  },
}))
