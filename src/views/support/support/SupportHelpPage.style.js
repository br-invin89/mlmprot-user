import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {},
  contentRoot: {
    background: "white",
    padding: "18px 24px",
    marginTop: 12,
  },
  helpContainer: {
    background: "white",
  },
  helpTitle: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "27px",
  },
  helpLabel: {
    textAlign: "center",
    fontSize: "14px",
    color: `${theme.palette.text.secondary}`,
  },
  divider: {
    margin: "50px 0px 40px",
  },
  supportContainer: {},
  suppotTitle: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "20px",
    marginBottom: 10,
  },
  memberTitle: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "15px",
  },
  mailTag: {
    display: 'block',
    marginTop: 20,
    textAlign: "center",
    color: "#5d487a",
  },
  memberLabel: {
    fontSize: "12px",
    color: `${theme.palette.text.secondary}`,
    marginBottom: 20,
  },
  iconsContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  icon: {
    fontSize: "14px",
    color: theme.palette.primary.main,
    marginRight: 7,
    paddingTop: 2,
  },
  iconText: {
    fontSize: "12px",
    color: `${theme.palette.text.secondary}`,
    "& .MuiLink-underlineHover:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  iconLinkText: {
    fontSize: "12px",
    color: `${theme.palette.text.secondary}`,
  },
  genralTitle: {
    fontWeight: 500,
    fontSize: "15px",
    marginBottom: 20,
  },
}));
