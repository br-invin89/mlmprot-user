import React, { useState, useEffect } from "react";
import TableCard from "components/cards/TableCard";
import { Link } from 'react-router-dom'
import {
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import NoData from "components/NoData";
import { callGetApiWithAuth } from "utils/api";
import {
  ticketPriorityText,
  ticketPriorityStyle,
  ticketTypeText,
  ticketTypeStyle,
  ticketStatusText,
  ticketStatusStyle,
} from "config/var";

const TicketsTable = (props) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  useEffect(() => {
    if (props.shouldLoad) {
      handleSearch(paginationParam);
      props.setShouldLoad(false);
    }
  }, [props.shouldLoad]);
  const goPage = (_, page) => {
    const paginationParam_ = { ...paginationParam, currentPage: page };
    handleSearch(paginationParam_);
  };
  const handleSearch = () => {
    setIsLoading(true);
    callGetApiWithAuth(`tickets`, onGetTableData, onFailTableData);
  };
  const onGetTableData = (data) => {
    setIsLoading(false);
    setTableData(data.data);
  };
  const onFailTableData = (data) => {
    setIsLoading(false);
  };
  const headCells = [
    { id: "id", label: "Ticket ID" },
    { id: "date", label: "Date" },
    { id: "subject", label: "Subject" },
    { id: "type", label: "Type" },
    { id: "priority", label: "Priority" },
    { id: "status", label: "Status" },
  ];

  return (
    <TableCard
      title={"Tickets"}
      toolbar={
        <Button color="primary" variant="contained" onClick={props.openCreate}>
          Create
        </Button>
      }
      paginationParams={paginationParam}
      onPageChange={goPage}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell, i) => (
                <TableCell key={i} className={classes.headCell}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(15).keys()].map((i) => (
                <TableRow hover key={i}>
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
                {tableData &&
                  tableData.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>
                        <Link to={`/support/ticket/${row.id}`}>{row.uuid}</Link>
                      </TableCell>
                      <TableCell>
                        {moment(row.created_at).format("MM/DD/YY")}
                      </TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>
                        {ticketTypeText(row.type)}
                        {/* <Chip
                          className={classes.priorityBadge}
                          label={ticketTypeText(row.type)}
                          style={ticketTypeStyle(row.type)}
                        /> */}
                      </TableCell>
                      <TableCell>
                        {ticketPriorityText(row.priority)}
                        {/* <Chip
                          className={classes.priorityBadge}
                          label={ticketPriorityText(row.priority)}
                          style={ticketPriorityStyle(row.priority)}
                        /> */}
                      </TableCell>
                      <TableCell>
                        <Chip
                          className={classes.statusBadge}
                          label={ticketStatusText(row.status)}
                          style={ticketStatusStyle(row.status)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
            {tableData && tableData.length == 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableCard>
  );
};

export default TicketsTable;

const useStyles = makeStyles((theme) => ({
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  statusBadge: {
    width: 100,
    height: 24,
    borderRadius: 4,
  },
  priorityBadge: {
    width: 80,
    height: 24,
    borderRadius: 4,
  },
}));
