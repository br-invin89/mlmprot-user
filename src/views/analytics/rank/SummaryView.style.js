import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {},
  cardRoot: {
    marginBottom: 12,
  },
  lineRoot: {
    textAlign: "center",
    marginBottom: 12,
    color: theme.palette.text.primary,
    "& label": {
      fontWeight: 500,
      color: "red",
      marginRight: 8,
    },
    "& p": {
      marginBottom: 0,
      marginTop: 0,
    },
  },
  descImageRoot: {
    width: "100%",
    marginTop: 24,
  },
  descImage: {
    width: "100%",
  },
  zoomTools: {
    textAlign: "center",
    padding: 10,
  },
  iconStyle: {
    fontSize: 40,
  },
  transformWrapper: {
    width: "100%",
    "& .react-transform-component": {
      width: "100%",
    },
  },
  loadingWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
