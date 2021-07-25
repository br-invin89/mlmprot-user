import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "components/cards/ProductCard";
import { asPrice } from "utils/text";
import { Link } from "react-router-dom";

export default ({ relatedProducts }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.products}>
      <Grid item xs={12}>
        <Typography component={"h2"} align="center">
          You may also like
        </Typography>
      </Grid>
      {relatedProducts.map((product) => (
        <Grid item xs={12} md={3} lg={3} key={product.id}>
          <ProductCard>
            <div className={classes.imageContainer}>
              <img
                src={product.image}
                alt="product image"
                className={classes.productImage}
              />
            </div>
            <Typography component="h2">{product.title}</Typography>
            <Typography component="p" color="primary" className={classes.price}>
              {asPrice(product.member_price)}{" "}
              <Typography component="span" className={classes.memberPrice}>
                (Member Price)
              </Typography>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              className={classes.btn}
              component={Link}
              to={`/shop/product/${product.id}`}
            >
              Shop Now
            </Button>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  products: {
    marginTop: 100,
  },
  imageContainer: {
    height: 182,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    maxWidth: "100%",
  },
  price: {
    marginTop: 6,
    marginBottom: 13,
    fontSize: 18,
    fontWeight: 500,
  },
  memberPrice: {
    color: theme.palette.text.disabled,
    fontSize: 14,
  },
  Button: {
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
  },
}));
