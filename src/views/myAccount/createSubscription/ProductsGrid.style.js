import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  root: {

  },
  productImage: {
    width: '100%',
    height: '172px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 'auto',
      height: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
    }
  },
  productActions: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'flex-end',
    marginBottom: 12,    
  },
  qtyInput: {
    width: '60px',
    marginRight: 12,
    '& input': {
      textAlign: 'center',
    }
  },
  addBtn: {
    fontSize: '0.75rem',
  },
  priceRoot: {
    marginBottom: 0,
  },
  loadingRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  desctiption: {
    textDecoration: 'underline',
    color: theme.palette.primary.main
  },
  productBottomRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  qtyLimitText: {
    color: theme.palette.text.disabled,
    fontSize: "11px",
  }
}))
