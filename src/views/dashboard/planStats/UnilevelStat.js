import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from '@material-ui/lab'
import { callGetApiWithAuth } from 'utils/api'
import { asNumber } from 'utils/text'

export default function UnilevelStat(props) {  
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(undefined)

  useEffect(() => {
    // setInitialSelectedTab();
    loadData()
  }, []);

  const loadData = () => {
    setIsLoading(true)
    callGetApiWithAuth('myteam/stats', onGetData, ()=>setIsLoading(false))
  }

  const onGetData = (data) => {
    setIsLoading(false)
    setData(data.data)
  }

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        <StatSingle 
          label={'Unilevel CV'}
          value={data?asNumber(data.tree_bv)+'BV':'-'}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item sm={3} xs={12}>
        <StatSingle 
          label={'Personally Enrolled Members'}
          value={data?asNumber(data.personally_enrolled):'-'}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item sm={3} xs={12}>
        <StatSingle 
          label={'New Affiliates This Month'}
          value={data?asNumber(data.new_affiliates_this_month):'-'}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item sm={3} xs={12}>
        <StatSingle 
          label={'New Customers This Month'}
          value={data?asNumber(data.new_customers_this_month):'-'}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  )
}

const StatSingle = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>      
      <Typography 
        component={'h2'}        
        className={classes.value}
      >
        {props.isLoading?<Skeleton width={100} height={24} />:props.value}
      </Typography>
      <Typography 
        component={'p'}
        className={classes.label}
      >
        {props.label}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    textAlign: 'center',
    margin: '12px 0'
  },
  label: {
    fontSize: 12,    
  },
  value: {
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center'
  }
}))
