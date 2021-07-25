import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  cardRoot: {
    overflow: 'visible',
    '& table': {
      [theme.breakpoints.down('lg')]: {
        width: 2000
      },
    }
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
  btn: {
    textTransform: "capitalize",
    minWidth: 92,
  },
  userLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  dataCell: {
    '& .MuiTableCell-root': {
      padding: '5.5px 16px',
    }
  }
}));
