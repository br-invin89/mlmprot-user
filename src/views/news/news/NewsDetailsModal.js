import React from "react";
import { Modal, Typography, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NoData from "components/NoData";

export default function EditProductModal({ details, closeModal }) {
  const classes = useStyles();
  return details ? (
    <Modal open={details} onClose={closeModal} className={classes.modal}>
      <Fade in={details}>
        <div className={classes.modalRoot}>
          <Typography className={classes.title}>Content</Typography>
          <div className={classes.contentD}>
            {details?.content ? (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: details?.content,
                }}
              />
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  ) : (
    ""
  );
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: "absolute",
    width: 600,
    maxHeight: '700px',
    // overflowY: 'auto',
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: "5px",
    padding: theme.spacing(2, 4, 3),
    top: `100px`,
    left: `calc(50% - 315px)`,
    transform: `translate(-100px, -50% + 100px)`,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      left: 0,
    },
    outline: "none",
    
  },
  title: {
    fontWeight: 600,
    fontSize: 22,
  },

  content: {
    overflowY: 'auto',
    maxHeight: '675px',
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    "& p": {
      marginBottom: 0,
    },
  },
}));
