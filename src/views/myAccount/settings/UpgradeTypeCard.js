import React, { useState, useEffet } from 'react'
import {
  List, ListItem, 
  ListItemText, ListItemIcon,
  CircularProgress
} from '@material-ui/core'
import clsx from 'clsx'
import SettingCard from 'components/cards/SettingCard'
import useStyles from './SummaryCard.style'
import { userTypeText } from 'config/var'
import { ReactComponent as EqualizerIcon } from 'assets/icons/equalizer.svg'

export default function UpgradeTypeCard ({ data, openEdition }) {
  const classes = useStyles()

  return (
    <SettingCard title='Your Type'>
      <List dense className={classes.list1}>
        <ListItem
          className={clsx(classes.listItem, classes.noPadding)}
        >
          <ListItemIcon
            className={clsx(
              classes.walletIcon,
              classes.equalizerIcon
            )}
          >
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText
            primary={data?userTypeText(data.type):<CircularProgress size={16} />}
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










