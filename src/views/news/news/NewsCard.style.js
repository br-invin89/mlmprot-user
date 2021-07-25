import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
    cursor: "pointer",
    height: 262,
  },
  divider: {
    marginTop: 10,
  },
  root: {
    border: "1px solid #E5E9F2",
    boxShadow: "none",
  },
  header: {
    // display: "flex",
    // justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  author: {
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  body: {
    fontWeight: "normal",
    textAlign: "justify",
    overflowY: "hidden",
    overflowWrap: "break-word",
    height: 200,
    "&::-webkit-scrollbar": {
      width: 3,
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
  },
  readMore: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    margin: 0,
    padding: "30px 0",

    /* "transparent" only works here because == rgba(0,0,0,0) */
    backgroundImage: "linear-gradient(to bottom, transparent, white)",
  },

  authorright: {
    display: "flex",
    alignItems: "center",
  },
  authorname: {
    color: "#ADB0C2",
    fontSize: 12,
  },
  fadeout: {
    position: "relative",
    bottom: "2em",
    height: "2em",
    background:
      "linear-gradient(rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 100%)",
  },
}));
