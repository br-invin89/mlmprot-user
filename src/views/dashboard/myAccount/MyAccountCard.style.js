import { makeStyles } from "@material-ui/styles";
import accountBg from "assets/images/account-bg.jpg";

export default makeStyles((theme) => ({
  root: {
    background: `linear-gradient(180deg, rgba(93, 72, 122, 0.850524) -40.5%, #5d487a 133.01%), url(${accountBg})`,
    boxShadow: "0px 2px 10px rgba(203, 209, 223, 0.500874)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: '100%',
  },
  accountLinks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    paddingTop: 9,
  },
  accountLink: {
    fontSize: 14,
    color: theme.palette.text.primaryInverted,
    "&:hover": {
      color: theme.palette.text.primaryInverted,
    },
  },
  userAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
    "& img": {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      border: `1px solid #fff`,
      objectFit: 'cover',
    },
  },
  name: {
    color: theme.palette.text.primaryInverted,
    marginTop: 10,
    fontSize: 16,
  },
  id: {
    color: theme.palette.text.primaryInverted,
    marginTop: 2,
  },
  divider: {
    marginTop: 5,
    marginBottom: 4,
  },
  listItem: {
    padding: theme.spacing(0, 2),
    color: theme.palette.text.primaryInverted,
    fontWeight: "normal",
  },
  pvListItem: {
  },
  listText: {
    color: theme.palette.text.primaryInverted,
    fontWeight: "normal",
  },
  websiteLink: {
    color: "#fff",
    textTransform: "capitalize",
    background:"#73afc9",
    padding:"0px",
  },
  status: {
    textTransform: 'capitalize'
  },
  website: {
    '& span': {
      width: '65%'
    }
  },
  pcLink: {
    color: theme.palette.text.primaryInverted,
    fontWeight: "normal",
    fontSize: '10px',
    marginRight: '4px'
  }
}));
