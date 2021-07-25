import React, { useState, useEffet } from 'react'
import { useHistory } from 'react-router-dom'
import {
  List, ListItem, 
  ListItemText, ListItemIcon,
  CircularProgress
} from '@material-ui/core'
import clsx from 'clsx'
import { asPrice } from 'utils/text'
import SettingCard from 'components/cards/SettingCard'
import useStyles from './SummaryCard.style'
import { ReactComponent as WallerColorIcon } from 'assets/icons/wallet-color.svg'

export default function CreditWalletCard ({ currentBalance }) {
  const classes = useStyles()
  const history = useHistory()

  const goWallet = () => {
    history.push('/credit-wallet/transfer-commissions')
  }

  return (
    <SettingCard title='Credit Wallet' openEdition={goWallet}>
      <List dense className={classes.list1}>
        <ListItem
          className={clsx(classes.listItem, classes.noPadding)}
        >
          <ListItemIcon className={classes.walletIcon}>
            <WallerColorIcon />
          </ListItemIcon>
          <ListItemText
            primary={currentBalance!==undefined?asPrice(currentBalance):<CircularProgress size={16} />}
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
