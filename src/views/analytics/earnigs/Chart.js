import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import { Skeleton } from '@material-ui/lab'
import { CircularProgress } from '@material-ui/core'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from 'utils/api';
import NoData from "components/NoData";

// const data = [
//   { month: "jan", amount: 50, income: 0 },
//   { month: "Feb", amount: 100, income: 50 },
//   { month: "Mar", amount: 150, income: 25 },
//   { month: "Apr", amount: 250, income: 100 },
//   { month: "May", amount: 250, income: 50 },
//   { month: "Jun", amount: 250, income: 150 },
//   { month: "Jul", amount: 250, income: 200 },
// ];

export default function Chart() {
  const theme = useTheme();
  const classes = useStyles()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [paramSearch, setParamSearch] = useState({ year_range: moment().format('YYYY|YYYY') })

  useEffect(() => {
    searchChartData(paramSearch)
  }, [])

  const searchChartData = (paramSearch) => {
    setIsLoading(true)
    let params = {}
    params['year_range'] = paramSearch['year_range']
    let queryString = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth('earnings/graph?'+queryString, onGetChartData, ()=>setIsLoading(false))
  }
  const onGetChartData = (data) => {
    let data_ = []
    for (let k in data.data) {
      data_.push({month: moment(k).format('MM/DD'), amount: data.data[k]*1})
    }
    setData(data_)
    setIsLoading(false)
  }

  const CustomizedYAxisTick = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >
          {asPrice(payload.value)}
        </text>
      </g>
    );
  };

  const CustomizedXAxisTick = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <React.Fragment>
      {isLoading?
        <div className={classes.loadingWrapper}>
          <CircularProgress size={36} />
        </div>
      : <>
        {data.length != 0 ?
          <ResponsiveContainer>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
              />
              <XAxis
                dataKey="month"
                strokeWidth={0}
                padding={{ left: 30, right: 30 }}
                tick={<CustomizedXAxisTick />}
              />
              <YAxis
                dataKey="amount"
                tick={<CustomizedYAxisTick />}
                strokeWidth={0}
                padding={{ bottom: 30 }}
              />
              <Tooltip />
            </LineChart>          
          </ResponsiveContainer>      
        : <ResponsiveContainer><NoData /></ResponsiveContainer>
        }     
        </>
      }
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  loadingWrapper: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  
  },
}))
