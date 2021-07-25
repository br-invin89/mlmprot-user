import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Alert, Skeleton } from "@material-ui/lab";
import MailIcon from "@material-ui/icons/Mail";
import TableCard from "components/cards/TableCard";
import NoData from "components/NoData";
import SearchBar from "./searchBar/SearchBar";
import SendEmailDialog from "./sendEmail/SendEmailDialog";
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import { userTypeText, userStatusText } from "config/var";
import useStyles from "./ContactManagerPage.style";

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

export default function ContactManagerPage() {
  const classes = useStyles();
  const [contactsData, setContactsData] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [searchParam, setSearchParam] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    type: "",
    status: "",
  });
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 15,
    total: 0,
  });
  const [isOpenedSendEmail, setIsOpenedSendEmail] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailReceiver, setEmailReceiver] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    search(searchParam, paginationParam);
  }, []);
  const search = (searchParam_, paginationParam_) => {
    setIsLoadingList(true);
    var params = [];
    params["username"] = searchParam_.username;
    params["first_name"] = searchParam_.first_name;
    params["last_name"] = searchParam_.last_name;
    params["email"] = searchParam_.email;
    params["type"] = searchParam_.type;
    params["status"] = searchParam_.status;
    params["per_page"] = paginationParam_.perPage;
    params["page"] = paginationParam_.currentPage;
    var q = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    callGetApiWithAuth("contacts?" + q, onGetContacts, () =>
      setIsLoadingList(false)
    );
  };
  const onGetContacts = (data) => {
    setIsLoadingList(false);
    setContactsData(data.data.data);
    setPaginationParam({
      ...paginationParam,
      currentPage: data.data.current_page,
      total: data.data.total,
    });
  };
  const onSearch = (searchParam_) => {
    setSearchParam(searchParam_);
    search(searchParam_, { ...paginationParam, currentPage: 1 });
  };
  const goPage = (_, page) => {
    search(searchParam, { ...paginationParam, currentPage: page });
  };
  const exportCsv = () => {
    setIsExporting(true);
    var params = [];
    params["username"] = searchParam.username;
    params["first_name"] = searchParam.first_name;
    params["last_name"] = searchParam.last_name;
    params["email"] = searchParam.email;
    params["type"] = searchParam.type;
    params["status"] = searchParam.status;
    var q = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
    callGetApiWithAuth("contacts/export?" + q, onGetExportUrl, () =>
      setIsExporting(false)
    );
  };
  const onGetExportUrl = (data) => {
    setIsExporting(false);
    window.open(data.data.csv_file, "_blank");
  };
  const openSendEmailAll = () => {
    setIsOpenedSendEmail(true);
    setEmailReceiver("");
  };
  const openSendEmail = (email) => {
    setIsOpenedSendEmail(true);
    setEmailReceiver(email);
  };
  const closeSendEmail = () => {
    setIsOpenedSendEmail(false);
  };
  const sendEmail = (text) => {
    setIsSendingEmail(true);
    setIsOpenedSendEmail(false);
    callPostApiWithAuth(
      "contacts/email",
      { receiver: emailReceiver, text: text },
      onDoneEmail,
      onFailEmail
    );
  };
  const onDoneEmail = () => {
    setIsSendingEmail(false);
    setSuccessMessage("Email has been sent.");
  };
  const onFailEmail = () => {
    setIsSendingEmail(false);
    setErrorMessage("Email has been failed.");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableCard
          title="Contacts"
          toolbar={
            <div>
              {/* <Button
                color="primary"
                variant="contained"
                onClick={openSendEmailAll}
                className={clsx(classes.btn, classes.btnMargin)}
              >
                Email All
              </Button> */}
              <Button
                color="primary"
                variant="contained"
                onClick={exportCsv}
                className={classes.btn}
              >
                {isExporting && (
                  <CircularProgress
                    size={16}
                    color={"#fff"}
                    style={{ marginRight: 8 }}
                  />
                )}
                Export
              </Button>
            </div>
          }
          paginationParams={paginationParam}
          onPageChange={goPage}
        >
          <SearchBar
            onSearch={onSearch}
            searchParam={searchParam}
            setSearchParam={setSearchParam}
          />
          <TableContainer className={classes.tableContainer}>
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
                {isLoadingList ? (
                  [...Array(15).keys()].map((index) => (
                    <TableRow hover key={index}>
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
                    {contactsData.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell>
                          {row.first_name + " " + row.last_name}
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={"a"}
                            href={"mailto: " + row.email}
                            className={classes.emailLink}
                          >
                            {row.email}
                          </Typography>
                        </TableCell>
                        <TableCell>{userTypeText(row.type)}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>
                          {userStatusText(row.status) && (
                            <div className={classes.actionGroup}>
                              <Chip
                                className={
                                  row.status == 2
                                    ? classes.statusActiveBadge
                                    : classes.statusBadge
                                }
                                label={userStatusText(row.status)}
                              />
                              {/* <Button
                          size="small"
                          startIcon={<MailIcon />}
                          className={clsx(classes.btn, classes.btnEmail)}
                          color="primary"
                          onClick={() => openSendEmail(row.email)}
                        >
                          Email
                        </Button> */}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {contactsData.length == 0 && (
                      <TableRow>
                        <TableCell colSpan={6}>
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
      <SendEmailDialog
        isOpenedSendEmail={isOpenedSendEmail}
        closeSendEmail={closeSendEmail}
        sendEmail={sendEmail}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == "timeout") setErrorMessage("");
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={successMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == "timeout") setSuccessMessage("");
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
