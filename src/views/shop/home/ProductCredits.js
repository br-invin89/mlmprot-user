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
    params['is_pc'] = 1;
    params['is_sample'] = 2;
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

  return (
    <div className={classes.paper}>
      <div className={classes.actions}>
      </div>
      <Grid container spacing={3} className={classes.productRoot}>
        {!isLoadingProducts ?
          products?.length > 0 ? products.map((product, index) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
              <Paper className={`${classes.root} ${index==2?classes.gradientRoot:''}`}>
                <div className={classes.innerRoot}>
                  {/* <div className={classes.imageRoot}>
                    <img className={classes.image} 
                      src={`/images/subscription${props.index+1}.png`} 
                      alt={'Subscription Level'}
                    />
                  </div> */}
                  <div className={classes.title}>
                    {product.title}
                  </div>
                  <div className={classes.price}>
                    {asPrice(product.member_price)}
                  </div>
                  <div className={classes.subtitle}>
                    {product.subtitle}
                  </div>
                  <div className={classes.description}
                    dangerouslySetInnerHTML={{__html: product.description}}
                  />
                  <div className={classes.actionRoot}>
                    <Button 
                      className={classes.activeBtn} 
                      variant={'contained'}
                      component={Link}
                      to={`/shop/product/${product.id}`}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          )) :
            <Grid item xs={12} justifyContent={'center'}>
              <NoData />
            </Grid>
          : <></>
        }
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({  
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
  root: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#444b56',
    padding: '12px',
    marginBottom: '24px',
    '&:hover': {
      boxshadow: '0 5px 15px rgba(0,0,0,0.3)'
    }
  },
  gradientRoot: {
    background: 'rgb(119,109,166)',
    background: 'linear-gradient(135deg, rgba(119,109,166,1) 35%, rgba(97,153,180,1) 100%)'
  },
  innerRoot: {
    height: '400px',
    border: '1px solid #fff',
    padding: '20px 12px',
  },
  imageRoot: {
    textAlign: 'center',
  },
  image: {
    width: '90px',
    height: '64px'
  },
  title: {
    color: '#fff',
    fontSize: '18px'
  },
  price: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    color: '#fff',
    marginBottom: '20px',
  },
  description: {
    '& p': {
      marginBottom: 0,
      marginTop: 0,
      color: '#fff'
    }
  },
  actionRoot: {
    position: 'absolute',
    bottom: '20px',
    left: 0, 
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  activeBtn: {
    width: '240px',

  },
  activedBtn: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    width: '180px',
  },
  billingAt: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      marginTop: 0,
      marginBottom: 0,
      color: '#fff',
      fontSize: '12px'
    }
  },
  statusRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 48px)',
    marginBottom: '6px',
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  statusBadge: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  },
  statusErrorBadge: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  },
  dateBadge: {
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px'
  }
}));
