import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { 
  Grid, Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from "@material-ui/lab";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from 'utils/api'
import ProductCard from "components/cards/ProductCard"
import { isMemberPrice } from 'utils/shop'

export default function BestSellingSection() {
  const classes = useStyles()
  const myUser = useSelector((state) => state.auth.user)
  const [products, setProducts] = useState(undefined)

  useEffect(() => {
    if (!myUser) return

    loadProducts()
  }, [myUser])

  const loadProducts = () => {
    var params = [];
    params['dist_center_id'] = myUser.shipping_detail.dist_center_id
    params['user_type'] = myUser.type
    params['filter[type]'] = 'best_seller'
    params['per_page'] = 4
    var q = Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join("&")
    callGetApiWithAuth('shop/products?' + q, onGetProducts)
  }
  const onGetProducts = (data) => {
    setProducts(data.data.data)
  }

  return (
    <div>
      <Typography component={'h3'} className={classes.title}>
        Best Selling Products
      </Typography>
      <Grid container spacing={3} className={classes.featuredProducts}>
        {products ? products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard>
              <div className={classes.imageContainer}>
                <img
                  src={product.image}
                  alt="product image"
                  className={classes.productImage}
                />
              </div>
              <Typography component="h2">{product.title}</Typography>
              <Typography
                component="p"
                color="primary"
                className={classes.price}
              >
                {asPrice(isMemberPrice()?product.member_price:product.retail_price)}{" "}
                <Typography
                  component="span"
                  className={classes.memberPrice}
                >
                  {isMemberPrice()?'(Member Price)':'(Retail Price)'}
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
        ))
        : [...Array(4).keys()].map((i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <ProductCard>
              <div className={classes.imageContainer}>
                <Skeleton variant={"rect"} width={216} height={182} />
              </div>
              <div style={{ height: 36 }}> 
                <Skeleton height={48} />
                </div>
              <div className={classes.price}>
                <Skeleton height={36} />
              </div>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.btn}
              >
                &nbsp;
            </Button>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '12px'
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
  featuredProducts: {
    justifyContent: 'center'
  }
}))
