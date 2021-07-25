import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RawCard from 'components/cards/RawCard'
import { 
  CardContent, CardMedia,
  Button, Typography,
  Divider
} from '@material-ui/core'
import { FacebookProvider, Share as FacebookShare } from 'react-facebook'
import { default as TwitterShareLink } from 'react-twitter-share-link'
import { default as LinkedinShareLink } from 'react-linkedin-share-link'
import EmailShare from 'react-email-share-link'
import { ReactComponent as LinkedInIcon } from "assets/icons/linkedin.svg";
import { ReactComponent as TwitterIcon } from "assets/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail.svg"
import useStyles from './PageCard.style'

const PageCard = ({ data }) => {  
  const classes = useStyles()
  const myUser = useSelector(state=>state.auth.user)

  const openPreview = () => {
    window.open(`${data.path}/${myUser.username}`, "_blank")
  }

  return (
    <RawCard className={classes.root}>
      <CardMedia
        className={classes.media}
        image={data.image}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.resourceTitle}
        >
          Your Website Link
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          component="a"
          href={`${data.path}/${myUser.username}`}
          target={'_blank'}
          className={classes.websiteLink}
        >
          {`${data.path}/${myUser.username}`}
        </Typography>
        <div className={classes.divider}>
          <Typography className={classes.shareText}>Share to</Typography>
        </div>
        <div className={classes.socialMedia}>
          <FacebookProvider appId="123456789">
            <FacebookShare href={`${data.path}/${myUser.username}`}>
              {({ handleClick, loading }) => (
                <a onClick={e => !loading && handleClick(e)}><FacebookIcon color="#10c020" className={classes.socialIcon} /></a>
              )}
            </FacebookShare>
          </FacebookProvider>
          <TwitterShareLink link={`${data.path}/${myUser.username}`}>
            {link => (
              <a href={link} target='_blank'><TwitterIcon color="#10c020" className={classes.socialIcon} /></a>
            )}
          </TwitterShareLink>
          <LinkedinShareLink link={`${data.path}/${myUser.username}`}>
            {link => (
              <a href={link} target='_blank'><LinkedInIcon color="#10c020" className={classes.socialIcon} /></a>
            )}
          </LinkedinShareLink>
          <EmailShare email="" >
            {link => (
              <a href={link} data-rel="external"><MailIcon color="#10c020" className={classes.socialIcon} /></a>
            )}
          </EmailShare>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
          onClick={openPreview}
        >
          Preview Site
        </Button>
      </CardContent>
    </RawCard>
  );
}

export default PageCard
