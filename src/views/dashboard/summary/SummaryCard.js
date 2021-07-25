import React, { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import Card from "components/cards/Card";
import { callGetApiWithAuth } from "utils/api";
import { ReactComponent as PeopleIcon } from "assets/icons/people.svg";
import { ReactComponent as FlagIcon } from "assets/icons/flag.svg";
import { ReactComponent as HandbagIcon } from "assets/icons/handbag-color.svg";
import { ReactComponent as BriefcaseIcon } from "assets/icons/briefcase.svg";
import { ReactComponent as User2Icon } from "assets/icons/users2.svg";
import { ReactComponent as BagIcon } from "assets/icons/bag.svg";

import { asNumber, asPrice } from "utils/text";
import useStyles from "./SummaryCard.style";

const icons = {
  people: <PeopleIcon />,
  flag: <FlagIcon />,
  bag: <HandbagIcon />,
  briefcase: <BriefcaseIcon />,
  user2: <User2Icon />,
  bag: <BagIcon />,
};

export default function SummaryCard() {
  const classes = useStyles();
  const [data, setData] = useState(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoadingData(true);
    callGetApiWithAuth("dashboard/header_stats", onGetData, onFailData);
  };
  const onGetData = (data) => {
    setData({
      totalCustomers: data.data.users_count.total_customers,
      totalAffiliates: data.data.users_count.affiliate_users_count,
      totalAutoships: data.data.autoships,
      totalCommissions: data.data.commissions_earned,
    });
    setIsLoadingData(false);
  };
  const onFailData = () => {
    setIsLoadingData(false);
  };

  return (
      <div className={classes.ewIxbi}>
        <div className={classes.jUsJDi}>
          <div className={classes.lcmrOX}>
            <User2Icon className={classes.IconImage} />
            <h4 className={classes.title}>Customers</h4>
            <p className={classes.value}>
              {data ? (
                asNumber(data.totalCustomers)
              ) : (
                <CircularProgress size={12} />
              )}
            </p>
          </div>
          <div className={classes.lcmrOX}>
          <FlagIcon className={classes.IconImage} />
              <h4 className={classes.title}>Affiliates</h4>
              <p className={classes.value}>
              {data ? (
                asNumber(data.totalAffiliates)
              ) : (
                <CircularProgress size={12} />
              )}
              </p>
          </div>
          <div className={classes.lcmrOX}>
          <BagIcon className={classes.IconImage} />
            <h4 className={classes.title}>Autoships</h4>
            <p className={classes.value}>
            {data ? (
              asNumber(data.totalAutoships)
            ) : (
              <CircularProgress size={12} />
            )}
            </p>
          </div>
          <div className={classes.lcmrOX}>
          <BriefcaseIcon className={classes.IconImage} />
            <h4 className={classes.title}>Commissions</h4>
            <p className={classes.value}>
              {data ? (
                asPrice(data.totalCommissions)
              ) : (
                <CircularProgress size={12} />
              )}
            </p>
          </div>
        </div>
      </div>
  );
};
