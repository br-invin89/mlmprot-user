import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TicketsTable from './TicketsTable'
import CreateTicketModal from './CreateTicketModal'

const SupportPage = () => {
  const [isOpenedCreate, setIsOpendCreate] = useState(false)
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [shouldLoad, setShouldLoad] = useState(true)
  const afterSuccessUpdate = (message) => {
    setIsOpendCreate(false)
    setShouldLoad(true)
    setSuccessMessage(message)
  }

  return (
    <>
      <TicketsTable openCreate={()=>setIsOpendCreate(true)} 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
      />
      {isOpenedCreate && 
        <CreateTicketModal
          closeModal={()=>setIsOpendCreate(false)}
          afterSuccessUpdate={afterSuccessUpdate}
          onError={errMessage=>setErrorMessage(errMessage)}
        />
      }
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
    </>
  )
}

export default SupportPage
