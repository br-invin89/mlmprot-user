import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(180deg, rgba(0, 122, 255, 0.850524) -40.5%, #5AC8FA 133.01%), url(Image.png)",
    boxShadow: "0px 2px 10px rgba(203, 209, 223, 0.500874)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
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
      border: `1px solid #fff`
    }    
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
    margin: '12px 0'
  },
  pvListItem: {
    marginTop: '24px'
  },
  listText: {
    color: theme.palette.text.primaryInverted,
    fontWeight: "normal",
  },
  websiteLink: {
    color: "#054BFF",
    textTransform: "capitalize",
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
}));
