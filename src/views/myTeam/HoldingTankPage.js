import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  TableBody,
  Button,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";
import TableCard from "components/cards/TableCard";
import Card from 'components/cards/Card';
// import TextField from "components/inputs/TextField";
import { asDate } from "utils/text";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUser } from 'utils/auth'
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import SelectField from "components/inputs/SelectField";
import NoData from "components/NoData";
import ErrorIcon from '@material-ui/icons/Error';

const headCells = [
  { id: "id", label: "User ID" },
  { id: "name", label: "Name" },
  { id: "join_date", label: "Clear Date" },
  // { id: "id", label: "Current Parent ID" },
  { id: "rank", label: "New Placement Parent ID" },
  { id: "actions", label: "Actions" },
];

const UnilevelTreeTable = () => {
  const classes = useStyles();
  const myUser = getUser();
  const [tableData, setTableData] = useState([]);
  const [isLoadingTableData, setIsLoadingTableData] = useState(false);
  const [sponserOptions, setSponserOptions] = useState([]);
  const [id, setId] = useState(null);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isPlacable, setIsPlacable] = useState(false)

  const searchTableData = () => {
    setIsLoadingTableData(true);
    callGetApiWithAuth("holding_tank", onGetTableData, () =>
      setIsLoadingTableData(false)
    );
  };
  const onGetTableData = (data) => {
    setIsLoadingTableData(false);
    let tabeleData_ = data.data.holdings.map((el) => {
      return {
        ...el,
        new_sponser: null,
        new_sponser_options: [],
      };
    });
    setTableData(tabeleData_);
  };

  const searchSponsers = (q, rowId) => {
    if(q.trim()!=""){
      callGetApiWithAuth(
        `holding_tank/search_new_parent/${q}`,
        (data) => onSearchSponsers(data, rowId),
        () => setIsLoadingTableData(false)
      );
    }
    
  };
  const onSearchSponsers = (data, rowId) => {
    if (data && data.data) {
      setTableData([
        ...tableData.map((el) => {
          if (el.id === rowId) {
            return {
              ...el,
              new_sponser_options: [{
                 title: `${data.data.first_name} ${data.data.last_name}`,
                 value: data.data.id
              }],
            };
          } else {
            return el;
          }
        }),
      ]);
    }
  };

  const placeSponsers = (parent_id, user_id) => {
    setIsLoadingPlace(true);
    callPostApiWithAuth(
      `holding_tank/update_placement`,
      {
        user_id,
        parent_id
      },
      onPlaceSponsers,
      onPlaceSponsersFail
    );
  };
  const onPlaceSponsers = (data) => {
    setIsLoadingPlace(false);
    searchTableData();
  };
  
  const onPlaceSponsersFail = (message) => {
    setErrorMessage(message);
    setIsLoadingPlace(false);
  };

  const checkPlacable = () => {
    let isPlacable = false
    if (myUser.id==1) {
      isPlacable = true
    } else if (myUser.parent_id) {
      isPlacable = true
    }
    setIsPlacable(isPlacable)
  }

  useEffect(() => {
    searchTableData();
    checkPlacable()
  }, []);

  return (
    <>
    <Alert severity={'info'} className={classes.alertDesc}>
      Your Holding Tank is where your personally enrolled Affiliates will appear so you can assign a location in your downline. To place your Affiliates, simply enter the ID# of the person they go under, and click “place”. You have 7 days to place each Affiliate before they automatically become frontline.
    </Alert>
    {!isPlacable && 
    <Alert severity={'error'} className={classes.alertDesc}>
      Sorry! Once you have been placed by your Enroller, you may place your personally enrolled Affiliates.
    </Alert>
    }
    <div style={{marginBottom: 18}} />
    <TableCard title="Holding Tank">
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
            {isLoadingTableData ? (
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
                </TableRow>
              ))
            ) : (
              <>
                {tableData?.map((row, index) => (
                  <TableRow hover key={row.uuid}>
                    <TableCell>{row.uuid}</TableCell>
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
                        >
                          {row.first_name + " " + row.last_name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{
                      row.created_at &&
                        asDate(
                          moment(row.created_at)
                            .add(6, "day")
                            .format("YYYY-MM-DD")
                        )}
                    </TableCell>
                    {/* <TableCell>{row.parent_uuid}</TableCell> */}
                    <TableCell>
                      <Autocomplete
                        id={`combo-box-${row.id}`}
                        options={row.new_sponser_options}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        className={classes.autocompleteC}
                        onChange={(e, value) => {
                          setTableData([
                            ...tableData.map((el) => {
                              if (el.id === row.id) {
                                return {
                                  ...el,
                                  new_sponser: value,
                                };
                              } else {
                                return el;
                              }
                            }),
                          ]);
                        }}
                        autoComplete
                        filterOptions={(x) => x}
                        value={row.new_sponser}
                        onInputChange={(e, value) => searchSponsers(value, row.id)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      {isPlacable && 
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.btn}
                        onClick={() => {
                          if (!row.new_sponser) {
                            setErrorMessage(
                              "Please Select New Placement Parent ID"
                            );                            
                          } else {
                            setId(row.id);
                            placeSponsers(row.new_sponser.value, row.id);
                          }
                        }}
                      >
                        {isLoadingPlace && row.id === id
                          ? "Loading ..."
                          : "Place"}
                      </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
                {tableData?.length == 0 && (
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

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errorMessage}
        autoHideDuration={2000}
        onClose={(e, r) => {
          if (r == "timeout") setErrorMessage(undefined);
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </TableCard>
    </>
  );
};

export default UnilevelTreeTable;

const useStyles = makeStyles((theme) => ({
  alertRoot: {
    marginBottom: theme.spacing(3),
  },
  alertDesc: {
    display: 'flex',
  },
  alertIcon: {
    color: theme.palette.primary.main,
    fontSize: 24,
    marginRight: 8,
  },
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
  autocompleteC: {
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: "3px !important",
    },
  },
}));
