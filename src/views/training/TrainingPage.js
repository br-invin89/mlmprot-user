import React, { useState, useEffect } from "react";
import { Grid, Typography, CardContent } from "@material-ui/core";
import Card from "components/cards/Card";
import SearchBar from "./searchBar/SearchBar";
import VideoSection from "./videoSection/VideoSection";
import videosData from "testdata/training_data.json";
import { makeStyles } from "@material-ui/styles";
import { callGetApiWithAuth } from 'utils/api'

export default function TrainingPage() {
  const classes = useStyle()

  const [videos, setVideos] = useState(undefined)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState('-created_at') 

  useEffect(() => {
    // callGetApiWithAuthSimulator('training/load-init', onGetVideos)
    search(searchValue)    
  }, [])
  useEffect(() => {
    search(searchValue)
  }, [sortValue, searchValue])
     
  const search = (searchValue) => {
    setVideos(undefined)
    var params = []
    // params['filter[name]'] = searchValue
    setSearchValue(searchValue)
    var q = Object.keys(params).map(k=>k+'='+params[k]).join('&')    
    callGetApiWithAuth('trainings?'+q, onGetTrainingData)
  }
  const onGetTrainingData = (data) => {
    setVideos(data.data)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Typography component="h2" className={classes.title}>
            Training Videos
          </Typography>
          <VideoSection videosGrouped={videos} />
        </Card>
      </Grid>
    </Grid>
  );
};

const useStyle = makeStyles({
  title: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 20
  },
});
