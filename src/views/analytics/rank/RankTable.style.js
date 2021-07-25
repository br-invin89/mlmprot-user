import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  earningRoot: {
    marginBottom: theme.spacing(3),
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
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tooltipText: {
    fontSize: 12,
  },
  input: {
    // backgroundColor: "#FAFAFA",
    // border: "1px solid #CED2DA",
    borderRadius: 5,
    width: 164,
  },
  rankName: {
    fontSize: 14,
    textDecoration: 'underline'
  },
  searchDesc: {
    color: `${theme.palette.text.secondary}`,
    fontSize: '0.95em'
  }
}));
