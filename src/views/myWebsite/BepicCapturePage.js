import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import PageCard from './capturePages/PageCard'
import PageCardSkeleton from './capturePages/PageCard.skeleton'

export default function BepicCapturePage(props) {
  const [listData, setListData] = useState([
    {
      path: `${process.env.REACT_APP_LANDING_URL}/cp1`,
      image: '',
    },
    {
      path: `${process.env.REACT_APP_LANDING_URL}/cp2`,
      image: '',
    },
    {
      path: `${process.env.REACT_APP_LANDING_URL}/cp3`,
      image: '',
    },
    {
      path: `${process.env.REACT_APP_LANDING_URL}/cp4`,
      image: '',
    },
  ])

  return (
    <Grid container spacing={3}>
      {listData.map(data=>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <PageCard data={data} /> 
        </Grid>
      )}
    </Grid>
  )
}
