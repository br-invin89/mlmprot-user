import React from "react";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { asDateTime } from 'utils/text/text'

const MessageSection = (props) => {
  const classes = useStyles();
  const myUser = useSelector((state) => state.auth.user);

  return (
    <div className={classes.root}>
      <Divider />
      <div className={classes.headRoot}>
        <img
          src={props.messageData?.sender_info?.image}
          className={classes.userAvatar}
        />
        <div className={classes.headTitle}>
          <p className={classes.userName}>
            {`${props.messageData?.sender_info?.first_name} ${props.messageData?.sender_info?.last_name}`}
          </p>
          <p className={classes.createdDate}>
            {asDateTime(props.messageData.created_at)}
          </p>
        </div>
      </div>
      <div className={classes.messageBody}>{props.messageData.message}</div>
      {/* {props.messageData.attachments.length>0?
      <>
        <h4>Attachments</h4>
        <div className={classes.attachBody}>
          {props.messageData.attachments.map(fileUrl => 
            <img src={fileUrl} className={classes.attachFile} />
          )}          
        </div>
      </>
      : ''} */}
    </div>
  );
};

export default MessageSection;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  headRoot: {
    marginTop: 25,
    display: "flex",
    "& p": {
      marginTop: 0,
      marginBottom: 0,
      fontSize: 12,
    },
  },
  userAvatar: {
    width: 37,
    height: 37,
    borderRadius: "50%",
    marginRight: 10,
  },
  createdDate: {
    color: `${theme.palette.text.secondary}`,
  },
  messageBody: {
    marginTop: 10,
    color: `${theme.palette.text.secondary}`,
  },
  attachBody: {
    display: "flex",
    marginTop: 6,
    marginBottom: 6,
  },
  attachTitle: {
    marginTop: 12,
  },
  attachFile: {
    width: 96,
    height: 54,
    marginRight: 12,
    borderRadius: 4,
    border: `1px solid ${theme.palette.border.panel}`,
  },
}));
