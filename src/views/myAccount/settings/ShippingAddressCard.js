import React, { useState, useEffet } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Tooltip,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import SettingCard from 'components/cards/SettingCard'
import CountryFlag from 'components/flag/CountryFlag'
import useStyles from './AddressCard.style'

export default ({ data, openEdition }) => {
  const classes = useStyles()

  return (
    <SettingCard title='Shipping Info' openEdition={openEdition}>
      <List dense className={classes.list1}>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary='Address Line 1'
            className={classes.listHeading}
          />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              data.shipping_detail.shipping_address
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary='Address Line 2'
            className={classes.listHeading}
          />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              data.shipping_detail.shipping_address_line2
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='City' className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              data.shipping_detail.shipping_city
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Zip/Postal Code' className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              data.shipping_detail.shipping_zipcode
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='State/Province' className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              data.shipping_detail.shipping_state
            ) : (
              <Skeleton width={140} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Country' className={classes.listHeading} />
          <ListItemSecondaryAction className={classes.listText}>
            {data && data.shipping_detail ? (
              <Tooltip title={data.shipping_detail.shipping_country}>
                <Box>
                  <CountryFlag
                    countryCode={data.shipping_detail.shipping_country}
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
  )
}
