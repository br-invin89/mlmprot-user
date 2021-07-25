import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, CardContent, CircularProgress, Button } from "@material-ui/core";
import moment from "moment";
import Card from "components/cards/Card";
import eventData from "testdata/event_data.json";
import SearchBar from "./events/SearchBar";
import EventCard from "./events/EventCard";
import { callGetApiWithAuth } from "utils/api";
import MonthList from "./events/MonthList";
import EventsCardSkeleton from '../news/news/NewsCardSkeleton'
import NoData from "components/NoData";

export default function EventsPage() {
  const classes = useStyles();
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 5,
    total: 0,
  });
  const [searchParam, setSearchParam] = useState({
    title: "",
    month: moment().format("YYYY-MM"),
  });

  useEffect(() => {
    loadEvents(paginationParam, searchParam);
  }, []);
  const loadEvents = (paginationParam, searchParam) => {
    setIsLoadingList(true);
    let params = [];
    params["filter[month]"] = searchParam.month;
    params["filter[title]"] = searchParam.title;
    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    callGetApiWithAuth("events?" + query, onGetEventsData, onFailEventsData);
  };
  const onGetEventsData = (data) => {
    setIsLoadingList(false);
    setEventsData(data.data);
    // setPaginationParam({
    //   ...paginationParam,
    //   total: data.data.total,
    //   perPage: data.data.per_page,
    // });
  };
  const onFailEventsData = (errorMessage) => {
    setIsLoadingList(false);
  };
  const loadMore = () => {
    let paginationParam_ = {
      ...paginationParam,
      perPage: paginationParam.perPage * 1 + 5,
    };
    setPaginationParam(paginationParam_);
    loadEvents(paginationParam_, searchParam);
  };
  const searchByMonth = (month) => {
    let searchParam_ = { ...searchParam, month };
    setSearchParam(searchParam_);
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    setPaginationParam(paginationParam_);
    loadEvents(paginationParam_, searchParam_);
  };
  const searchByTitle = (title) => {
    let searchParam_ = { ...searchParam, title };
    setSearchParam(searchParam_);
    let paginationParam_ = { ...paginationParam, perPage: 5 };
    loadEvents(paginationParam_, searchParam_);
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Card contentStyle={classes.searchRoot}>
          <SearchBar searchByTitle={searchByTitle} />
          <MonthList handleSearch={searchByMonth} searchParam={searchParam} />
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.contentRoot}>
        <Grid container spacing={3} alignItems={'center'}>
          {isLoadingList?
            [...Array(5).keys()].map(index => (
              <Grid item xs={12} md={6} lg={4}>
                <EventsCardSkeleton />
              </Grid>
            ))
          : <>
            {eventsData && eventsData.length > 0 && eventsData.map((data) => (
              <Grid item xs={12} md={6} lg={4}>
                <EventCard data={data} />
              </Grid>
            ))}
            {eventsData && eventsData.length==0 && 
              <Grid item xs={12} justifyContent={'center'}>
                <NoData />
              </Grid>              
            }
            </>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    minHeight: 200,
  },
  searchRoot: {
    padding: theme.spacing(3),
  },
  loadSpin: {
    position: "absolute",
    left: "calc(50% - 24px)",
    top: 100,
  },
  actionGroup: {
    display: "flex",
    justifyContent: "center",
  },
}));
