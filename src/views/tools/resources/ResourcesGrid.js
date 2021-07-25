import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import Pagination from "components/pagination/Pagination";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import { callGetApiWithAuth } from "utils/api";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import ResourceCard from "./ResourceCard";
import ResourceCardSkeleton from "./ResourceCard.skeleton";
import { fontWeight } from "@material-ui/system";
import NoData from "components/NoData";

export default function ResourcesGrid({ className }) {
  const classes = useStyles();
  const typeOptions = [
    { label: "ALL", value: "" },
    { label: "PDF", value: 1 },
    { label: "VIDEO", value: 2 },
    { label: "LINk", value: 3 },
  ];
  const [searchParam, setSearchParam] = useState({
    title: "",
    type: "",
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 12,
    total: 0,
  });
  const [gridData, setGridData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchGridData(searchParam, paginationParam);
  }, []);
  const searchGridData = (searchParam, paginationParam) => {
    setIsLoading(true);
    let params = {};
    params["filter[type]"] = searchParam["type"]
    let q = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    callGetApiWithAuth("resources?" + q, onGetGridData, () =>
      setIsLoading(false)
    );
  };
  const onGetGridData = (data) => {
    setGridData(data.data);
    setIsLoading(false);
  };
  const onPageChange = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    setPaginationParam(paginationParam_);
    searchGridData(searchParam, paginationParam_);
  };
  const onChangeType = (type) => {
    let searchParam_ = { ...searchParam, type };
    setSearchParam(searchParam_);
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    searchGridData(searchParam_, paginationParam_);
  };
  const onEnterTitle = (e) => {
    if (e.keyCode == 13) {
      let paginationParam_ = { ...paginationParam, currentPage: 1 };
      searchGridData(searchParam, paginationParam_);
    }
  };

  return (
    <>
      <Card className={clsx(classes.card, className)}>
        <CardContent className={classes.content}>
          <div className={classes.actions}>
            <div className={classes.searchField}>
              <Typography component="h2" className={classes.title}>
                Resources
              </Typography>
            </div>
            <div className={classes.sortRoot}>
              <label className={classes.label}>Type:</label>
              <SelectField
                value={searchParam.type}
                onChange={(e) => onChangeType(e.target.value)}
                options={typeOptions}
                className={classes.selectField}
              ></SelectField>
            </div>
          </div>

          <Grid container spacing={3}>
            {isLoading ? (
              [...Array(12).keys()].map((index) => (
                <Grid item xs={12} md={3} lg={3}>
                  {" "}
                  <ResourceCardSkeleton key={index} />
                </Grid>
              ))
            ) : (
              <>
                {gridData.map((resource, index) => (
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    {" "}
                    <ResourceCard data={resource} key={index} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
      {!gridData.length && (
        <Grid item xs={12} justifyContent={"center"}>
          <NoData />
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
    paddingTop: 0,
  },
  selectField: {
    minWidth: 150,
    "& .MuiSelect-select": {
      paddingLeft: 15,
    },
  },
  content: {
    paddingTop: 0,
    padding: theme.spacing(3),
    "& .MuiCard-root:hover": {
      boxShadow: "0px 2px 15px #E5E9F2",
      cursor: "pointer",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 14,
    marginBottom: 24,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  input: {
    // backgroundColor: '#FAFAFA',
    // border: '1px solid #CED2DA',
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 94px)",
    },
  },
  submitBtn: {
    marginLeft: theme.spacing(2),
  },
  select: {
    padding: theme.spacing(0.5, 1.2),
    width: 134,
  },
  searchField: {
    display: "flex",
    alignItems: "center",
  },
  sortRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 8,
      justifyContent: "flex-start",
    },
  },
  downloadIcon: {
    paddingRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 10,
  },
  inputField: {
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
}));
