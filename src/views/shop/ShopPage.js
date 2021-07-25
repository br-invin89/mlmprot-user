import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Slider from "./home/Slider";
import Products from "./home/Products";
import FeaturedProducts from './home/FeatureProducts'
import CartBtn from './miniCart/CartBtn'

export default function ShopPage(data) {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Slider />
      </Grid>
      {/*
      <Grid item xs={12}>
        <FeaturedProducts />
      </Grid>
      */}
      <Grid item xs={12}>
        <Products />
      </Grid>
      <CartBtn />
    </Grid>
  );
};

const useStyle = makeStyles((theme) => ({
}));
