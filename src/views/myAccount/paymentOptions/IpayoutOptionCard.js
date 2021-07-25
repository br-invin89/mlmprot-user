import React, { useEffect, useState } from "react";
import Card from "components/cards/Card";
import {
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
} from "@material-ui/core";
import TextField from 'components/inputs/TextField';
import { makeStyles } from "@material-ui/styles";
import { callPostApiWithAuth } from "utils/api";

export default function PaymentOptionCard ({ provider, selectedProviderId, afterActive, afterCreate, onErrorMessage }) {
  const classes = useStyles();
  // const [account, setAccount] = useState('')
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCreate = () => {
    setIsUpdating(true);
    callPostApiWithAuth(
      `payout_settings/${provider.id}/create_account`,
      {}, 
      onDoneCreateAccount, 
      onFailCreateAccount
    );
  }

  const onDoneCreateAccount = () => {
    setIsUpdating(false)
    afterCreate();
  }

  const onFailCreateAccount = (errMessage) => {
    setIsUpdating(false)
    onErrorMessage(errMessage)
  }

  const handleActive = () => {
    // if (!account) {
    //   onErrorMessage('Please input merchant reference id of your ipayout account')
    //   return
    // }
    setIsUpdating(true);
    callPostApiWithAuth(
      `payout_settings/${provider.id}/update`,
      { form_info: provider.form_info, account: provider.account },
      onDoneSaveProvider,
      () => setIsUpdating(false)
    );
  };
  const onDoneSaveProvider = () => {
    setIsUpdating(false);
    afterActive();
  };

  useEffect(() => {
    // setAccount(provider.account)
  }, [])

  return (
    <Card>
      <Typography component={"h2"} className={classes.title}>
        Payment Option
      </Typography>
      <Typography component={"h3"}>
        <Radio checked={selectedProviderId == provider.id} />
        {provider.name}
      </Typography>
      <Typography
        component={"p"}
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: provider.description_html }}
      />
      {/* <div className={classes.formRoot}>
        <label>Member Reference ID:</label>
        <TextField
          value={provider.account}
          className={classes.accountInput}
          disabled
        />
      </div> */}
      <div className={classes.actionGroup}>
        {provider.account?
          <Button
            variant="contained"
            color="primary"
            onClick={handleActive}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        :
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
        }
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {},
  subtitle: {},
  image: {
    height: 26,
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    "& p": {
      marginBottom: 0,
    },
  },
  actionGroup: {
    display: "flex",
    marginTop: 10,
  },
  poweredText: {
    display: 'flex',
    alignItems: 'center'
  },
  formRoot: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 12,
  },
  accountInput: {
    marginLeft: 12,
    width: '160px'
  }
}));
