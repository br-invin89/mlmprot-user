import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default ({ data, handleExpandClick, expanded }) => {
  const classes = useStyle();

  return (
    <div className={classes.commentSection}>
      <Typography component="p" className={classes.commentTitle}>
        Comments
        <Typography component="Span" className={classes.commentCount}>
          {data.post.comments.length}
        </Typography>
      </Typography>
      <div className={classes.commentAction}>
        <Typography component="p" className={classes.commentActionTitle}>
          {expanded ? "Hide comments" : "See comments"}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  commentSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  commentCount: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginLeft: 12,
  },
  commentAction: {
    display: "flex",
    alignItems: "center",
  },
  commentActionTitle: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
