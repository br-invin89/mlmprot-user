import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Typography,
  Tabs,Tab,
  Grid,Button, CircularProgress, Fade
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from "utils/api";
import { isMemberPrice } from "utils/shop"
import ProductCard from "components/cards/ProductCard";

function TabPanel(props) {
  const { children, value, selectedValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value!=selectedValue}
      id={`full-width-tabpanel-${value}`}
      aria-labelledby={`full-width-tab-${value}`}
      {...other}
    >
      <Fade in={value === selectedValue}>
        <Box>{children}</Box>
      </Fade>
    </div>
  );
}

export default function FeatureProducts({ data }) {
  const classes = useStyles();
  const [type, setType] = useState("featured");
  const myUser = useSelector((state) => state.auth.user);
  const [featuredProducts, setFeaturedProducts] = useState(undefined);
  const [newProducts, setNewProducts] = useState(undefined);
  const [bestProducts, setBestProducts] = useState(undefined);

  useEffect(() => {
    if (!myUser) return

    if (!myUser.shipping_detail) return
    searchFeaturedProducts("featured");
    searchFeaturedProducts("new");
    searchFeaturedProducts("best_seller");
  }, [myUser]);

  const searchFeaturedProducts = (featuredType) => {
    var params = [];
    params["dist_center_id"] = myUser.shipping_detail.dist_center_id;
    if (myUser.type==2) {
      params['user_type'] = myUser.enroller_type;
    } else {
      params['user_type'] = myUser.type;
    }
    params["filter[featured]"] = featuredType;
    params["per_page"] = 4;
    var q = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    callGetApiWithAuth(
      "shop/products?" + q,
      featuredType == "featured"
        ? onGetFeaturedProducts
        : featuredType == "new"
        ? onGetNewProducts
        : onGetBestProducts
    );
  };
  const onGetFeaturedProducts = (data) => {
    setFeaturedProducts(data.data.data);
  };
  const onGetNewProducts = (data) => {
    setNewProducts(data.data.data);
  };
  const onGetBestProducts = (data) => {
    setBestProducts(data.data.data);
  };

  return (
    <div>
      <Tabs
        value={type}
        onChange={(_, type) => setType(type)}
        centered
        classes={{
          root: classes.tabsRoot,
          indicator: classes.indicator,
        }}
      >
        {[
          { label: "Featured Products", type: "featured" },
          { label: "New Arrivals", type: "new" },
          { label: "Best Sellers", type: "best_seller" },
        ].map((tabInfo) => (
          <Tab
            label={tabInfo.label}
            classes={{
              root: classes.tabRoot,
            }}
            value={tabInfo.type}
          />
        ))}
      </Tabs>
      {[
        { products: featuredProducts, type: "featured" },
        { products: newProducts, type: "new" },
        { products: bestProducts, type: "best_seller" },
      ].map((data) => (
        <TabPanel value={data.type} selectedValue={type}>
          <Grid container spacing={3} className={classes.featuredProducts}>
            {data.products ? data.products.map((product, index) => (
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
        </TabPanel>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
  },
  tabRoot: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 8,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    }
  },  
  indicator: {
    display: "none",
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
}));
