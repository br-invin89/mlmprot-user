import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const allFilters = [
  { label: "All Posts", value: "all" },
  { label: "My Posts", value: "mine" },
  { label: "Favorite", value: "favorite" },
  { label: "System", value: "system" },
];

export default ({ selectedFilter, setFilter }) => {
  const classes = useStyle();
  return (
    <ButtonGroup color='primary' className={classes.filtersGroup}>
      {allFilters.map(({ label, value }) => (
        <Button
          className={[
            classes.filterItem,
            selectedFilter === value ? classes.selectedFilter : {},
          ]}
          onClick={() => setFilter(value)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

const useStyle = makeStyles((theme) => ({
  filtersGroup: {
    height: "32px",
    width: "100%",
    display: "flex",
  },
  filterItem: {
    flex: 1,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    textTransform: "initial",
    fontSize: "14px",
    fontWeight: "normal",
  },
  selectedFilter: {
    color: theme.palette.text.primaryInverted,
    backgroundColor: theme.palette.primary.main,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
