import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import PostContentCollapse from "./PostContentCollapse";
import VideoPlayer from "../../../components/videoPlayer";

export default ({ data }) => {
  const displayShowMore = useMemo(() => data?.post?.content?.length > 220, [
    data,
  ]);
  const classes = useStyle();
  return (
    <div className={classes.postBody}>
      <Typography component='h2' className={classes.postTitle}>
        {data.post.title}
      </Typography>
      {!displayShowMore ? (
        <Typography component='p' className={classes.postContent}>
          {data.post.content}
        </Typography>
      ) : (
        <PostContentCollapse
          content={data.post.content}
          minCollapseHeight={80}
          subStringLimit={220}
        />
      )}
      {data.post.image && (
        <figure>
          <img src={data.post.image} alt='post image' />
        </figure>
      )}
      <div>{data.post.video && <VideoPlayer />}</div>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  postTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  postContent: {
    fontSize: 14,
    fontWeight: "normal",
    color: theme.palette.text.primary,
    marginTop: 10,
    marginBottom: 13,
  },
}));
