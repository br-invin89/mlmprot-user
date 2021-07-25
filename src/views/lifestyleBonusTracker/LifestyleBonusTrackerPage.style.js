import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  cardTitle: {
    marginRight: 8,
  },
  cardTitleRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  totalMembers: {
    marginRight: 8,
    fontSize: 14,
  },
  dateRange: {
    fontSize: 14,
  },
  bonus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& img': {
      width: 18,
      height: 18,
      marginRight: 4,
    },
    '& p': {
      fontSize: 14
    }
  },
  tableRoot: {
    height: 380
  },
  userTd: {
    display: 'flex',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    marginRight: 8,
  },
  popTitle: {
    padding: '0.2rem 0.5rem'
  },
  popTableRoot: {
    
  },
  bonusTitle: {
    display: 'flex',
    justifyContent: 'flex-end',
  }

}))
