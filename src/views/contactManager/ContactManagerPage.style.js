import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  earningRoot: {
    marginBottom: theme.spacing(3),
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
  avatarRoot: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 13,
  },
  actionGroup: {
    display: 'flex'
  },
  btn: {
    textTransform: "capitalize",
    minWidth: 92,
  },
  actionBtn: {
    width: 60,
  },
  btnMargin: {
    marginRight: 12,
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  btnEmail: {
    marginLeft: theme.spacing(3),
  },
  statusBadge: {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    textTransform: 'capitalize',
    borderRadius: 5,
    paddingLeft: '8px',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '10px',
      height: '10px',
      left: '0',
      borderRadius: '50px',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  statusActiveBadge: {
    backgroundColor: 'transparent',
    color: theme.palette.success.light,
    textTransform: 'capitalize',
    borderRadius: 5,
    paddingLeft: '8px',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '10px',
      height: '10px',
      left: '0',
      borderRadius: '50px',
      backgroundColor: theme.palette.success.light,
    },
  },
  emailLink: {
    fontSize: 14,
    color: theme.palette.primary.main
  }
}));
