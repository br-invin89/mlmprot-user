import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import nophotoIcon from "assets/icons/nophoto.jpg";

export default function UserCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.userCard}>
      <div className={classes.contentRoot}>
        <div className={clsx(classes.col)}>
          <img
            src={props.data.image || nophotoIcon}
            className={classes.userAvatar}
          />
        </div>
        <div className={clsx(classes.col, classes.userInfo)}>
          <h3 className={classes.userTitle}>
            {!props.prevUser
              ? "My Enroller"
              : props.prevUser.first_name +
                " " +
                props.prevUser.last_name +
                "'s Enroller"}
          </h3>
          <p>
            <label>Username</label>
            <span>{props.data.username}</span>
          </p>
          <p>
            <label>Name</label>
            <span>{props.data.first_name + " " + props.data.last_name}</span>
          </p>
          <p>
            <label>Email</label>
            <span>{props.data.email}</span>
          </p>
          <p>
            <label>Phone</label>
            <span>{props.data.phone}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  userCard: {
    marginBottom: 10,
  },
  contentRoot: {
    display: "flex",
    padding: "12px 4px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  col: {
    padding: "0 8px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  userAvatar: {
    height: "134px",
    width: "134px",
    objectFit: 'cover',
  },
  userInfo: {
    width: "calc(100% - 160px)",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "8px",
      width: "90%",
    },
    "& h3": {
      margin: 0,
    },
    "& p": {
      margin: 0,
      display: "flex",
      justifyContent: "space-between",
      flexGrow: "1",
      width: "100%",
    },
    "& label": {
      color: theme.palette.text.secondary,
    },
  },
}));
