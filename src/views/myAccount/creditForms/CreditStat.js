import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { asPrice } from 'utils/text'

export default ({ title, data }) => {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Typography component='p' color='textSecondary' className={classes.title}>
        {title}
      </Typography>
      <Typography component='p' className={classes.amount}>
        {data!==undefined?asPrice(data):<Skeleton variant={'rect'} width={80} height={18} />}
      </Typography>
    </div>
  )
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 82,
    width: '100%',
    backgroundColor: theme.palette.primary.inverted,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
  },
  amount: {
    fontSize: 18,
    fontWeight: 500,
  },
}))
