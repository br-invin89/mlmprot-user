import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import ProductCard from './ProductCard'

export default function ProductsGrid({ listData, openEdition, afterSuccessUpdate, onError }) {
  return (
    <Grid container spacing={3}>
      {listData.map((item, index) => (
        <Grid item xs={12} md={6} lg={6} xl={4} key={index}>
          <ProductCard data={item} 
            openEdition={openEdition}
            afterSuccessUpdate={afterSuccessUpdate}
            onError={onError}
          />
        </Grid>
      ))}
    </Grid>
  )
}
