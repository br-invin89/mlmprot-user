import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  cardContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: "45px !important",
  },
  textContainer: {
    display: "flex",
    paddingTop: theme.spacing(2.5),
    paddingBottom: 0.4,
  },
  textCurrentRank: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 500,
  },
  textVolume: {
    flexGrow: 1,
    color: theme.palette.text.disabled,
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
    display: "flex",
    justifyContent: "center"
  },
  textNextRank: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 500,
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-end"
  },
  statRoot: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    }
  },
  circleContainer: {
    position: "relative",
    maxWidth: 100,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    width: "100%",
    top: "35px",
    color: theme.palette.success.main,
    fontSize: "18px",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center"
  },
  scoreSecondary: {
    position: "absolute",
    width: "100%",
    top: "35px",
    color: theme.palette.secondary.main,
    fontSize: "18px",
    fontWeight: 500,
  },
  text1: {
    position: "absolute",
    width: "100%",
    top: "65px",
    fontSize: "12px",
    fontWeight: 500,
    width: "70%",
  },
  text2: {
    position: "absolute",
    width: "100%",
    top: "85px",
    fontSize: "14px",
    fontWeight: 500,
  },
  circle: {
    [theme.breakpoints.down("sm")]: {
      // width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
      marginLeft: 5,
      marginRight: 5,
    },
  },
  circleCenter: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 20,
    },
  },
  circleRight: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
}));
