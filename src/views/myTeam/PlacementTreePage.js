import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "./placementTree/SearchBar";
import SearchedTable from "./placementTree/SearchedTable";
import PlacementTreeTable from "./placementTree/EnrollerTable";

export default function UnileveTreePage() {
  const [tableMode, setTableMode] = useState("unilevel_tree"); // unilevel_tree/searched
  const [searchParam, setSearchParam] = useState({
    user_id: '',
    username: '',
    title: '',
  });
  const [currentUserId, setCurrentUserId] = useState("");

  const goUser = (user) => {
    setTableMode("unilevel_tree");
    setCurrentUserId(user.id);
  };

  const handleSearch = (searchParam_) => {
    setSearchParam(searchParam_);
    setTableMode("searched");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SearchBar
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          handleSearch={handleSearch}
        />
        {tableMode == "unilevel_tree" && (
          <PlacementTreeTable userId={currentUserId} goUser={goUser} />
        )}
        {tableMode == "searched" && (
          <SearchedTable searchParam={searchParam} goUser={goUser} />
        )}
      </Grid>
    </Grid>
  );
}
