import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "components/inputs/TextField";

export default function UserForm(props) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    first_name: '', last_name: '',
    email: '', phone: '', username: '',
    password: '', password_confirm: ''
  })

  const onFormData = (e) => {
    let formData_ = { ...formData, 
      [e.target.name]: e.target.value
    }
    setFormData(formData_)
    props.setUserData({...props.userData, ...formData_})
  }

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.userData,
    })
    
  }, [props.userData])

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>First Name</label>
        <TextField
          value={formData.first_name}
          onChange={onFormData}
          name="first_name"
          variant="filled"
          size="small"
          fullWidth
          placeholder="First Name"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Last Name</label>
        <TextField
          value={formData.last_name}
          onChange={onFormData}
          name="last_name"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Last Name"
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12} direction="column">
        <label className={classes.formLabel}>Username</label>
        <TextField
          value={formData.username}
          onChange={onFormData}
          name="username"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Username"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Email</label>
        <TextField
          value={formData.email}
          onChange={onFormData}
          name="email"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Email"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Phone</label>
        <TextField
          value={formData.phone}
          onChange={onFormData}
          name="phone"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Phone"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Password</label>
        <TextField
          value={formData.password}
          onChange={onFormData}
          name="password"
          variant="filled"
          size="small"
          type="password"
          fullWidth
          placeholder="Password"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Confirm Password</label>
        <TextField
          value={formData.password_confirm}
          onChange={onFormData}
          name="password_confirm"
          variant="filled"
          size="small"
          type="password"
          fullWidth
          placeholder="Confirm Password"
        />
      </Grid>      
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 14,
  },
  formLabel: {
    display: "block",
    color: theme.palette.text.disabled,
    fontWeight: 500,
    marginBottom: 3,
  },
}));
