import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import TextField from 'components/inputs/TextField'
import SelectField from 'components/inputs/SelectField'
import { Skeleton } from "@material-ui/lab";
import Pagination from 'components/pagination/Pagination'
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { asPrice } from "utils/text";
import ProductCard from "components/cards/ProductCard";
import ProductImage from "assets/images/product_image.png";
import { callGetApiWithAuth } from "utils/api";
import { isMemberPrice } from "utils/shop"
import NoData from "components/NoData";

export default function Products({ data }) {
  const classes = useStyles();
  const [searchParam, setSearchParam] = useState({
    title: "",
    collections: "",
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 100,
    total: 0,
  });
  const [collections, setCollections] = useState([]);
  const myUser = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    if (myUser && myUser.shipping_detail) {
      searchCollections();
      searchProducts(searchParam, paginationParam);
    }
  }, [myUser]);

  const searchCollections = () => {
    // callGetApiWithAuth("shop/collections", onGetCollections);
  };
  const onGetCollections = (data) => {
    setCollections(data.data);
  };
  const searchProducts = (searchParam, paginationParam) => {
    var params = [];
    params["dist_center_id"] = myUser.shipping_detail.dist_center_id;
    params['user_type'] = myUser.type;
    params['is_pc'] = 2;
    params['is_sample'] = 1;
    // params["filter[collections]"] = searchParam.collections;
    params["filter[title]"] = searchParam.title;
    params["page"] = paginationParam.currentPage;
    params["per_page"] = paginationParam.perPage;
    var queryString = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    setIsLoadingProducts(true);
    callGetApiWithAuth("shop/products?" + queryString, onGetProducts, () =>
      setIsLoadingProducts(false)
    );
  };
  const onEnterTitle = (e) => {
    if (e.keyCode == 13) {
      let paginationParam_ = { ...paginationParam, currentPage: 1 };
      searchProducts(searchParam, paginationParam_);
    }
  };
  const onSearch = () => {
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    searchProducts(searchParam, paginationParam_);
  }
  const onChangeCollection = (collection) => {
    let searchParam_ = { ...searchParam, collections: collection };
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    setSearchParam(searchParam_);
    setPaginationParam(paginationParam_);
    searchProducts(searchParam_, paginationParam_);
  };
  const onGetProducts = (data) => {
    setProducts(data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.data.current_page,
      total: data.data.total,
    });
    setIsLoadingProducts(false);
  };
  const goPage = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    setPaginationParam(paginationParam_);
    searchProducts(searchParam, paginationParam_);
  };

  /*
  const handleChange = (e) => {
    setValues(e.target.value);
  };
  const handleSearch = () => {
    //TODO implement search api
  };
  */

  return (
    <div className={classes.paper}>
      <div className={classes.actions}>
        {/*
        <div className={classes.filterRoot}>
          <div className={classes.searchField}>
            <TextField
              label="Search Resources…"
              variant="outlined"
              size="small"
              name="search"
              className={classes.input}
              value={searchParam.title}
              onChange={(e) =>
                setSearchParam({ ...searchParam, title: e.target.value })
              }
              onKeyDown={(e) => onEnterTitle(e)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={clsx(classes.btn, classes.submitBtn)}
              onClick={onSearch}
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
            */}
        {/*
        <div className={classes.sortRoot}>
          <label className={classes.label}>Collection:</label>
          <SelectField
            value={searchParam.collections}
            className={clsx(classes.select, classes.input)}
            onChange={(e) => onChangeCollection(e.target.value)}
            options={[
              { label: 'All Products', value: '' },
              ...collections.map(collection=>({label: collection.name, value: collection.id}))
            ]}
          />
        </div>
          */}
      </div>
      <Grid container spacing={3} className={classes.productRoot}>
        {!isLoadingProducts ?
          products?.length > 0 ? products.map((product, index) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
              <ProductCard>
                <div className={classes.imageContainer}>
                  <img
                    src={product.image}
                    alt="Product"
                    className={classes.productImage}
                  />
                </div>
                <Typography component="h2">{product.title}</Typography>
                <Typography
                  component="p"
                  color="primary"
                  className={classes.price}
                >
                  {asPrice(isMemberPrice() ? product.member_price : product.retail_price)}{" "}
                  <Typography
                    component="span"
                    className={classes.memberPrice}
                  >
                    {isMemberPrice() ? '(Member Price)' : '(Retail Price)'}
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
          )) :
            <Grid item xs={12} justifyContent={'center'}>
              <NoData />
            </Grid>
          : [...Array(4).keys()].map((i) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
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
          ))
        }
        {/*
        <Grid item xs={12}>
          <Pagination
            paginationParams={paginationParam}
            onPageChange={goPage}
          />
        </Grid>
        */}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    // height: 182,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    maxWidth: "100%",
    height: 192,
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
  productRoot: {},
  paper: {
    marginTop: theme.spacing(6),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 35,
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  searchField: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: "#FAFAFA",
    // border: "1px solid #CED2DA",
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 94px)'
    },
    '& .MuiInputLabel-outlined': {
      fontSize: 14,
    },
  },
  submitBtn: {
    marginTop: 2,
    marginLeft: theme.spacing(2),
  },
  select: {
    padding: theme.spacing(0.5, 1.2),
    width: 165,
  },
  sortRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      marginTop: 8,
    }
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 10,
  },
}));
