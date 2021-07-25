import React, { useState, useEffect } from 'react'
import { CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth } from 'utils/api'
import OrganizationChart from '@dabeng/react-orgchart'
import TreeNode from './TreeNode'
import DetailBox from './DetailBox'
import SearchBar from './SearchBar'

export default function TreeView ({ treeData, loadRoot, loadParent, search, isLoading }) {
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [rankOptions, setRankOptions] = useState([])

  useEffect(() => {
    loadRank()
  }, [])

  const loadRank = () => {
    callGetApiWithAuth('common/ranks', onGetRank, onFailRank)
  }
  const onGetRank = (data) => {
    setRankOptions(data.data)
  }
  const onFailRank = () => {
  }

  return (
    <div className={classes.container}>
      {treeData &&
        <>
          <SearchBar treeData={treeData} 
            loadRoot={loadRoot}
            loadParent={loadParent}
            search={search}
            setErrorMessage={setErrorMessage}
          />
          <OrganizationChart
            datasource={treeData}
            pan={true}
            zoom={true}
            collapsible={false}
            draggable={false}
            NodeTemplate={(props) => <TreeNode rankOptions={rankOptions} {...props}/>}
          />
          <DetailBox rankOptions={rankOptions}/>           
        </>
      }
      {isLoading &&
      <div className={classes.loadingRoot}>
        <CircularProgress size={48} />
      </div>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorMessage}
        autoHideDuration={6000}
        onClose={(e, r) => {
          if (r == 'timeout') setErrorMessage(undefined)
        }}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    position: 'relative',
    paddingTop: 100,
    minHeight: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .orgchart-container': {
      backgroundColor: 'transparent',
      border: '0 none',
      height: 'calc(100vh - 75px)',
      width: '100%',
    },
    '& .orgchart': {
      backgroundImage: 'none',
      cursor: 'move !important',
      '& > ul > li > ul li': {
        '&::before': {
          border: '1px solid rgba(53, 64, 82, 0.25)'
        },
        '& > .oc-node': {
          '&::before': {
            backgroundColor: 'rgba(53, 64, 82, 0.25)'
          }
        }
      },
      '& ul': {
        '& li': {
          '& .oc-node': {
            '&:hover, &:focus, &:active, &.selected': {
              backgroundColor: 'transparent'
            }        
          }
        }
      }
    },
    '& .orgchart ul li .oc-node:not(:only-child)::after': {
      backgroundColor: 'rgba(53, 64, 82, 0.25)',
    }
  },
  loadingRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
