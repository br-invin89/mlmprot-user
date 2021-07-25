import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import TextField from "components/inputs/TextField";
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";

export default function CreditLogCard({ className, title }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [amount, setAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const suggestUser = (username) => {
    setUsername(username);
    /*
    if (username!='')
      callGetApiWithAuth(`common/search_downline/${username}`, onGetSuggestions)
    */
  };
  const onGetSuggestions = (data) => {
    setUserSuggestions(data.data);
  };
  const transfer = () => {
    if (!username) {
      setErrorMessage("Please input receiver username.");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      setErrorMessage(
        "Please input amount as price value and must be greater than 0"
      );
      return;
    }
    setIsTransferring(true);
    callPostApiWithAuth(
      "wallet/transfer",
      { amount, receiver: username },
      onSuccessTransfer,
      onFailTransfer
    );
  };
  const onSuccessTransfer = () => {
    setIsTransferring(false);
    setSuccessMessage("Transferred successfully.");
  };
  const onFailTransfer = (errMessage) => {
    setIsTransferring(false);
    setErrorMessage(errMessage);
  };
  const onSelectUser = (userId, username) => {
    // setReceiverId(userId)
    setUsername(username);
    setUserSuggestions([]);
  };

  return (
    <Card className={clsx(classes.card, className)}>
      {title && (
        <CardHeader
          title={title}
          classes={{
            title: classes.title,
          }}
        />
      )}
      <CardContent className={classes.cardContent}>
        <form>
          <Grid container>
            <Grid xs={12} md={12} lg={8}>
              <Grid container alignItems="center">
                <Grid xs={12} md={5} lg={4}>
                  <Typography className={classes.label}>
                    Receiver Username:
                  </Typography>
                </Grid>
                <Grid xs={12} md={5} lg={5} className={classes.suggestionOuter}>
                  <TextField
                    label="Username..."
                    variant="outlined"
                    size="small"
                    value={username}
                    onChange={(e) => suggestUser(e.target.value)}
                    className={classes.inputfield}
                  />
                  {/*
                  userSuggestions.length>0 &&
                    <div className={classes.suggestionWrapper}>
                      {userSuggestions.map(el => (
                        <p 
                          className={classes.suggestionItem} 
                          onClick={()=>onSelectUser(el.downliner.id, el.downliner.username)}
                        >
                          {el.downliner.username}
                        </p>
                      ))}                      
                    </div>
                  */}
                </Grid>
              </Grid>
              <Grid container alignItems="center" className={classes.marginTop}>
                <Grid xs={12} md={5} lg={4}>
                  <Typography className={classes.label}>Amount:</Typography>
                </Grid>
                <Grid xs={12} md={5} lg={5}>
                  <FormControl className={classes.receiverInput} size="small">
                    <OutlinedInput
                      variant="outlined"
                      id="outlined-adornment-amount"
                      type={"number"}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          className={classes.icon}
                        >
                          <Typography className={classes.label}>$</Typography>
                        </InputAdornment>
                      }
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.btn}
                    loading={isTransferring}
                    onClick={transfer}
                  >
                    {isTransferring ? <CircularProgress size={24} /> : "Send"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={errorMessage}
          autoHideDuration={2000}
          onClose={(e, r) => {
            if (r == "timeout") setErrorMessage("");
          }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={successMessage}
          autoHideDuration={2000}
          onClose={(e, r) => {
            if (r == "timeout") setSuccessMessage("");
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  cardContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: 34,
  },
  label: {
    fontWeight: 500,
  },
  receiverInput: {
    width: "100%",
  },
  icon: {
    color: "#C2C8D6",
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  btn: {
    padding: theme.spacing(0.8, 2),
    textTransform: "capitalize",
    backgroundColor: theme.palette.primary.dark,
    marginLeft: 8,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginTop: 12,
    },
  },
  suggestionOuter: {
    position: "relative",
  },
  suggestionWrapper: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 260,
    border: `1px solid ${theme.palette.border.panel}`,
    backgroundColor: theme.palette.background.panel,
    zIndex: 12,
    padding: "0 12px",
  },
  suggestionItem: {
    cursor: "pointer",
  },
  inputfield: {
    width: "100%",
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
}));
