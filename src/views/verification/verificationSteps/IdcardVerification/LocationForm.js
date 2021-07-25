import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { Select } from 'ui/components'
// import {
//   Container, Form, FormGroup, Legend,
//   Label, FormInput, CountrySelect
// } from './InformationForm.styled'
import { Grid, Box } from '@material-ui/core'
import SelectField from "components/inputs/SelectField";
import TextField from 'components/inputs/TextField'

const LocationForm = (props) => {
  const myUser = useSelector(state=>state.auth.user)
  const [formData, setFormData] = useState({
    Country: '', City: '', StreetName: '', 
    BuildingNumber: '', PostalCode: ''
  })

  useEffect(() => {
    if (!myUser) return 
    const formData_ = {
      ...formData,
      Country: myUser.cc_country, StreetName: myUser.cc_address,
      PostalCode: myUser.cc_zipcode
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
      <h4>Your Location</h4>
      <Grid item justify='space-between'>
        <TextField 
          label='Country'
          size={'small'}
          value={formData['Country']}
          disabled
        />
      </Grid>
      <Grid item justify='space-between'>
        <TextField 
          label='City'
          size={'small'}
          value={formData['City']} 
          onChange={e=>onChangeFormData('City', e.target.value)}
        />
      </Grid>
      <Grid item justify='space-between'>
        <TextField 
          label='Street Name'
          size={'small'}
          value={formData['StreetName']} 
          onChange={e=>onChangeFormData('StreetName', e.target.value)}
        />
      </Grid>
      <Grid item justify='space-between'>
        <TextField 
          label='Building Number'
          size={'small'}
          value={formData['BuildingNumber']} 
          onChange={e=>onChangeFormData('BuildingNumber', e.target.value)}
        />
      </Grid>
      <Grid item justify='space-between'>
        <TextField 
          label='Postal Code'
          size={'small'}
          value={formData['PostalCode']} 
          onChange={e=>onChangeFormData('PostalCode', e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default LocationForm
