import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { callGetApiWithAuth } from "utils/api";
import Card from "components/cards/Card";
import Pagination from 'components/pagination/Pagination'
import SearchBar from "./news/SearchBar";
import NewsCard from "./news/NewsCard";
import NewsCardSkeleton from './news/NewsCardSkeleton'
import MonthList from "./news/MonthList";
import NoData from "components/NoData";
import NewsDetailsModal from "./news/NewsDetailsModal";

export default () => {
  const classes = useStyles();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [details, setDetails] = useState(undefined);
  const [searchParam, setSearchParam] = useState({
    month: moment().format("YYYY-MM"),
    title: "",
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 5,
    total: 0,
  });
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    loadNews(paginationParam, searchParam);
  }, []);
  const loadNews = (paginationParam, searchParam) => {
    let params = [];
    // params["page"] = paginationParam.currentPage;
    // params["per_page"] = paginationParam.perPage;
    params["filter[month]"] = searchParam.month;
    params["filter[title]"] = searchParam.title;
    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    setIsLoadingList(true);
    callGetApiWithAuth("news?" + query, onGetNewsData, onFailNewsData);
  };
  const onGetNewsData = (data) => {
    // setPaginationParam({
    //   ...paginationParam,
    //   total: data.data.total,
    //   currentPage: data.data.current_page * 1,
    // });
    setNewsData(data.data);
    setIsLoadingList(false);
  };
  const onFailNewsData = () => {
    setIsLoadingList(false);
  };
  const searchByMonth = (month) => {
    let searchParam_ = { ...searchParam, month };
    setSearchParam(searchParam_);
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    setPaginationParam(paginationParam_);
    loadNews(paginationParam_, searchParam_);
  };
  const searchByTitle = (title) => {
    let searchParam_ = { ...searchParam, title };
    setSearchParam(searchParam_);
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    setPaginationParam(paginationParam_);
    loadNews(paginationParam_, searchParam_);
  };
  const goPage = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    setPaginationParam(paginationParam_);
    loadNews(paginationParam_, searchParam);
  };

  const openModal = (item) => {
    setDetails(item);
  };
  const closeModal = () => {
    setDetails(undefined);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.searchContainer}>
          <SearchBar handleSearch={searchByTitle} />
          <MonthList handleSearch={searchByMonth} searchParam={searchParam} />
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.contentRoot}>
        <Grid container spacing={3} alignItems={'center'}>
          {isLoadingList?
            [...Array(5).keys()].map(index => (
              <Grid item xs={12} md={6} lg={4}>
                <NewsCardSkeleton />
              </Grid>
            ))
          : <>
            {newsData && newsData.length > 0 && newsData.map((data) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <NewsCard data={data} openModal={openModal}/>
              </Grid>
            ))}
            {newsData && newsData.length==0 && 
              <Grid item xs={12} justifyContent={'center'}>
                <NoData />
              </Grid>              
            }
            </>
          }
        </Grid>
        <NewsDetailsModal details={details} closeModal={closeModal} />

        {/* <CardActions>
          <Pagination paginationParams={paginationParam}
            onPageChange={goPage}
          />
        </CardActions> */}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    height: "100%",
  },
  searchRoot: {
    padding: theme.spacing(3),
  },

  paginationRoot: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 22,
  },
  pagination: {
    marginTop: -10,
  },
  results: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
}));
