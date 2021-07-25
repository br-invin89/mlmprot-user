import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlayVideoModal from "./PlayVideoModal";
import resourceImage from "assets/images/resource_image.png";
import downloadIcon from "assets/icons/Download.svg";
import frameIcon from "assets/icons/frame1.svg";

export default function RecipeReviewCard({ data }) {
  const classes = useStyles();
  const [isOpenedVideo, setIsOpenedVideo] = useState(false)

  const openPlay = () => {
    setIsOpenedVideo(true)
  }

  const goSite = () => {
    window.open(data.link, '_blank')
  }

  const handleDownload = () => {
    window.open(data.file, '_blank')    
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={data.thumbnail}
        title="Paella dish"
      />
      <CardContent>
        <div className={classes.typeBox}>
          <Typography className={classes.typeContent}>
          <img src={frameIcon} className={classes.downloadIcon} />
            {data.type === 1 ? 'PDF' : data.type===2?'VIDEO':'LINK'}
          </Typography>  
        </div>  
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.resourceTitle}
        >
          {data.title}
        </Typography>
        {data.type===1 && 
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
          onClick={handleDownload}
        >
          <img src={downloadIcon} className={classes.downloadIcon} />
          Download
        </Button>
        }
        {data.type===2 && 
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
          onClick={openPlay}
        >          
          Play Now
        </Button>
        }
        {data.type===3 && 
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
          onClick={goSite}
        >          
          Visit Web Site
        </Button>
        }
        {isOpenedVideo && 
          <PlayVideoModal 
            playingVideo={data.file}
            handleClose={()=>setIsOpenedVideo(false)}
          />
        }
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: "50.25%", // 16:9
    borderRadius: 6,
  },
  typeBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -50,
    marginRight: -5,
    marginBottom: 30,
  },
  downloadIcon: {
    paddingRight: 5,
  },
  typeContent: {
    fontSize: 12,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    padding: '4px 10px 2px',
    borderRadius: 16
  },
  root: {
    border: '1px solid #E5E9F2',
    boxShadow: 'none',
    '& button': {
      fontSize: 14,
      textTransform: "capitalize",
      fontWeight: 500,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 6,
      paddingTop: 12,
      paddingBottom: 12,
      background: 'transparent',
      boxShadow: 'none',
      color: theme.palette.primary.main,
    },
    '& button:hover': {
      fontSize: 14,
      textTransform: "capitalize",
      fontWeight: 500,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 6,
      paddingTop: 12,
      paddingBottom: 12,
      background: 'transparent',
      boxShadow: 'none',
      color: theme.palette.primary.main,
    },
  },
  resourceTitle: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 500,
  },
}));
