import React from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import Slider from "react-id-swiper";
import videoThumb from "assets/images/video_thumb.png";

export default () => {
  const classes = useStyle();
  return (
    <div className={classes.sliderWrapper}>
      <Slider width={274}>
        {[...Array(3).keys()].map((video) => (
          <div className={classes.slideWrapper} key={`slide-${video}`}>
            <div className={classes.thumbWrapper}>
              <LazyLoadImage alt="video" effect="blur" src={videoThumb} />
              <IconButton className={classes.playBtnWrapper} 
                component="span" 
              >
                <PlayArrowRoundedIcon
                  style={{ fontSize: 70 }}
                  className={classes.playBtn}
                />
              </IconButton>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  
  sliderWrapper: {
    position: "relative",
    padding: "0 0 0 0",
    borderRadius: 6,
  },
  slideWrapper: {
    margin: 0,    
    width: 259,
    borderRadius: 6,
    // height: 145,
    '& .lazy-load-image-background.blur.lazy-load-image-loaded': {
      borderRadius: 6,
      height: '100%',
    },
    '& .lazy-load-image-background.blur.lazy-load-image-loaded > img': {
      borderRadius: 6,
      width: '100%',
      height: '167px',
      objectFit: 'cover'
    }
  },
  thumbWrapper: {
    position: "relative",
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 6,
    width: "calc(100% - 16px)",
    height: 145,
    backgroundColor: "#333",
    overflow: "hidden",
  },
  playBtn: {
    position: "absolute",
    cursor: "pointer",
    zIndex: 12,
    width: 60,
    height: 60,
    left: "calc(50% - 40.5px)",
    top: "calc(50% - 40.5px)",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255, 0.9)",
    "&:hover": {
      boxDSadow: "0 0 10px #ccc",
      backgroundColor: "rgba(255,255,255, 0.8)",
    },
  },
  titleWrapper: {
    margin: "16px 0",
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
  },
  sliderArrowRight: {
    position: "absolute",
    right: -24,
    top: 51,
    border: "0 none",
    background: "transparent",
    borderWidth: 0,
    zIndex: 14,
    cursor: 'pointer',
  },
  sliderArrowLeft: {
    position: "absolute",
    left: -24,
    top: 51,
    border: "0 none",
    background: "transparent",
    borderWidth: 0,
    zIndex: 14,
    cursor: 'pointer',
  },
}));
