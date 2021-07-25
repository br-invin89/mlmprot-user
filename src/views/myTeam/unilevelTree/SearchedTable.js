import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  TableSortLabel,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import useStyles from "./EnrollerTree.style";
import { Skeleton } from "@material-ui/lab";
import TableCard from "components/cards/TableCard";
import { callGetApiWithAuth } from "utils/api";
import { asKNumber, asDate } from "utils/text";
import NoData from "components/NoData";

const headCells = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "join_date", label: "Join Date" },
  { id: "rank", label: "Rank" },
  { id: "pv", label: "PV" },
  { id: "gv", label: "GV" },
  { id: "am", label: "AM" },
  { id: "leg_2k5", label: "Leg 2.5k" },
  { id: "leg_7k5", label: "Leg 7.5" },
  { id: "leg_10k", label: "Leg 10k" },
  { id: "leg_25k", label: "Leg 25k" },
];

export default function SearchedTable(props) {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadTableData = (paginationParam) => {
    setIsLoading(true);
    var params = [];
    params["uuid"] = props.searchParam["user_id"];
    params["username"] = props.searchParam["username"];
    params["created_at_range"] = props.searchParam["created_at_range"];
    params["per_page"] = paginationParam.perPage;
    params["page"] = paginationParam.currentPage;
    var q = Object.keys(params)
      .map((k) => k + "=" + params[k])
      .join("&");
    callGetApiWithAuth(
      `myteam/unilevel/search?${q}`,
      onGetTableData,
      onFailTableData
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

  const onFailTableData = () => {
    setIsLoading(false);
  };

  const goPage = (_, page) => {
    let paginationParam_ = { ...paginationParam, currentPage: page };
    loadTableData(paginationParam_);
  };

  useEffect(() => {
    let paginationParam_ = { ...paginationParam, currentPage: 1 };
    loadTableData(paginationParam_);
  }, [props.searchParam]);

  return (
    <TableCard
      title="Searched Results"
      paginationParams={paginationParam}
      onPageChange={goPage}
      className={classes.cardRoot}
    >
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.dataCell}>
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
                <TableRow key={index} className={classes.dataCell}>
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
                  <TableRow hover key={index} className={classes.dataCell}>
                    <TableCell>#{row.uuid}</TableCell>
                    <TableCell>
                      <div className={classes.avatarRoot}>
                        <Avatar
                          alt={row.first_name + " " + row.last_name}
                          src={row.image}
                          className={classes.avatar}
                        />
                        <Typography
                          component={"a"}
                          className={classes.userLink}
                          onClick={() => props.goUser(row)}
                        >
                          {row.first_name + " " + row.last_name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{row.type === 1?"Affiliate":row.type===2?"Customer":"Retail"}</TableCell>
                    <TableCell>{asDate(row.created_at)}</TableCell>
                    <TableCell>{row.rank ? row.rank.name : ""}</TableCell>
                    <TableCell>{row.qualification?.pv}</TableCell>
                    <TableCell>{row.qualification?.gv}</TableCell>
                    <TableCell>{row.qualification?.am}</TableCell>
                    <TableCell>{row.qualification?.leg_2k5}</TableCell>
                    <TableCell>{row.qualification?.leg_7k5}</TableCell>
                    <TableCell>{row.qualification?.leg_10k}</TableCell>
                    <TableCell>{row.qualification?.leg_25k}</TableCell>
                  </TableRow>
                ))}
                {tableData.length == 0 && (
                  <TableRow className={classes.dataCell}>
                    <TableCell colSpan={12}>
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
  );
}
