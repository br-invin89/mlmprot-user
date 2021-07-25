import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  list1: {
    paddingTop: 12,
    paddingBottom: 0,
  },
  listHeading: {
    fontWeight: 500,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  noPadding: { paddingLeft: 0 },
  listText: {
    color: theme.palette.text.disabled,
  },
  creditCard: {
    marginTop: theme.spacing(3),
  },
  textSize: {
    fontSize: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: '12px',
    },
  },
  walletIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '100%',
    backgroundColor: '#F9F2FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto',
  },
  refreshIcon: {
    backgroundColor: '#FFEFF6',
  },
  equalizerIcon: {
    backgroundColor: '#E6FFF9',
  },
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
  cardContainer: {
    paddingTop: '6px !important',
    paddingBottom: '6px !important',
  },  
  contactVisibilityRoot: {
    position: 'relative'
  },
  contactVisibleCardContent: {
  },
  contactVisibleBtnGroup: {
    marginTop: 15,
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#223243 !important',
      color: 'white !important'
    },
    [theme.breakpoints.only('lg')]: {
      // fontSize: '11px',
      marginLeft: -4,
    },
  },
  loadingRoot: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  }
}))