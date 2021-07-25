import React, { useEffect, useState } from 'react'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth } from 'utils/api'
import CreditStat from './CreditStat'

export default function CreditStatView({ shouldLoad, setShouldLoad }) {
  const classes = useStyle()

  const [currentBalance, setCurrentBalance] = useState(undefined)
  const [totalAmount, setTotalAmount] = useState(undefined)
  const [withdrawnAmount, setWithdrawnAmount] = useState(undefined)
  const [requestedAmount, setRequestedAmount] = useState(undefined)
  const [purchasedAmount, setPurchasedAmount] = useState(undefined)

  useEffect(() => {
    if (shouldLoad) loadAmount()
  }, [shouldLoad])
  const loadAmount = () => {
    callGetApiWithAuth('wallet/amount', onGetBalance)
  }
  const onGetBalance = (data) => {
    setCurrentBalance(data.data.current_balance)
    setTotalAmount(data.data.total_amount)
    setWithdrawnAmount(data.data.withdrawn_amount)
    setRequestedAmount(data.data.requested_amount)
    setPurchasedAmount(data.data.purchased_amount)
    setShouldLoad(false)
  }

  return (
    <Grid container spacing={3} className={classes.statRoot}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.statCard}>
        <CreditStat title='Current Balance' data={currentBalance} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.statCard}>
        <CreditStat title='Requested Amount' data={requestedAmount} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.statCard}>
        <CreditStat title='Withdraw  Earnings' data={withdrawnAmount} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.statCard}>
        <CreditStat title='Purchased Amount' data={purchasedAmount} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.statCard}>
        <CreditStat title='Total  Earnings' data={totalAmount} />
      </Grid>
    </Grid>
  )
}

const useStyle = makeStyles((theme) => ({
  statRoot: {
    marginTop: theme.spacing(2),
  },
  statCard: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '20%',
    },
  },
}))
