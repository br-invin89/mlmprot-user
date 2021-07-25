import React, { useState } from 'react'
import { 
  Card, CardContent, 
  Typography, Popover,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell,  
  Avatar,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { asPrice, asDate } from 'utils/text'
import NoData from "components/NoData";
import useStyle from './LifestyleBonusTrackerPage.style'
import checkedIcon from 'assets/icons/confirm_check.svg'

export default function QualifiedsCard(props) {
  const classes = useStyle()  

  return (
    <Card>
      <CardContent>
        <div className={classes.cardHeader}>
          <div className={classes.cardTitleRoot}>
            <Typography component={'h4'} className={classes.cardTitle}>
              {props.cardTitle}
            </Typography>
          </div>
          {props.isQualified && 
          <div className={classes.bonus}>
            <Typography component={'p'} className={classes.bonusTitle}>
              <img src={checkedIcon} />
              Bonus{' '}
              {asPrice(props.price)}
            </Typography>
            {props.qualifiedAt && 
            <Typography component={'p'}>
                <small>Qualified on {asDate(props.qualifiedAt)}</small>
            </Typography>
            }
          </div>
          }
        </div>
        <TableContainer
          className={classes.tableRoot}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell
                    key={index}
                    align={headCell.align || "left"}
                    className={classes.headCell}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading?
                [...Array(5).keys()].map(index => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              : 
              <>
              {props.data.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.uuid}</TableCell>
                  <TableCell className={classes.userTd}>
                    <Avatar
                      src={el.image}
                      className={classes.userImage}
                    />
                    {`${el.first_name} ${el.last_name}`}
                  </TableCell>
                  <TableCell>
                    {el.pv}
                  </TableCell>
                  <TableCell>
                    {asDate(el.created_at)}
                  </TableCell>
                  <TableCell>
                    <QualifiedMembersSpan 
                      data={el.enrollments}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {props.data.length === 0 && (
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
      </CardContent>
    </Card>
  )
}

const headCells = [
  {
    label: 'User ID', 
  },
  {
    label: 'Name', 
  },
  {
    label: 'PV', 
  },
  {
    label: 'Registered On'
  },
  {
    label: 'Enrollments'
  }
]

const QualifiedMembersSpan = (props) => {
  const classes = useStyle()
  const [infoAnchor, setInfoAnchor] = useState(undefined)

  return (
    <>
      <Typography 
        component={'a'}
        href={'javascript:void(0)'}
        onClick={(e)=>setInfoAnchor(e.currentTarget)}
      >
        {props.data.length}
      </Typography>
      <Popover
        open={Boolean(infoAnchor)}
        anchorEl={infoAnchor}
        onClose={()=>setInfoAnchor(undefined)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <Typography component={'p'}
          className={classes.popTitle}
        >
          Enrollments
        </Typography>
        <TableContainer
          className={classes.popTableRoot}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headCellsOnPopover.map((headCell, index) => (
                  <TableCell
                    key={index}
                    align={headCell.align || "left"}
                    className={classes.headCell}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.uuid}</TableCell>
                  <TableCell className={classes.userTd}>
                    <Avatar
                      src={el.image}
                      className={classes.userImage}
                    />
                    {`${el.first_name} ${el.last_name}`}
                  </TableCell>
                  <TableCell>
                    {el.pv}
                  </TableCell>
                  <TableCell>
                    {asDate(el.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </>
  )
}

const headCellsOnPopover = [
  {
    label: 'User ID', 
  },
  {
    label: 'Name', 
  },
  {
    label: 'PV', 
  },
  {
    label: 'Registered On'
  },
]
