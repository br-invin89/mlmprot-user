import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, CardContent } from "@material-ui/core";
import Card from "components/cards/Card";
import ImageSection from "./product/ImageSection";
import ProductInfo from "./product/ProductInfo";
import { callGetApiWithAuth } from "utils/api";
import RelatedProducts from "./product/RelatedProducts";
import CartBtn from "./miniCart/CartBtn";
import productData from "testdata/product_data.json";
import { makeStyles } from '@material-ui/styles'

export default function ProductDetailPage() {
  const { productId } = useParams();
  const history = useHistory()
  const classes = useStyles()
  const myUser = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState(undefined);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoadingRelatedProducts, setIsLoadingRelatedProducts] = useState(
    false
  );

  useEffect(() => {
    if (!myUser) return
    loadProduct();
  }, [myUser, productId]);
  const loadProduct = () => {
    setIsLoadingProduct(true);
    setProduct(undefined)
    setRelatedProducts([])
    setIsLoadingRelatedProducts(true);
    callGetApiWithAuth(
      `shop/products/${productId}?dist_center_id=${myUser.shipping_detail.dist_center_id}`,
      onGetProduct,
      () => setIsLoadingProduct(false)
    );
    /*
    callGetApiWithAuth(
      `shop/products/${productId}/related?distribution_center_id=${myUser.distribution_center_id}`,
      onGetRelatedProducts
    );
    */

  };
  const onGetProduct = (data) => {
    setProduct(data.data);
    setTimeout(() => {
      setIsLoadingProduct(false);
    }, 1200);
  };
  const onGetRelatedProducts = (data) => {
    setRelatedProducts(data.data);
    setTimeout(() => {
      setIsLoadingRelatedProducts(false);
    }, 1200);
  };

  return (
    <Card>
      <Grid className={classes.productDetailSection} container spacing={3}>
        <Grid xs={12} md={6} lg={6}>
          <ImageSection product={product} />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <ProductInfo product={product} />
        </Grid>
        {/*
        <Grid xs={12} >
          <RelatedProducts relatedProducts={relatedProducts} />
        </Grid>
        */}
      </Grid>
      <CartBtn />
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  productDetailSection: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    }
  }
}));