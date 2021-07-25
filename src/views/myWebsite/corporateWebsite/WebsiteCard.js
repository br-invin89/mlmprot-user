import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RawCard from "components/cards/RawCard";
import {
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FacebookProvider, Share as FacebookShare } from "react-facebook";
import { Alert } from '@material-ui/lab'
import { default as TwitterShareLink } from "react-twitter-share-link";
import { default as LinkedinShareLink } from "react-linkedin-share-link";
import EmailShare from "react-email-share-link";
import { ReactComponent as LinkedInIcon } from "assets/icons/linkedin.svg";
import { ReactComponent as TwitterIcon } from "assets/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/facebook.svg";
import { ReactComponent as MailIcon } from "assets/icons/mail.svg";
import BannerImage from "assets/images/banner.png";
import useStyles from "./WebsiteCard.style";

export default function WebsiteCard({ data }) {
  const classes = useStyles();
  const myUser = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState(undefined);

  useEffect(() => {
    if (myUser) {
      setUsername(myUser.username);
    }
  }, [myUser]);

  const openPreview = () => {
    // window.open(data.myTemplate.template.preview_site_url, "_blank")
    window.open(`${process.env.REACT_APP_ECOMMERCE_URL}/${username}`, "_blank");
  };

  const copyToClipboard = () => {
    setSuccessMessage('Copied to clipboard')
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_ECOMMERCE_URL}/e/${username}`
    );
  };

  return (
    <RawCard className={{ content: classes.root }}>
      <CardMedia className={classes.media} image={BannerImage} />
      <CardContent className={classes.contentRoot}>
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
          href={`${process.env.REACT_APP_ECOMMERCE_URL}/e/${username}`}
          className={classes.websiteLink}
        >
          {`${process.env.REACT_APP_ECOMMERCE_URL}/e/${username}`}
        </Typography>
        <div className={classes.divider}>
          <Typography className={classes.shareText}>Share to</Typography>
        </div>
        <div className={classes.socialMedia}>
          <FacebookProvider appId="123456789">
            <FacebookShare
              href={`${process.env.REACT_APP_ECOMMERCE_URL}/${username}`}
            >
              {({ handleClick, loading }) => (
                <a onClick={(e) => !loading && handleClick(e)}>
                  <FacebookIcon
                    color="primary"
                    className={classes.socialIcon}
                  />
                </a>
              )}
            </FacebookShare>
          </FacebookProvider>
          <TwitterShareLink
            link={`${process.env.REACT_APP_ECOMMERCE_URL}/${username}`}
          >
            {(link) => (
              <a href={link} target="_blank">
                <TwitterIcon color="primary" className={classes.socialIcon} />
              </a>
            )}
          </TwitterShareLink>
          <LinkedinShareLink
            link={`${process.env.REACT_APP_ECOMMERCE_URL}/${username}`}
          >
            {(link) => (
              <a href={link} target="_blank">
                <LinkedInIcon color="primary" className={classes.socialIcon} />
              </a>
            )}
          </LinkedinShareLink>
          {/* subject={`MLM Site`} body={`I woudld like to share this <a href="${process.env.REACT_APP_ECOMMERCE_URL}/${username}">link</a> to you.`} */}
          <EmailShare email="">
            {(link) => (
              <a href={link} data-rel="external">
                <MailIcon color="primary" className={classes.socialIcon} />
              </a>
            )}
          </EmailShare>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.btn}
          onClick={copyToClipboard}
        >
          Copy Website Link
        </Button>
        {successMessage && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={successMessage}
            autoHideDuration={2000}
            onClose={(_, r) => {
              if (r == "timeout") setSuccessMessage(undefined);
            }}
          >
            <Alert
              severity="success"
              variant="filled"
              onClose={() => setSuccessMessage(undefined)}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        )}
      </CardContent>
    </RawCard>
  );
}
