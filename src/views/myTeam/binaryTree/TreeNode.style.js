import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  container: {
    width: 136,
    height: 222,
    background: theme.palette.background.panel,
    border: `1px solid ${theme.palette.border.panel}`,
    boxSizing: 'border-box',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 12,
    margin: '0 50px'
  },
  emptyContainer: {
    width: 136,
    height: 222,
    background: 'transparent',
    border: '1px dashed rgba(53, 64, 82, 0.25)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    zIndex: 12,
    margin: '0 50px',
    overflow: 'hidden',
  },
  coloredTopBorder: {
    position: 'absolute',
    width: '100%',
    height: 5,
    left: 0,
    top: 0,
    borderRadius: '5px 5px 0 0',
    backgroundColor: theme.palette.primary.main,
  },
  coloredTopBorderForCustomer: {
    backgroundColor: '#82a5c4',
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  showMoreButton: {
    width: 20,
    height: 14,
    position: 'absolute',
    bottom: '-30px',
    left: 'calc(50% - 10px)',
    cursor: 'pointer',
    filter: 'invert(44%) sepia(57%) saturate(2818%) hue-rotate(165deg) brightness(93%) contrast(96%)',
  },
  searchBackButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '-30px',
    left: 'calc(50% - 10px)',
    cursor: 'pointer',
  },
  photoWrapper: {
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  photo: {
    width: 60,
    height: 60,
    display: 'block',
    objectFit: 'cover',
  },
  username: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 12,
  },
  userid: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: '0.8rem'
  },
  userstatus: {
    fontSize: 12,
  },
  userRank: {
    fontSize: 10,
  },
  activeStatus: {
    color: theme.palette.primary.main,
    fontSize: 10,
  },
  inactiveStatus: {
    color: theme.palette.secondary.main,
    fontSize: 10,
  }
}))
