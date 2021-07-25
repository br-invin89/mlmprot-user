import React, { useState, useEffet } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Box,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import CountryFlag from "components/flag/CountryFlag";
import SettingCard from "components/cards/SettingCard";
import useStyles from "./AddressCard.style";

export default ({ data, openEdition }) => {
  const classes = useStyles();

  const cardTypeOptions = [
    {
      value: 1,
      label: "Visa",
    },
    {
      value: 2,
      label: "Mastercard",
    },
    {
      value: 3,
      label: "Discover",
    },
    {
      value: 4,
      label: "Amex",
    },
    {
      value: 5,
      label: "Diners",
    },
  ];

  const varLabel = (value) => {
    let label = '';
    cardTypeOptions.forEach((el) => {
      if (el.value === value * 1) {
        label = el.label;
      }
    });
    return label;
  };

  return (
    <SettingCard title="Billing Info" openEdition={openEdition}>
      <List dense className={classes.list1}>
        <ListItem className={classes.listItem}>
          <ListItemText primary="CC Number" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail.last_cc_4 != 'none' ? (
              '************' + data.billing_detail.last_cc_4
            ) : (
              'NA'
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Card Type" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail.cc_type != '' ? (
              varLabel(data.billing_detail.cc_type)
            ) : (
              ''
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Exp Date" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.cc_exp_date
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="CVV" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail.last_cc_4 != 'none' ? "***" : 'NA'}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary="Name on Card"
            className={classes.listHeading}
          />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.cc_name
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary="Address Line 1"
            className={classes.listHeading}
          />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.billing_address
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary="Address Line 2"
            className={classes.listHeading}
          />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.billing_address_line2
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary="City" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.billing_city
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Zip/Postal Code" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.billing_zipcode
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary="State/Province" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              data.billing_detail.billing_state
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Country" className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.billing_detail ? (
              <Tooltip title={data.billing_detail.billing_country}>
                <Box>
                  <CountryFlag
                    countryCode={data.billing_detail.billing_country}
                  />
                </Box>
              </Tooltip>
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </SettingCard>
  );
};
