import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  totalCard: {
    height: '390px'
  },
  cardContent: {
    paddingLeft: theme.spacing(3),
  },
  statTitle: {
    fontSize: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1.4),
    fontWeight: 500,
  },
  list: { 
    padding: 0, paddingTop: theme.spacing(2),
    "& .MuiListItem-container": {
      display: 'flex',
      alignItems: 'center'
    } 
  },

  lisItem: {
    padding: 0,
    paddingTop: theme.spacing(2.3),
    paddingBottom: theme.spacing(2.8),
  },
  itemText: {
    fontSize: 16,
    fontWeight: "normal",
    textTransform: "capitalize",
  },
  listIcon: {
    display: "flex",
    width: "36px",
    minWidth: "36px",
    height: "36px",
    justifyContent: "center",
    borderRadius: "100%",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  statTotal: {
    backgroundColor: "#97A1B9",
    borderRadius: 13,
    width: 98,
    height: 26,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.primaryInverted,
    fontWeight: 600,
    right: 0,
    position: 'relative',
    top: 'unset',
    transform: 'none',
  },
  ewIxbi:{
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "rgb(229 233 242) 0px 0px 5px",
    borderRadius: "8px",
    width: "100%",
    position: "relative",
    overflow: "visible",
    paddingTop: "24px",
    paddingBottom: "24px",
  },
  jUsJDi:{
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  lcmrOX:{
    display: "flex",
    width: "120px",
    flexFlow: "column wrap",
    alignItems: "center",
  },
  title:{
    marginTop: "15px",
    marginBottom: "8px",
    fontWeight: "500",
  },
  value:{
    width: "100px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(145, 84, 125)",
    borderRadius: "5px",
    color: "rgb(255, 255, 255)",
    fontWeight: "800",
  },
  IconImage:{
    width: "26px",
    height: "26px",
  }
}));
