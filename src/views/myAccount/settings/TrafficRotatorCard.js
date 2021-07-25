import React, { useState, useEffet } from 'react'
import {
  List, ListItem, 
  ListItemText, ListItemIcon,
  CircularProgress
} from '@material-ui/core'
import clsx from 'clsx'
import SettingCard from 'components/cards/SettingCard'
import useStyles from './SummaryCard.style'
import { userPowerLegText } from 'config/var'
import { ReactComponent as RefreshIcon } from 'assets/icons/refresh.svg'

export default ({ data, openEdition }) => {
  const classes = useStyles()

  return (
    <SettingCard title='Traffic Rotator' openEdition={openEdition}>
      <List dense className={classes.list1}>
        <ListItem
          className={clsx(classes.listItem, classes.noPadding)}
        >
          <ListItemIcon
            className={clsx(
              classes.walletIcon,
              classes.refreshIcon
            )}
          >
            <RefreshIcon />
          </ListItemIcon>
          <ListItemText
            primary={data?userPowerLegText(data.power_leg):<CircularProgress size={16} />}
            className={clsx(
              classes.listHeading,
              classes.paddingLeft
            )}
          />
        </ListItem>
      </List>
    </SettingCard>
  )
}
