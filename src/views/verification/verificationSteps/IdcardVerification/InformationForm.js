import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { Select } from 'ui/components'
// import {
//   Container, Form, FormGroup, Legend,
//   Label, FormInput,
//   DayInput, MonthInput, YearInput,
//   GenderSelect,
// } from './InformationForm.styled'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import SelectField from "components/inputs/SelectField";
import TextField from 'components/inputs/TextField'

const InformationForm = (props) => {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    FirstGivenName: '', FirstSurName: '', 
    DayOfBirth: '', MonthOfBirth: '', YearOfBirth: '',
    Gender: ''
  })
  const myUser = useSelector(state=>state.auth.user)

  useEffect(() => {
    if (!myUser) return
    const formData_ = {
      ...formData,
      FirstGivenName: myUser.first_name, FirstSurName: myUser.last_name,
    }
    setFormData(formData_)
  }, [myUser])
  const onChangeFormData = (field, value) => {
    let formData_ = {...formData}
    formData_[field] = value
    setFormData(formData_)
    props.onChangeFormData(formData_)
  }

  return (
    <Grid container direction={'column'} spacing={2}>
      <h4>Your Personal Information</h4>
      <Grid item justify='space-between' 
        alignItems={'center'}
        className={classes.formRow}>
        <TextField 
          label={'First Given Name'}
          size={'small'}
          value={formData['FirstGivenName']} 
          onChange={e=>onChangeFormData('FirstGivenName', e.target.value)}
        />
      </Grid>
      <Grid item justify='space-between' 
        alignItems={'center'}
        className={classes.formRow}
      >
        <TextField 
          label={'First Sur Name'}
          size={'small'}
          value={formData['FirstSurName']} 
          onChange={e=>onChangeFormData('FirstSurName', e.target.value)}
        />
      </Grid>
      <Grid item container 
        alignItems={'center'}
        className={classes.formRow}
      >
        <TextField 
          label={'M'}
          size={'small'}
          value={formData['MonthOfBirth']}
          onChange={e=>onChangeFormData('MonthOfBirth', e.target.value)}
          style={{ width: 60 }}
        />
        &nbsp;/&nbsp;
        <TextField 
          label={'D'}
          size={'small'}
          value={formData['DayOfBirth']}
          onChange={e=>onChangeFormData('DayOfBirth', e.target.value)}
          style={{ width: 60 }}
        />
        &nbsp;/&nbsp;
        <TextField 
          label={'Y'}
          size={'small'}
          value={formData['YearOfBirth']}
          onChange={e=>onChangeFormData('YearOfBirth', e.target.value)}
          style={{ width: 80 }}
        />          
      </Grid>
      <Grid item justify='space-between' 
        alignItems={'center'}
        className={classes.formRow}
      >
        <SelectField 
          label={'Gender'}
          size={'small'}
          value={formData['Gender']} 
          onChange={v=>onChangeFormData('Gender', v)}
          options={[
            { value: 'M', label: 'Man' },
            { value: 'W', label: 'Woan' },
          ]}
          style={{ width: 120 }}
        />
      </Grid>
    </Grid>
  )
}

export default InformationForm

const useStyles = makeStyles((theme) => ({
  formRow: {

  }
}))
