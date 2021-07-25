import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import WebsiteCard from "./corporateWebsite/WebsiteCard";
import WebsiteCardNotification from "./corporateWebsite/WebsiteCardNotification";
import WebsiteCardSkeleton from "./corporateWebsite/WebsiteCard.skeleton";
import { callGetApiWithAuth } from "utils/api";

export default function BepicWebsitesPage() {
  const [data, setData] = useState({
    image: "",
  });
  const myUser = useSelector((state) => state.auth.user);
  let isPlacementIdNull = myUser && myUser.placement_id === null ? true : false;
  return (
    <>
      <WebsiteCardNotification isPlacementIdNull={isPlacementIdNull} />
      {!isPlacementIdNull && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            {data ? <WebsiteCard data={data} /> : <WebsiteCardSkeleton />}
          </Grid>
        </Grid>
      )}
    </>
  );
}
