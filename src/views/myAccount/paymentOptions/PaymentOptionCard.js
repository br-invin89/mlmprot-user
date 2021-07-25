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
import { makeStyles } from "@material-ui/styles";
import { callPostApiWithAuth } from "utils/api";

export default function PaymentOptionCard ({ provider, selectedProviderId, afterActive }) {
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleActive = () => {
    setIsUpdating(true);
    callPostApiWithAuth(
      `payout_settings/${provider.id}/update`,
      { form_info: provider.form_info },
      onDoneSaveProvider,
      () => setIsUpdating(false)
    );
  };
  const onDoneSaveProvider = () => {
    setIsUpdating(false);
    afterActive();
  };

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
      <div className={classes.actionGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleActive}
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={24} /> : "Save"}
        </Button>
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
  }
}));
