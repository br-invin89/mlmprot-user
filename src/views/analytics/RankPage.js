import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { callGetApiWithAuth } from 'utils/api'
import { refreshStorage } from 'utils/auth'
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
} from "@material-ui/core";
import SummaryView from './rank/SummaryView'

export default function RankPage() {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SummaryView />
      </Grid>
    </Grid>
  );
};

/*
const useStyles = makeStyles((theme) => ({
  earningRoot: {
    marginBottom: theme.spacing(3),
  },
  avatarRoot: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 13,
  },
  btn: {
    textTransform: "capitalize",
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  input: {
    // backgroundColor: "#FAFAFA",
    // border: "1px solid #CED2DA",
    borderRadius: 5,
    minWidth: 134,
  },
}));
*/
