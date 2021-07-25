import React, { useMemo } from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import UserAvatar from "./UserAvatar";
import PostContentCollapse from "./PostContentCollapse";
import MoreMenu from "../forms/MoreMenu";

export default ({ data }) => {
  const displayShowMore = useMemo(() => data?.body?.length > 200, [data]);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Box className={classes.moreMenuBox}>
        <MoreMenu />
      </Box>
      <div className={classes.avatarRoot}>
        <UserAvatar data={data.author} width={40} height={40} />
      </div>
      <div>
        <div className={classes.postRoot}>
          <div className={classes.meta}>
            <div className={classes.metaData}>
              <Typography component='h2' className={classes.authorName}>
                {data.author.name}
              </Typography>
              <div className={classes.likeContent}>
                <Typography
                  component='p'
                  color='textSecondary'
                  className={classes.likesText}
                >
                  <ThumbUpAltIcon
                    color='textSecondary'
                    style={{ fontSize: 14 }}
                  />
                  <Typography component='span' className={classes.likesCount}>
                    {data.likes}
                  </Typography>
                </Typography>
              </div>
            </div>

            <Typography component='span' className={classes.postDate}>
              {data.date}
            </Typography>
          </div>
          <div className={classes.postBody}>
            {displayShowMore ? (
              <PostContentCollapse
                content={data.body}
                minCollapseHeight={80}
                subStringLimit={200}
              />
            ) : (
              <Typography component='p' className={classes.postContent}>
                {data.body}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  moreMenuBox: {
    position: "absolute",
    right: "5px",
    top: "13px",
  },
  postRoot: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 14,
    paddingLeft: 16,
    paddingRight: 14,
    paddingBottom: 8,
    backgroundColor: theme.palette.primary.inverted,
    borderRadius: 5,
    marginLeft: 15,
    flexGrow: 1,
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
  },
  authorName: {
    paddingTop: "2px",
    fontSize: 12,
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  postDate: {
    fontSize: 12,
    color: theme.palette.text.secondaryInverted,
    textTransform: "uppercase",
    paddingTop: "3px",
    marginRight: "15px",
  },
  postContent: {
    fontSize: 14,
    color: theme.palette.text.primary,
    marginTop: 7,
  },
  likeContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    marginLeft: 16,
  },
  likesText: {
    fontSize: "14px",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondaryInverted,
  },
  likesCount: {
    fontSize: "14px",
    marginLeft: "8px",
  },
  metaData: {
    display: "flex",
  },
}));
