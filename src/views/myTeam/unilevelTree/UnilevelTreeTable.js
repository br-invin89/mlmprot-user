import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import TableCard from "components/cards/TableCard";

import SearchIcon from "@material-ui/icons/Search";
import TextField from "components/inputs/TextField";
import { asPrice, asDate } from "utils/text";
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import NoData from "components/NoData";

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "join_date", label: "Join Date" },
  { id: "rank", label: "Rank" },
  { id: "ibo_kit", label: "IBO Kit" },
  { id: "level", label: "Level" },
  { id: "pv", label: "PV" },
  { id: "psv", label: "PSV" },
  { id: "prsv", label: "PRSV" },
  { id: "total_gv", label: "Total GV" },
  { id: "total_customer_gv", label: "Total Customer GV" },
  { id: "fifty_five_gv", label: "55/45 GV" },
  { id: "placement_sponser", label: "Placement Sponsor" },
];

const UnilevelTreeTable = () => {
  const classes = useStyles();
  // const [tableData, setTableData] = useState([
  //   {
  //     id: 12,
  //     name: "Ali",
  //     type: 1,
  //     join_date: "2020-10-25",
  //     rank: 3,
  //     ibo_kit: 10,
  //     level: 5,
  //     pv: 14,
  //     psv: 23,
  //     prsv: 0,
  //     total_gv: 200,
  //     total_customer_gv: 153,
  //     gv_55_45: 22,
  //     placement_sponsor: "Joker",
  //   },
  //   {
  //     id: 15,
  //     name: "Boby",
  //     type: 1,
  //     join_date: "2020-10-25",
  //     rank: 3,
  //     ibo_kit: 10,
  //     level: 5,
  //     pv: 14,
  //     psv: 23,
  //     prsv: 0,
  //     total_gv: 200,
  //     total_customer_gv: 153,
  //     gv_55_45: 22,
  //     placement_sponsor: "Joker",
  //   },
  //   {
  //     id: 21,
  //     name: "Clark",
  //     type: 1,
  //     join_date: "2020-10-25",
  //     rank: 3,
  //     ibo_kit: 10,
  //     level: 5,
  //     pv: 14,
  //     psv: 23,
  //     prsv: 0,
  //     total_gv: 200,
  //     total_customer_gv: 153,
  //     gv_55_45: 22,
  //     placement_sponsor: "Joker",
  //   },
  // ]);
  const [parentPath, setParentPath] = useState([
    { id: 1, name: "John Doe" },
    { id: 3, name: "Simon" },
    { id: 8, name: "Puppy" },
  ]);
  const [searchParam, setSearchParam] = useState({
    user_id: "",
  });

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const handleSearch = (searchParam_) => {
    loadTableData(searchParam_, paginationParam);
  };

  const loadTableData = (searchParam_, paginationParam_) => {
    setIsLoading(true);
    var params = [];
    params["per_page"] = paginationParam_.perPage;
    params["page"] = paginationParam_.currentPage;
    params["uuid"] = searchParam_.user_id;

    var queryString = Object.keys(params)
      .filter((key) => params[key])
      .map((key) => key + "=" + params[key])
      .join("&");
    callGetApiWithAuth(
      "myteam/unilevel/table?" + queryString,
      onGetTableData,
      () => setIsLoading(false)
    );
  };

  const onGetTableData = (data) => {
    setIsLoading(false);
    setTableData(data.data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.data.current_page,
      total: data.data.total,
    });
  };

  const goPage = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    loadTableData(searchParam, paginationParam_);
  };

  useEffect(() => {
    loadTableData(searchParam, paginationParam);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableCard
          title="Unilevel Tree"
          paginationParams={paginationParam}
          onPageChange={goPage}
          // toolbar={
          //   <div>
          //     {parentPath.map((item, index) => (
          //       <>
          //         <span style={{ fontSize: 12, fontWeight: 300 }}>
          //           {index > 0 ? " > " : ""}
          //         </span>
          //         <a
          //           href={`#${item.id}`}
          //           key={index}
          //           style={{
          //             fontSize: 12,
          //             fontWeight: 300,
          //             textDecoration: "none",
          //           }}
          //         >
          //           {item.name}
          //         </a>
          //       </>
          //     ))}
          //   </div>
          // }
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                      className={classes.headCell}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  [...Array(10).keys()].map((index) => (
                    <TableRow key={index}>
                      <TableCell padding="none">
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    {tableData.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{`${row?.first_name} ${row?.last_name}`}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{asDate(row.created_at)}</TableCell>
                        <TableCell>{row.rank_id}</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>
                          {row.sponsor ? (
                            <Typography
                              component={"a"}
                              className={classes.userLink}
                              onClick={() => props.goUser(row.sponsor)}
                            >
                              {row.sponsor.username}
                            </Typography>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {tableData.length == 0 && (
                      <TableRow>
                        <TableCell colSpan={14}>
                          <NoData />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCard>
      </Grid>
    </Grid>
  );
};

export default UnilevelTreeTable;

const useStyles = makeStyles((theme) => ({
  earningRoot: {
    marginBottom: theme.spacing(3),
  },
  avatarRoot: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 13,
  },
  btn: {
    textTransform: "capitalize",
    minWidth: 92,
  },
  actionBtn: {
    width: 60,
  },
  btnMargin: {
    marginRight: 12,
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  btnEmail: {
    marginLeft: theme.spacing(3),
  },
  fieldMargin: {
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  },
  inputField: {
    width: 133,
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      width: 250,
      margin: "6px 6px",
    },
    "& .MuiInputLabel-outlined": {
      fontSize: 14,
    },
  },
  submitBtn: {
    marginLeft: theme.spacing(2),
    height: 38,
  },
}));
