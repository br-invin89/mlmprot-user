import React from "react";
import Card from "components/cards/Card";
import { Divider, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Skeleton } from "@material-ui/lab";
import { ticketStatusText, ticketStatusStyle } from "config/var";
import { asDateTime } from "utils/text/text";

const TicketSummaryCard = (props) => {
  const classes = useStyles();
  return (
    <Card>
      <div className={classes.row}>
        {props.ticketInfo ? (
          <>
            <p style={{marginTop: 0}}>Requested:</p>
            <p style={{marginTop: 0}}>
              {props.ticketInfo?.requested_by === 2
                ? `${props.ticketInfo?.admin?.first_name} ${props.ticketInfo?.admin?.last_name}`
                : `${props.ticketInfo?.user?.first_name} ${props.ticketInfo?.user?.last_name}`}
            </p>
          </>
        ) : (
          <Skeleton width={"100%"} />
        )}
      </div>
      <div className={classes.row}>
        {props.ticketInfo ? (
          <>
            <p>Created:</p>
            <p>{asDateTime(props.ticketInfo.created_at)}</p>
          </>
        ) : (
          <Skeleton width={"100%"} />
        )}
      </div>
      <div className={classes.row}>
        {props.ticketInfo ? (
          <>
            <p>Last Activity:</p>
            <p>{asDateTime(props.ticketInfo?.last_activity?.created_at)}</p>
          </>
        ) : (
          <Skeleton width={"100%"} />
        )}
      </div>
      <Divider />
      <div className={classes.row}>
        {props.ticketInfo ? (
          <>
            <p>Ticket ID:</p>
            <p>{"#" + props.ticketInfo.uuid}</p>
          </>
        ) : (
          <Skeleton width={"100%"} />
        )}
      </div>
      <div className={classes.row}>
        {props.ticketInfo ? (
          <>
            <p style={{marginBottom: 0}}>Status:</p>
            <p style={{marginBottom: 0}}>
              <Chip
                className={classes.statusBadge}
                label={ticketStatusText(props.ticketInfo.status)}
                style={ticketStatusStyle(props.ticketInfo.status)}
              />
            </p>
          </>
        ) : (
          <Skeleton width={"100%"} />
        )}
      </div>
    </Card>
  );
};

export default TicketSummaryCard;

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    justifyContent: "space-between",
    "& p": {
      marginTop: 8,
      marginBottom: 8,
    },
  },
  statusBadge: {
    width: 100,
    height: 24,
    borderRadius: 4,
  },
}));
