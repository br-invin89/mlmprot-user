import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@material-ui/core";
import moment from "moment";
import useStyles from "./DetailBox.style";
import NoPhotoIcon from "assets/images/nophoto.jpg";

const DetailBox = ({ rankOptions }) => {
  const classes = useStyles();
  const isOpenedDetailBox = useSelector(
    (state) => state.binaryTree.isOpenedDetailBox
  );
  const detailBoxPosition = useSelector(
    (state) => state.binaryTree.detailBoxPosition
  );
  const detailData = useSelector((state) => state.binaryTree.detailData);
  
  if (!isOpenedDetailBox) return "";

  return (
    <div
      className={classes.container}
      style={{
        left: detailBoxPosition.left || 0,
        top: detailBoxPosition.top || 0,
      }}
    >
      <div className={classes.headerBar}>
        <img
          className={classes.photo}
          src={detailData.image ? detailData.image : NoPhotoIcon}
        />
        <Typography className={classes.name} component={"p"}>
          {detailData.first_name + " " + detailData.last_name}
        </Typography>
        {/* <UsernameWrapper>
          <UsernameLabel>Username:&nbsp;</UsernameLabel>
          <Username>{detailData.username}</Username>
        </UsernameWrapper> */}
        <Typography className={classes.userLink} component={"p"}>
          {detailData.uuid}
        </Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.th}>&nbsp;</TableCell>
              <TableCell className={classes.th}></TableCell>
              <TableCell className={classes.th}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.td}>Rank:</TableCell>
              <TableCell className={classes.td}>
                {detailData.qualification
                  ? detailData.qualification.left_customers
                  : ""}
              </TableCell>
              <TableCell className={classes.td}>
                {detailData.rank_id
                  ? rankOptions?.filter((el) => el.id === detailData.rank_id)[0]
                      .name
                  : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.td}>Customers:</TableCell>
              <TableCell className={classes.td}>
                {detailData.qualification
                  ? detailData.qualification.left_customers
                  : ""}
              </TableCell>
              <TableCell className={classes.td}>
                {detailData?.customers}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.td}>Affiliate:</TableCell>
              <TableCell className={classes.td}>
                {detailData.qualification
                  ? detailData.qualification.left_brand_partners
                  : ""}
              </TableCell>
              <TableCell className={classes.td}>
                {detailData?.affiliates}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.td}>GV:</TableCell>
              <TableCell className={classes.td}>
                {detailData.qualification
                  ? detailData.qualification.left_cv
                  : ""}
              </TableCell>
              <TableCell className={classes.td}>
                {detailData.qualification ? detailData.qualification.gv : ""}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            {/*
              <TableRow>
                <TableCell className={classes.tf} colSpan={2}>Join Date: {moment(detailData.joinedDate).format('M/D/YYYY')}</TableCell>
              </TableRow>
              */}
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailBox;
