import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { Divider, Collapse, Box, Grid } from "@material-ui/core";
import Card from "components/cards/Card";
import UserAvatar from "./UserAvatar";
import PostMeta from "./PostMeta";
import PostContent from "./PostContent";
import LikeBox from "./LikeBox";
import ShareBox from "./ShareBox";
import CommentActions from "./CommentAction";
import Comments from "./Comments";
import CommentForm from "../forms/CommentForm";
import MoreMenu from "../forms/MoreMenu";

export default ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const hasRank = useMemo(() => data?.author?.rank || false, [data]);
  const classes = useStyle({ hasRank });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card contentStyle={classes.contentStyle}>
      <Box className={classes.moreMenuBox}>
        <MoreMenu />
      </Box>
      <Grid container>
        <div className={classes.root}>
          <div className={classes.avatarRoot}>
            <UserAvatar data={data.author} />
          </div>
          <div className={classes.postRoot}>
            <PostMeta data={data} hasRank={hasRank} />
            <Divider className={classes.divider} />
            <PostContent data={data} />

            <div className={classes.likeContainer}>
              <LikeBox data={data} />
              <ShareBox data={data} className={classes.shareStyle} />
            </div>
            <div className={classes.commentSection}>
              <CommentActions
                data={data}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
              />
              <Collapse in={expanded} timeout='auto' unmountOnExit>
                {data.post.comments.map((comment, index) => (
                  <Comments data={comment} key={index} />
                ))}
              </Collapse>
              <Divider className={classes.commentDivider} />
              <CommentForm />
            </div>
          </div>
        </div>
      </Grid>
    </Card>
  );
};

const useStyle = makeStyles((theme) => ({
  contentStyle: {
    paddingLeft: 26,
    paddingTop: theme.spacing(2),
    paddingBottom: "26px !important",
    paddingRight: theme.spacing(3),
    position: "relative",
  },
  moreMenuBox: {
    position: "absolute",
    right: "10px",
    top: "20px",
  },
  root: {
    display: "flex",
    position: "relative",
  },
  avatarRoot: {
    display: "flex",
    width: 62,
  },
  postRoot: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingLeft: 6,
  },
  divider: (props) => ({
    margin: props.hasRank ? "5px 0 16px 0" : "16px 0",
  }),
  commentDivider: {
    marginTop: 11,
    marginBottom: 16,
  },
  likeContainer: {
    display: "flex",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  shareStyle: {
    marginLeft: 16,
  },
}));
