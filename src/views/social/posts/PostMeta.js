import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

export default ({ data: { author = {}, post = {} }, hasRank }) => {
  const classes = useStyle({ hasRank, isUserPostOwner: true });
  return (
    <div>
      <div className={classes.meta}>
        <Typography component='h2' className={classes.authorName}>
          {author.name}
        </Typography>
        {!hasRank && (
          <Typography component='span' className={classes.postDate}>
            {post.date || ""}
          </Typography>
        )}
      </div>

      {hasRank && (
        <div className={classes.meta}>
          <div>
            <Typography component='span' className={classes.authorDetails}>
              Rank: {author.rank || ""}
            </Typography>
            <Typography component='span' className={classes.authorDetails}>
              PV: {author.pv || ""}
            </Typography>
            <Typography component='span' className={classes.authorDetails}>
              GV: {author.gv || ""}
            </Typography>
          </div>
          <Typography component='span' className={classes.postDate}>
            {post.date || ""}
          </Typography>
        </div>
      )}
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  meta: (props) => ({
    display: "flex",
    justifyContent: "space-between",
    paddingTop: props.hasRank ? "4px" : "19px",
    paddingLeft: 10,
  }),
  authorDetails: {
    fontSize: "14px",
    color: theme.palette.text.secondaryInverted,
    marginRight: "15px",
  },
  authorName: {
    fontSize: "16px",
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  postDate: (props) => ({
    fontSize: "14px",
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    marginRight: props.isUserPostOwner && "30px",
  }),
}));
