import React, { useEffect, useState } from 'react'
import { 
  AppBar,
  Tabs, Tab, Typography, Box, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from '@material-ui/lab'
import Card from 'components/cards/Card'
import { callGetApiWithAuth } from 'utils/api'
import moment from 'moment'
import NewsBgImage from 'assets/images/home-news-bg.png'

export default () => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState(0)
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    loadNews();
  }, []);
  const loadNews = () => {
    let params = [];
    params["page"] = 1;
    params["per_page"] = 5;
    params["filter[month]"] = '';
    params["filter[title]"] = '';
    let query = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    callGetApiWithAuth("news?" + query, onGetNewsData);
  };
  const onGetNewsData = (data) => {
    setNewsData(data.data);
  };

  return (
    <Card className={classes.cardRoot}>
      {newsData.map((data, index) => (
        <TabPanel tab={index} 
          selectedTab={selectedTab}
          title={data.title}
          date={data.date}
          content={data.content}
        />
      ))}
      {newsData.length==0 && 
        <TabPanelSkeleton />
      }
      <AppBar position="static" 
        classes={{ root: classes.tabRoot, indicator: classes.tabBtn }} 
      >
        <Tabs
          value={selectedTab}
          onChange={(e, tab)=>setSelectedTab(tab)}
          indicatorColor="text"
          variant="fullWidth"
        >
          {newsData.map((data, index) => (
            <Tab label="" value={index} classes={{ root: classes.tabBtn }} />
          ))}
        </Tabs>
      </AppBar>
    </Card>
  )
}

const TabPanel = ({ tab, selectedTab, title, date, content }) => {
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={tab !== selectedTab}
    >
      {selectedTab === tab && (
        <Box>
          <div className={classes.titleLine}>
            <Typography component={'h4'} className={classes.title}>
              {title}
            </Typography>
            <Typography component={'h5'} className={classes.date}>
              {moment(date).format('MMM DD[,]YYYY')}
            </Typography>
          </div>
          <div className={classes.contentRoot}>
            <Typography className={classes.content}>{content}</Typography>
          </div>
        </Box>
      )}
    </div>
  )
}

const TabPanelSkeleton = () => {
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
    >
      <Box>
        <div className={classes.titleLine}>
          <Typography component={'h4'} className={classes.title}>
            <Skeleton width={'calc(100% - 20px)'} />
          </Typography>
          <Typography component={'h5'} className={classes.date}>
            <Skeleton width={'80px'} />
          </Typography>
        </div>
        <div className={classes.contentRoot}>
          <Skeleton width={'100%'} height={'220px'} />
        </div>
      </Box>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  cardRoot: {
    
  },
  tabRoot: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: '6px'
  },
  tabBtn: {
    borderBottom: `2px solid ${theme.palette.text.disabled}`,
    height: '6px',
    minHeight: '6px',
    margin: '0 4px',
    minWidth: 'inherit',
    '&.Mui-selected': {
      borderColor: theme.palette.primary.main,
    }
  },
  content: {
    fontSize: 14,
  },    
  contentRoot: {
    height: 185,
    background: `url(${NewsBgImage}) no-repeat bottom right`,
    backgroundSize: '50px 50px',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 'calc(100% - 100px)'
  },
  titleLine: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 4,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  }
}))
