import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { 
  Grid, Divider, Typography,
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'
import NoData from "components/NoData";

import VideosSlider from "./VideosSlider";
import PlayVideoModal from "./PlayVideoModal";
import PlacholderVideosSlider from "./PlacholderVideosSlider";

const VideosSection = ({ videosGrouped }) => {
  const classes = useStyle();
  const [playingVideo, setPlayingVideo] = useState(undefined);
  const playVideo = (video) => {
    setPlayingVideo(video);
  };

  return (
    <div className={classes.videosWrapper}>
      {videosGrouped &&
        Object.keys(videosGrouped).map((k) => (
          <Grid container spacing={3} key={k} className={classes.videos}>
            <Grid item xs={12} className={classes.videoSection}>
              <Grid item xs={12} className={classes.categoryContainer}>
                <Typography component="h2" className={classes.categoryName}>
                  {k}
                </Typography>
                <Divider className={classes.divider} />
              </Grid>
              <VideosSlider videos={videosGrouped[k]} playVideo={playVideo} />
            </Grid>
          </Grid>
        ))}
      {videosGrouped &&
        Array.isArray(videosGrouped) &&
        videosGrouped.length == 0 && <NoData />}
      {!videosGrouped &&
        [...Array(3).keys()].map((k) => (
          <Grid container spacing={3} key={k} className={classes.videos}>
            <Grid item xs={12}>
              <Typography component="h2" className={classes.categoryName}>
                <Skeleton width={200} />
              </Typography>
              <Divider className={classes.divider} />
              <PlacholderVideosSlider />
            </Grid>
          </Grid>
        ))}
      <PlayVideoModal
        playingVideo={playingVideo}
        handleClose={() => setPlayingVideo(undefined)}
      />
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  videosWrapper: {
    // marginTop: 12,
  },
  videos: {
    // marginTop: 12,
  },
  videoSection: {
    paddingTop: '0px !important',
    paddingLeft: '0px !important',
  },
  divider: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryName: {
    padding: '3px 20px 0px 10px',
    fontSize: 14,
    fontWeight: 500,
    background: 'white',
    display: 'inline-block',
    position: 'relative',
    top: 22    
  },
  categoryContainer: {
    marginBottom: 30
  }
}));

export default VideosSection;
