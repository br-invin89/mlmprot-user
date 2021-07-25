import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: '0', top: '20px',
    zIndex: 101,
    width: 'calc(100% - 80px)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0 40px',
  },
  searchRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 210,    
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    marginRight: 8,
  },
  searchBtn: {
    marginTop: 4,
    marginRight: 4,
    width: 90,
    height: 32,
    cursor: 'pointer',
    borderRadius: 4,
    '&: hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      color: `${theme.palette.primary.main}`
    }
  },
  searchBtn2: {
    minWidth: 50,
    height: 32,
    paddingLeft: 4,
    paddingRight: 4,
  },
  searchResults: {
    position: 'absolute',
    left: 0,
    top: 32,
    width: '100%',
    marginTop: 0,
    paddingLeft: 0,
    background: `${theme.palette.background.activePanel}`,
    zIndex: 12,
  },
  descBox: {
    padding: '6px 12px',
    background: '#FFFFFF',
    border: '1px solid #E6EAEE',
    boxSizing: 'content-box',
    borderRadius: 6,
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 16,
    alignItems: 'center',
    height: 42,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 16,
    }
  },
  descTextRoot: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  descTextIcon: {
    width: 13,
    height: 13,
    borderRadius: '50%',
    marginRight: 8,
  },
  userType1Color: {
    backgroundColor: `${theme.palette.primary.main}`
  },
  userType2Color: {
    backgroundColor: `#82a5c4`
  }
}))
