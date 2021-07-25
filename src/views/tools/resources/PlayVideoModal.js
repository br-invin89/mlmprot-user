import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import ReactPlayer from "react-player";

export default function PlayVideoModal ({ playingVideo, handleClose }) {
  const classes = useStyles();
  return playingVideo ? (
    <section className={classes.videoPopup} onClick={handleClose}>
      <div className={classes.overlay}></div>
      <div className={classes.popupContent}>
        <CloseIcon
          className={classes.closeBtn}
          fontSize="large"
          onClick={handleClose}
        />
        <h2 className={classes.popupH2}>Playing Video</h2>
        {/* <span className={classes.playBtn}>
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 125 80"
            enable-background="new 0 0 125 80"
            focusable="false"
          >
            <rect
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="none"
              width="125"
              height="80"
            ></rect>
            <polygon
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#FFFFFF"
              points="53,22 53,58 79,40"
            ></polygon>
          </svg>
        </span> */}
        <ReactPlayer
          url={[{ src: playingVideo, type: "video/mp4" }]}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </section>
  ) : (
    <></>
  );
};

const useStyles = makeStyles((theme) => ({
  videoPopup: {
    height: "100vh",
    width: "calc(100% - 280px)",
    padding: "16px",
    background: "#00000080",
    position: "fixed",
    left: '280px',
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    outline: "none",
     [theme.breakpoints.down('sm')]: {
      padding: 0,
      left: 0,
      width: '100%',
    },
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
  },
  popupContent: {
    position: "relative",
    width: "780px",
    height: "412px",
    background: "#000",
    animationDuration: "1s",
    animationFillMode: "both",
    zIndex: 3,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: 'calc(100% - 32px)',
    },
    [theme.breakpoints.up('sm')]: { 
      height: 'auto',
      maxWidth: '640px',
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      maxWidth: '640px',
    },
  },
  closeBtn: {
    position: "absolute",
    top: "-50px",
    right: "-60px",
    display: "inline-block",
    width: "60px",
    height: "60px",
    border: "none",
    cursor: "pointer",
    outline: "none",
    color: 'white',
    [theme.breakpoints.down('md')]: {
      top: '-25px',
      right: '-5px',
      height: '25px',
      width: '25px',
    },
  },
  popupH2: {
    fontSize: "24px",
    color: "#fff",
    position: "absolute",
    left: "16px",
    top: "12px",
    zIndex: "2",
    margin: 0,
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      left: '12px',
      fontSize: '16px',
    }
  },
  playBtn: {
    fill: "white",
    height: "80px",
    strokeWidth: "0px",
    position: "absolute",
    zIndex: 2,
    width: "120px",
    background: "rgba(85, 86, 90, 0.7)",
    left: 'calc(50 % -"60px")',
    bottom: 'calc(50 % -"40px")',
  },
}));
