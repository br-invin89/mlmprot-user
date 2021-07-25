import React, { useState, useEffect } from 'react'
import Card from 'components/cards/Card'
import { 
  Grid, Stepper, Step, StepLabel, 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EmailVerificationStep from './EmailVerificationStep'
import PhoneVerificationStep from './PhoneVerificationStep'
import IdcardVerificationStep from './IdcardVerificationStep'
import { 
  EMAIL_VERIFICATION, 
  PHONE_VERIFICATION, 
  IDCARD_VERIFICATION,
  VERIFICATION_STEPS, 
} from './VerificationSteps.var'

const VerificationSteps = (props) => {
  const classes = useStyles()
  const [currentStep, setCurrentStep] = useState(EMAIL_VERIFICATION)

  return (
    <Card className={classes.cardRoot}>
      <Grid container
        justify='center'
        alignItems='center'
        direction='column'
      >      
        <Stepper activeStep={currentStep}>
          {VERIFICATION_STEPS.map(step => (
            <Step key={step.title} >
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {currentStep==EMAIL_VERIFICATION &&
          <EmailVerificationStep 
            onSuccessEmailVerification={props.onSuccessEmailVerification}
            goNextStep={()=>setCurrentStep(PHONE_VERIFICATION)}
          />
        }
        {currentStep==PHONE_VERIFICATION &&
          <PhoneVerificationStep 
            onSuccessPhoneVerification={props.onSuccessPhoneVerification}
            goNextStep={()=>setCurrentStep(IDCARD_VERIFICATION)}
          />
        }
        {currentStep==IDCARD_VERIFICATION &&
          <IdcardVerificationStep 
            onSuccessEmailVerification={props.onSuccessIdcardVerification}
          />
        }
      </Grid>
    </Card>
  )
}

export default VerificationSteps

const useStyles = makeStyles(theme => ({
  cardRoot: {
    minHeight: 'calc(100vh - 190px)',
    position: 'relative',
  }
}))
