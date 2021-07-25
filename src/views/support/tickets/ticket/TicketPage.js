import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Snackbar } from "@material-ui/core";
import { Alert, Skeleton } from "@material-ui/lab";
import Card from "components/cards/Card";
import { callGetApiWithAuth } from "utils/api";
import TicketSummaryCard from "./TicketSummaryCard";
import MessageSection from "./MessageSection";
import MessagePostForm from "./MessagePostForm";

const TicketPage = () => {
  const { ticketId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [ticketData, setTicketData] = useState(undefined);
  const [ticketInfo, setTicketInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    loadTicket();
    loadTicketInfo();
  }, [ticketId]);

  const loadTicketInfo = () => {
    callGetApiWithAuth(`tickets/${ticketId}/info`, onGetTicketInfo);
  };
  const onGetTicketInfo = (data) => {
    setTicketInfo(data.data);
  };

  const loadTicket = () => {
    setIsLoading(true);
    callGetApiWithAuth(`tickets/${ticketId}`, onGetTicket, onFailTicket);
  };
  const onGetTicket = (data) => {
    setIsLoading(false);
    setTicketData(data.data);
  };

  const onFailTicket = () => {
    setIsLoading(false);
    setErrorMessage("Wrong ticket id");
    setTimeout(() => {
      history.push("/support");
    }, [500]);
  };
  return (
    <div className={classes.root}>
      <Card className={classes.leftSection}>
        <div>
          <h4>
            <Link to={"/support/tickets"}>Tickets</Link>&nbsp;&gt;&nbsp; Ticket #
            {ticketInfo?.uuid}
          </h4>
        </div>
        <div >
          <h4>{ticketInfo?.subject}</h4>
        </div>
        {ticketData && ticketData?.messages?.length > 0
          ? ticketData.messages.map((messageData) => (
              <MessageSection messageData={messageData} />
            ))
          : ""}
        <MessagePostForm
          ticketId={ticketId}
          loadTicket={loadTicket}
          loadTicketInfo={loadTicketInfo}
          onErrorMessage={setErrorMessage}
        />
      </Card>
      <div className={classes.rightSection}>
        <TicketSummaryCard ticketInfo={ticketInfo} />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == "timeout") setErrorMessage(undefined);
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TicketPage;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: 'column'
    },
  },
  leftSection: {
    width: "calc(100% - 340px)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  rightSection: {
    width: "320px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 15
    },
  },
}));
