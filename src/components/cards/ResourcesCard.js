import React from "react";
import clsx from "clsx";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import TextField from "components/inputs/TextField";
import SelectField from "components/inputs/SelectField";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

export default ({ children, className }) => {
  const classes = useStyles();
  const [value, setValues] = React.useState("");
  const [sort, setSort] = React.useState("All");

  const handleChange = (e) => {
    setValues(e.target.value);
  };
  const handleSearch = () => {
    //TODO implement search api
  };
  return (
    <Card className={clsx(classes.card, className)}>
      <CardContent className={classes.content}>
        <Typography component="h2" className={classes.title}>
          Search resources
        </Typography>
        <div className={classes.actions}>
          <form onSubmit={handleSearch}>
            <div>
              <TextField
                placeholder="Serch Resources…"
                name="search"
                className={classes.input}
                value={value}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                className={clsx(classes.btn, classes.submitBtn)}
              >
                <SearchIcon />
              </Button>
            </div>
          </form>
          <div className={classes.sortRoot}>
            <label className={classes.label}>Sort by:</label>
            <SelectField
              name="sort"
              value={sort}
              className={classes.select}
              onChange={(e) => setSort(e.target.value)}
              options={[{ label: "All", value: "all" }]}
            />
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 10px #E5E9F2",
    borderRadius: 5,
  },
  content: {
    padding: theme.spacing(3),
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 14,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #CED2DA",
    borderRadius: 5,
    width: 340,
  },
  submitBtn: {
    marginLeft: theme.spacing(2),
  },
  select: {
    width: 134,
  },
  sortRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 10,
  },
}));
