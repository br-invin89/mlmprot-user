import React from 'react'
import { Grid } from '@material-ui/core'
import ProductsTable from './subscriptions/ProductsTable'

export default function PastSubscriptionsPage () {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProductsTable />
      </Grid>
    </Grid>
  )
}
