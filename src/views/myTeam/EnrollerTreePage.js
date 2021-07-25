import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
} from "@material-ui/core";
import SummaryCard from "./enrollerTree/SummaryCard";
import SearchBar from "./enrollerTree/SearchBar";
import SearchedTable from './enrollerTree/SearchedTable'
import EnrollerTable from './enrollerTree/EnrollerTable'
import { callGetApiWithAuth } from 'utils/api'

export default function EnrollerTreePage (props){
  const [tableMode, setTableMode] = useState('unilevel_tree') // unilevel_tree/searched
  const [searchParam, setSearchParam] = useState({
    user_id: '',
    username: '',
    title: '',
    level: ''
  })
  const [currentUserId, setCurrentUserId] = useState('')
  const [stat, setStat] = useState(undefined)

  const exportCsv = () => {
    callGetApiWithAuth('myteam/export', onGetExportUrl)
  }

  const onGetExportUrl = (data) => {
    if (data.success && data.data) {
      window.open(data.data, '_blank')
    }
  }
  
  const goUser = (user) => {
    setTableMode('unilevel_tree')
    setCurrentUserId(user.id)
  }

  const handleSearch = (searchParam_) => {
    setSearchParam(searchParam_)
    setTableMode('searched')
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SummaryCard />
      </Grid>
      <Grid item xs={12}>
        <SearchBar 
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          handleSearch={handleSearch}
        />
        {tableMode=='unilevel_tree' &&
          <EnrollerTable 
            userId={currentUserId}
            goUser={goUser}
          />
        }
        {tableMode=='searched' && 
          <SearchedTable
            searchParam={searchParam}
            goUser={goUser}
          />          
        }
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    overflow: 'visible'
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
    minWidth: 92,
  },
  userLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  dataCell: {
    '& .MuiTableCell-root': {
      padding: '5.5px 16px',
    }
  }
}));
