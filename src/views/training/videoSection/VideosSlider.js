import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Typography } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import { isTablet, isBrowser } from "react-device-detect";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowLeft from "assets/icons/slider-goleft.svg";
import ArrowRight from "assets/icons/slider-goright.svg";

import Slider from "react-id-swiper";
import "swiper/swiper-bundle.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const VideosSlider = (props) => {
  const classes = useStyle();
  const sliderRef = useRef(null);
  const slidePrev = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
      setIsBeginning(sliderRef.current.swiper.isBeginning);
      setIsEnd(sliderRef.current.swiper.isEnd);
    }
  };
  const slideNext = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
      setIsBeginning(sliderRef.current.swiper.isBeginning);
      setIsEnd(sliderRef.current.swiper.isEnd);
    }
  };
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    setIsBeginning(sliderRef.current.swiper.isBeginning);
    setIsEnd(sliderRef.current.swiper.isEnd);
  }, [sliderRef]);
  return (
    <div className={classes.sliderWrapper}>
      <Slider width={259} ref={sliderRef}>
        {props.videos.map((video, j) => (
          <div className={classes.slideWrapper} key={`slide-${j}`}>
            <div className={classes.thumbWrapper}>
              <LazyLoadImage alt="video" effect="blur" src={video.thumbnail} />
              <div>
                <IconButton
                  className={classes.playBtn}
                  onClick={() => props.playVideo(video)}
                  component="span"
                >
                  <PlayArrowRoundedIcon
                    style={{ fontSize: 20 }}
                    color="primary"
                  />
                </IconButton>
                <Typography className={classes.playTitle}>
                  {video.name}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {!isBeginning && (
        <div className={classes.sliderArrowLeft} onClick={slidePrev}>
          <img src={ArrowLeft} />
        </div>
      )}
      {!isEnd &&
        ((isBrowser && props.videos.length > 4) ||
          (isTablet && props.videos.length >= 3)) && (
          <div className={classes.sliderArrowRight} onClick={slideNext}>
            <img src={ArrowRight} />
          </div>
        )}
    </div>
  );
};

export default VideosSlider;

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
    "& .lazy-load-image-background.blur.lazy-load-image-loaded": {
      borderRadius: 6,
      height: "100%",
    },
    "& .lazy-load-image-background.blur.lazy-load-image-loaded > img": {
      borderRadius: 6,
      width: "100%",
      height: "167px",
      objectFit: "cover",
    },
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
  playTitle: {
    position: "absolute",
    left: "calc(39% - 40.5px)",
    color: "white",
    fontSize: 13,
    fontWeight: 500,
    top: "calc(100% - 35.5px)",
  },
  playBtn: {
    position: "absolute",
    cursor: "pointer",
    zIndex: 12,
    width: 3,
    height: 3,
    left: "calc(23% - 40.5px)",
    top: "calc(100% - 40.5px)",
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
    cursor: "pointer",
  },
  sliderArrowLeft: {
    position: "absolute",
    left: -24,
    top: 51,
    border: "0 none",
    background: "transparent",
    borderWidth: 0,
    zIndex: 14,
    cursor: "pointer",
  },
}));
