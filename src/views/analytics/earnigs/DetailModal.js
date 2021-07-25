import React, { useEffect, useState } from 'react'
import { 
  Modal, Fade, 
  TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody,
  Button, CircularProgress,
  Typography,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from "@material-ui/styles";
import TableCard from "components/cards/TableCard";
import NoData from "components/NoData";
import { callGetApiWithAuth } from 'utils/api'
import { asPrice, asDate } from "utils/text";

const headCells = [
  { id: "amount", label: "Amount", },
  { id: 'bonus', label: 'Bonus' },
  { id: 'source_user', label: 'Source User' },
  { id: 'source_user_level', label: 'Level'},  
];

export default function DetailModal(props) {
  const classes = useStyles();
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadTableData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`earnings/${props.selectedId}/detail`, onGetTableData, onFailTableData)
  }

  const onGetTableData = (data) => {
    setIsLoading(false)
    setTableData(data.data)
  }

  const onFailTableData = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    loadTableData()
  }, [])

  return (
    <Modal open={true} onClose={()=>props.setSelectedId(undefined)}>
      <Fade in={true}>
        <div className={classes.modalRoot}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      className={classes.headCell}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading?
                  [...Array(5).keys()].map(index => (
                    <TableRow key={index}>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                    </TableRow>
                  ))
                : <>
                  {tableData.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>
                        {asPrice(row['amount'])}
                      </TableCell>
                      <TableCell>
                        {row['bonus']?row['bonus']['name']:'-'}
                      </TableCell>
                      <TableCell>
                        {row['source_user']?
                          `${row['source_user']['first_name']} ${row['source_user']['last_name']}`
                        : '-'}
                      </TableCell>
                      <TableCell>
                        <div dangerouslySetInnerHTML={{__html: row['source_user_level']}} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {tableData.length==0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <NoData />
                      </TableCell>
                    </TableRow>
                  )}
                  </>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    position: "absolute",
    width: 600,
    maxHeight: 600,
    overflowY: 'auto',
    backgroundColor: theme.palette.background.panel,
    // border: `2px solid ${theme.palette.border.active}`,
    boxShadow: theme.shadows[5],
    // boxShadow: `0px 2px 4px ${theme.palette.border.panel}`,
    borderRadius: "5px",
    padding: theme.spacing(2, 3, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none',
    },
    [theme.breakpoints.only("xs")]: {
      width: "80%",
      left: "3%",
      top: "1%",
      transform: `translate(0, 20px)`,
    },
    [theme.breakpoints.only('sm')]: {
      width: '550px',
      left: '50%',
      top: '50%',
    },
  },
  headCell: {
    fontSize: 12,
    fontWeight: 300,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
