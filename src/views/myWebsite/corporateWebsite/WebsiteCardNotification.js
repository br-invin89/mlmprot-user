import React from "react";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
export default function WebsiteCardNotification(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.notiTitle}
      >
        {props.isPlacementIdNull
          ? "You can not enroll new users before your sponsor places your position in his/her placement tree. For questions, please email support@aluva.co."
          : "Aluva makes it easy for Affiliates to drive traffic and get credit for sales. Please write down and save your replicated website exactly as it is written. Sending your traffic into the wrong website could result in incorrect enrollments. For questions, please email support@aluva.co."}
      </Typography>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
    marginBottom: 20,
    background: "#e6f7ff",
    border: "1px solid #91d5ff",
  },
  notiTitle: {
    marginTop: 18,
    marginBottom: 18,
    marginLeft: 18,
  },
}));
