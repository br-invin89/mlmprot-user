import React from "react";
import { Divider, Grid, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyle from "./SupportHelpPage.style";
import BannerSection from "./BannerSection";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import PhoneIcon from "@material-ui/icons/Phone";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EmailIcon from "@material-ui/icons/Email";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function SupportHelpPage() {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <BannerSection />
      <div className={classes.contentRoot}>
        <div className={classes.helpContainer}>
          <div className={classes.helpTitle}>
            <HeadsetMicIcon style={{ fontSize: 60, color: "#5d487a" }} />
          </div>
        </div>
        <div className={classes.supportContainer}>
          <div className={classes.suppotTitle}>Customer Support</div>
          <div className={classes.memberTitle}>Customer Phone Support:</div>
          <div className={classes.helpLabel}>
            1 (833) 382-0536 | 7 days a week, 7AM - 7PM MST
          </div>
          <a href="mailto:Support@aluva.co" className={classes.mailTag}>Support@aluva.co</a>
        </div>
      </div>
    </div>
  );
}
