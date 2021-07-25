import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  content: {
    padding: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderBottom: `1px solid ${theme.palette.border.panel}`
  },
  btn: {
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: 500,
  },
  resourceTitle: {
    textAlign: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  websiteLink: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: theme.spacing(3),
    width: '100%'
  },
  divider: {
    position: "relative",
    marginBottom: theme.spacing(2),
    border: "none",
    height: 1,
    margin: 0,
    flexShrink: 0,
    backgroundColor: "#F1F1F1",
    display: "flex",
    justifyContent: "center",
  },
  shareText: {
    position: "absolute",
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#8892AC",
    padding: "5px 10px",
    top: -15,
  },
  socialMedia: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 18,
  },
  socialIcon: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    cursor: 'pointer',
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));
