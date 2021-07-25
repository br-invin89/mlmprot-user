import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  list1: {
    paddingTop: 12,
    paddingBottom: 0,
    '& li > div' : {
       maxWidth: '50%',
     }
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
    wordWrap: 'break-word',
    textAlign: 'right',
  },
}))
