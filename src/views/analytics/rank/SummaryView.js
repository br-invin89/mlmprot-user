import React, { useEffect, useState } from "react";
import useStyles from "./SummaryView.style";
import { callGetApiWithAuth } from "utils/api";
import Card from "components/cards/Card";
import ComplanImg from "assets/images/company/complan_new.png";
import { CircularProgress } from "@material-ui/core";

export default function SummaryView(props) {
  const classes = useStyles();
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onGetRanks = (data) => {
    setIsLoading(false);
    const userData = data.data;
    setUserData(userData);
  };
  const getRanks = () => {
    setIsLoading(true);
    callGetApiWithAuth("ranks", onGetRanks, () => setIsLoading(false));
  };

  useEffect(() => {
    getRanks();
  }, []);

  return (
    <div className={classes.root}>
      <Card className={classes.cardRoot}>
        {isLoading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={36} />
          </div>
        ) : (
          <div>
            <div className={classes.lineRoot}>
              <label>Current Rank:</label>
              <span>{userData ? userData.rank.name : "-"}</span>
            </div>
            <div className={classes.lineRoot}>
              <label>Next Rank:</label>
              <span>{userData ? userData.next_rank.name : "-"}</span>
            </div>
            <div className={classes.lineRoot}>
              <label>What's Needed For Next Rank:</label>
              <br />
              {userData && userData.next_rank.id == 2 ? (
                <>
                  <p>{`${userData.qualification.am} out of 1 active members`}</p>
                  <p>{`${userData.qualification.pv} / 50PV`}</p>
                </>
              ) : (
                ""
              )}
              {userData && userData.next_rank.id == 3 ? (
                <>
                  <p>{`${userData.qualification.am} out of 2 active members`}</p>
                  <p>{`${userData.qualification.pv} / 90PV`}</p>
                </>
              ) : (
                ""
              )}
              {userData && userData.next_rank.id == 4 ? (
                <>
                  <p>{`${userData.qualification.am} out of 3 active members`}</p>
                  <p>{`${userData.qualification.pv} / 155PV`}</p>
                  <p>{`${userData.qualification.gv} / 15,000GV`}</p>
                  <p>{`${userData.qualification.leg_7k5} out of 1 leg with 7,500GV`}</p>
                  <p>{`${userData.qualification.leg_2k5} out of 2 legs with 2,500GV`}</p>
                </>
              ) : (
                ""
              )}
              {userData && userData.next_rank.id == 5 ? (
                <>
                  <p>{`${userData.qualification.am} out of 4 active members`}</p>
                  <p>{`${userData.qualification.pv} / 235PV`}</p>
                  <p>{`${userData.qualification.gv} / 50,000GV`}</p>
                  <p>{`${userData.qualification.leg_10k} out of 2 legs with 10,000GV`}</p>
                  <p>{`${userData.qualification.leg_25k} out of 1 leg with 25,000GV`}</p>
                </>
              ) : (
                ""
              )}
              {userData && userData.next_rank.id == 6 ? (
                <>
                  <p>{`${userData.qualification.am} out of 4 active members`}</p>
                  <p>{`${userData.qualification.pv} / 235PV`}</p>
                  <p>{`${userData.qualification.gv} / 100,000GV`}</p>
                  <p>{`${userData.qualification.leg_25k} out of 4 legs with 25,000GV`}</p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className={classes.lineRoot}>
              <label>Estimated Rank for the next month:</label>{" "}
              <span>{userData ? userData.next_month_rank.name : "-"}</span>
            </div>
            <img
              className={classes.descImage}
              src={ComplanImg}
              alt={"Qualification Requirements"}
            />
          </div>
        )}
      </Card>
      <div className={classes.transformWrapper}>
        {/*
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>              
              <TransformComponent>
                <img className={classes.descImage} src="https://bepic-assets.s3-us-west-2.amazonaws.com/BEPIC-qualifications.png" alt={'Qualification Requirements'} />
              </TransformComponent>
              <div className={classes.zoomTools}>
                <ZoomInIcon className={classes.iconStyle} color="primary" onClick={zoomIn} />
                <ZoomOutIcon className={classes.iconStyle} color="secondary" onClick={zoomOut} />
                <YoutubeSearchedForIcon className={classes.iconStyle} color="disabled" onClick={resetTransform} />
              </div>
            </React.Fragment>
          )}
        </TransformWrapper>
          */}
      </div>
    </div>
  );
}
