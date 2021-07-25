import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import useStyles from "./TreeNode.style";
import NoUserIcon from "assets/images/nophoto.jpg";
import AddIcon from "assets/icons/add-round.svg";
import { ReactComponent as ShowMoreIcon } from "assets/icons/eye.svg";
import { ReactComponent as BackIcon } from "assets/icons/back.svg";

const TreeNode = ({ nodeData, rankOptions, ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const nodeRef = useRef(null);
  const previousSearchingUserIds = useSelector(
    (state) => state.binaryTree.previousSearchingUserIds
  );
  const openDetail = () => {
    let position_ = nodeRef.current.getBoundingClientRect();
    let detailBoxPosition = {
      top: position_.top,
      left: position_.left + 135,
    };
    dispatch({
      type: "binaryTree.OPEN_DETAIL_BOX",
      payload: { detailBoxPosition, detailData: nodeData },
    });
  };
  const closeDetail = () => {
    dispatch({ type: "binaryTree.CLOSE_DETAIL_BOX" });
  };
  const openAddDialog = () => {
    
  };
  const showMore = (user_id) => {
    dispatch({ type: "binaryTree.SEARCH", payload: { user_id } });
  };
  const searchBack = () => {
    dispatch({ type: "binaryTree.SEARCH_BACK" });
  };

  return nodeData.is_empty ? (
    <>
      <div className={classes.emptyContainer} />
      {/* <AddButton onClick={openAddDialog} /> */}
    </>
  ) : (
    <div className={classes.container} ref={nodeRef}>
      {nodeData.level == 0 && previousSearchingUserIds.length > 0 && (
        <BackIcon
          className={classes.searchBackButton}
          onClick={() => searchBack()}
        />
      )}
      <div
        className={clsx(
          classes.coloredTopBorder,
          nodeData.type == 2 ? classes.coloredTopBorderForCustomer : ""
        )}
      ></div>
      <div
        className={classes.contentRoot}
        onMouseEnter={openDetail}
        onMouseLeave={closeDetail}
      >
        <div className={classes.photoWrapper}>
          <img className={classes.photo} 
            src={nodeData.image || NoUserIcon} 
          />
        </div>
        <Typography component={"p"} className={classes.username}>
          {nodeData.first_name + " " + nodeData.last_name}
        </Typography>
        <Typography component={"p"} className={classes.userid}>
          #{nodeData.uuid}
        </Typography>
        <Typography component={"p"} className={classes.userstatus}>
          {nodeData.username}
        </Typography>
        <Typography component={"p"} className={classes.userstatus}>
          Status:{" "}
          {nodeData.status === 2 ? (
            <Typography component={"span"} className={classes.activeStatus}>
              Active
            </Typography>
          ) : (
            <Typography component={"span"} className={classes.inactiveStatus}>
              Inactive
            </Typography>
          )}
        </Typography>
        <Typography component={"p"} className={classes.userstatus}>
          Rank:{" "}
          <Typography component={"span"} className={classes.userRank}>
            {nodeData.rank.name}
          </Typography>
        </Typography>
      </div>
      {/*
        ((!nodeData.children || nodeData.children.length==0) && !nodeData.hasChildren) && 
          <AddButton onClick={openAddDialog} />
        */}
      {!nodeData.children && nodeData.hasChildren && (
        <ShowMoreIcon
          className={classes.showMoreButton}
          onClick={() => showMore(nodeData.id)}
        />
      )}
    </div>
  );
};

export default TreeNode;
