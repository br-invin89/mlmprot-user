import React, { useState } from "react";
import { Collapse, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default ({ content, minCollapseHeight = 60, subStringLimit = 150 }) => {
  const [showExpanded, toggleAccordion] = useState(false);
  const classes = useStyle();
  return (
    <Collapse in={showExpanded} collapsedHeight={minCollapseHeight}>
      <Typography component='p' className={classes.postContent}>
        {showExpanded
          ? `${content} `
          : `${content.substring(0, subStringLimit)}... `}
        <Typography
          component='span'
          className={classes.toggleElements}
          onClick={() => toggleAccordion(!showExpanded)}
        >
          {showExpanded ? "See less" : "See more..."}
        </Typography>
      </Typography>
    </Collapse>
  );
};

const useStyle = makeStyles((theme) => ({
  postContent: {
    fontSize: 14,
    fontWeight: "normal",
    color: theme.palette.text.primary,
    marginTop: 10,
    marginBottom: 13,
  },
  toggleElements: {
    fontSize: 14,
    color: theme.palette.primary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
