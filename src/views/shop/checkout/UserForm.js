import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "components/inputs/TextField";

export default ({ userData }) => {
  const classes = useStyles();
  return (
    userData?
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>First Name</label>
        <TextField
          value={userData.first_name}
          disabled
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
          value={userData.last_name}
          disabled
          name="last_name"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Last Name"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Email</label>
        <TextField
          value={userData.email}
          disabled
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
          value={userData.phone}
          disabled
          name="phone"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Phone"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} direction="column">
        <label className={classes.formLabel}>Username</label>
        <TextField
          value={userData.username}
          disabled
          name="username"
          variant="filled"
          size="small"
          fullWidth
          placeholder="Username"
        />
      </Grid>
    </Grid>
    : ''
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
