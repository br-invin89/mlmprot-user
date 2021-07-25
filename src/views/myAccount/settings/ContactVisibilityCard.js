import React, { useState, useEffet } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import SettingCard from "components/cards/SettingCard";
import useStyles from "./SummaryCard.style";
import { userTypeText } from "config/var";
import { callPutApiWithAuth } from "utils/api";
import { ReactComponent as EqualizerIcon } from "assets/icons/equalizer.svg";

export default function ContactVisibilityCard({
  data,
  openEdition,
  loadUserData,
}) {
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangeContactVisible = (show_contact_info) => {
    if (data.show_contact_info === show_contact_info) return;
    setIsUpdating(true);
    callPutApiWithAuth(
      `profile/show_contact_info`,
      { show_contact_info },
      onDoneUpdate,
      onFailUpdate
    );
  };
  const onDoneUpdate = () => {
    setIsUpdating(false);
    loadUserData();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  return (
    <SettingCard
      className={classes.contactVisibilityRoot}
      title="Contact Info Visibility"
    >
      <List dense className={classes.list1}>
        <ListItem className={clsx(classes.listItem, classes.noPadding)}>
          <ListItemIcon
            className={clsx(classes.walletIcon, classes.equalizerIcon)}
          >
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              !data ? (
                <CircularProgress size={16} />
              ) : (
                <>
                  <div className={classes.contactVisibleCardContent}>
                    Show my contact info for enrollments: <div />
                  </div>
                  <ButtonGroup
                    variant="contained"
                    className={classes.contactVisibleBtnGroup}
                  >
                    <Button
                      color={data.show_contact_info == 1 ? "primary" : ""}
                      onClick={() => handleChangeContactVisible(1)}
                      size={"small"}
                      className={classes.textSize}
                    >
                      Active
                    </Button>
                    <Button
                      color={data.show_contact_info == 2 ? "primary" : ""}
                      onClick={() => handleChangeContactVisible(2)}
                      size={"small"}
                      className={classes.textSize}
                    >
                      Inactive
                    </Button>
                  </ButtonGroup>
                </>
              )
            }
            className={clsx(classes.listHeading, classes.paddingLeft)}
          />
        </ListItem>
      </List>
      {isUpdating && (
        <div className={classes.loadingRoot}>
          <CircularProgress size={36} />
        </div>
      )}
    </SettingCard>
  );
}
