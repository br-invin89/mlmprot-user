import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  treeRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  binaryText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    color: "#31394D",
    display: 'flex',
    alignItems: 'center',
  },
  circleRoot: {
    position: "relative",
    width: 180,
    height: 180,
    top: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  binaryData: {
    display: "flex",
    justifyContent: "center",
    height: 240,
  },
  treeNode: {
    width: 92,
    height: 92,
    borderRadius: "100%",
    position: "absolute",
    background: "#FFFFFF",
    border: `2px solid #5d487a`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  you: {
    top: -45,
    left: 40,
  },
  leftLeg: {
    top: 80,
    left: -65,
  },
  rightLeg: {
    top: 80,
    right: -65,
  },
  score: {
    color: "#5d487a",
    fontSize: 16,
    fontWeight: 600,
  },
  title: {
    textAlign: 'center',
  },
  congratulationText: {
    textAlign: "center",
  },
  messageTitle: {
    color: "#1C67FF",
  },
  check: {
    position: "absolute",
    color: theme.palette.success.dark,
    width: 36,
    height: 36,
  },
  infoIcon: {
    color: theme.palette.primary.main,
    width: 18,
    height: 18,
    cursor: 'pointer'
  },
  infoAlert: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    width: 200,
    padding: 20,
  },
  loadingRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
