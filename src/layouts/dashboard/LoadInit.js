import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { getUser } from 'utils/auth'
import { callGetApiWithAuth } from 'utils/api'
import { useTranslation } from 'react-i18next'

export default function LoadInit() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (getUser()) {
      let user = getUser()
      dispatch({ type: 'auth.SET_LOGGED_IN', payload: { user } })
      confirmUser(user)
      getCurrency()
    } else {
      history.push('/logout')
    }
  }, [])
  
  // should check that user still exists on db
  const confirmUser = (user) => {
    // let formData = {username: user.username, password}
  }
  const getCurrency = () => {
    callGetApiWithAuth('ui/currency', onGetCurrency, onFailCurrency)
  }
  const onGetCurrency = (data) => {
    const { name, symbol } = data.data
    dispatch({ type: 'ui.SET_CURRENCY', payload: {name, symbol} })
  }

  const onFailCurrency = (errMessage) => {
    history.push('/logout')
  }

  return (
    <Helmet>
      <title>Aluva Backoffice</title>
    </Helmet>
  )
}
