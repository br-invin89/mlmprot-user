import React, { useState, useEffect } from 'react'
import {
  Grid,
  Stepper, Step, StepButton,
} from '@material-ui/core'
import { callGetApiWithAuth } from 'utils/api'
import useStyles from './LifestyleBonusTrackerPage.style'
import QualifiedsCard from './QualifiedsCard'
import InfoCard from './InfoCard'
// import testData from './testData.json'

export default function LifestyleBonusTrackerPage(props) {
  const classes = useStyles()

  const [isLoading, setIsLoading] = useState(false)
  const [enrollments, setEnrollments] = useState([])
  const [isQualified, setIsQualified] = useState(false)
  const [enrollments33, setEnrollments33] = useState([])
  const [isQualified33, setIsQualified33] = useState(false)
  const [enrollments22, setEnrollments22] = useState([])
  const [isQualified22, setIsQualified22] = useState(false)
  const [qualifiedAt, setQualifiedAt] = useState(null)
  const [qualifiedAt33, setQualifiedAt33] = useState(null)
  const [qualifiedAt22, setQualifiedAt22] = useState(null)

  const onGetList = (data) => {
    setIsLoading(false)
    const { 
      enrollments, is_qualified, qualified_at,
      enrollments33, is_qualified33, qualified_at33,
      enrollments22, is_qualified22, qualified_at22,
    } = data.data
    setEnrollments(enrollments)
    setIsQualified(is_qualified)
    setQualifiedAt(qualified_at)
    setEnrollments33(enrollments33)
    setIsQualified33(is_qualified33)
    setQualifiedAt33(qualified_at33)
    setEnrollments22(enrollments22)
    setIsQualified22(is_qualified22)
    setQualifiedAt22(qualified_at22)
  }

  const onFailList = () => {
    setIsLoading(false)
  }
  const loadList = () => {
    setIsLoading(true)
    callGetApiWithAuth('lifestyle_bonus_tracker', onGetList, onFailList)
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InfoCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QualifiedsCard 
            cardTitle={`Aluva 4x4 Bonus`}
            data={enrollments}
            isQualified={isQualified}
            price={100}
            qualifiedAt={qualifiedAt}
            isLoading={isLoading}            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QualifiedsCard 
            cardTitle={`Aluva 3x3 Bonus`}
            data={enrollments33}
            isQualified={isQualified33}
            price={50}
            qualifiedAt={qualifiedAt33}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QualifiedsCard 
            cardTitle={`Aluva 2x2 Bonus`}
            data={enrollments22}
            price={50}
            isQualified={isQualified22}
            qualifiedAt={qualifiedAt22}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </div>
  )
}
