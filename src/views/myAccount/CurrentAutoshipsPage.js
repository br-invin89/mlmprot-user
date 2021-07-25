import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { 
  CircularProgress, Snackbar, Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { callGetApiWithAuth, callPutApiWithAuth } from 'utils/api'
import ProductsGrid from './autoships/ProductsGrid'
import SelectField from 'components/inputs/SelectField'
import NoData from "components/NoData";
import EditProductModal from './autoships/EditProductModal'
import SettingForm from './autoships/SettingForm'

export default function CurrentAutoshipsPage () {
  const history = useHistory()
  const classes = useStyles()
  const [listData, setListData] = useState(undefined)
  const [editingItem, setEditingItem] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [settingData, setSettingData] = useState({
    pay_type: 1
  })

  useEffect(() => {
    loadList()
    loadSetting()
  }, [])
  
  const onGetTableData = (data) => {
    setListData(data.data)
  }
  const openEdition = (item) => {
    setEditingItem(item)
  }
  const closeEdition = () => {
    setEditingItem(undefined)
  }
  const loadList = () => {
    setListData(undefined)
    callGetApiWithAuth('autoships/autoships', onGetTableData)
  }
  const afterSuccessUpdate = (message) => {
    loadList()
    setSuccessMessage(message)
  }
  const goAddPage = () => {
    history.push('/autoship/create-autoship')
  }
  const loadSetting = () => {
    callGetApiWithAuth('autoship_setting/setting', onGetSettingData)
  }
  const onGetSettingData = (data) => {
    setSettingData({
      ...settingData,
      pay_type: data.data.pay_type,
    })
  }
  const onChangePayType = (pay_type) => {
    const settingData_ = {
      ...settingData,
      pay_type,
    }
    setSettingData(settingData_)
    callPutApiWithAuth('autoship_setting/setting', settingData_, onSettingUpdate)
  }
  const onSettingUpdate = (data) => {
    setSuccessMessage(data.message)
  }

  return (
    <div className={classes.container}>
      <div className={classes.actionRoot}>
        <SettingForm />
        <Button onClick={goAddPage} variant={'contained'} color={'primary'}>
          Add Autoship
        </Button>
      </div>
      {listData ? (
        <ProductsGrid
          listData={listData}
          openEdition={openEdition}
          afterSuccessUpdate={afterSuccessUpdate}
          onError={errMesssage=>setErrorMessage(errMesssage)}
        />
      ) : (
        <div className={classes.loadingRoot}>
          <CircularProgress size={48} />
        </div>
      )}
      {
        listData?.length === 0 && <NoData />
      }
      <EditProductModal
        data={editingItem}
        closeEdition={closeEdition}
        afterSuccessUpdate={afterSuccessUpdate}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={successMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == 'timeout') setSuccessMessage(undefined)
        }}
      >
        <Alert
          severity='success'
          variant='filled'
          onClose={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorMessage}
        autoHideDuration={2000}
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

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minHeight: 400,    
  },
  actionRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  loadingRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
}))
