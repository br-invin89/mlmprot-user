import React from 'react'
import { Grid } from '@material-ui/core'
import ProductsTable from './autoships/ProductsTable'

export default function PastAutoshipsPage () {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProductsTable />
      </Grid>
    </Grid>
  )
}
