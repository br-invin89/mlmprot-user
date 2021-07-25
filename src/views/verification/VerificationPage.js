import React, { useState, useEffect } from 'react'
import VerificationSteps from './verificationSteps/VerificationSteps'

const VerificationPage = () => {
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [idcardVerified, setIdcardVerified] = useState(false)

  return (
    <VerificationSteps
      emailVerified={emailVerified}
      onSuccessEmailVerification={()=>setEmailVerified(true)}
      phoneVerified={phoneVerified}
      onSuccessPhoneVerification={()=>setPhoneVerified(true)}
      idcardVerified={idcardVerified}
      onSuccessIdcardVerification={()=>setIdcardVerified(true)}
    />
  )
}

export default VerificationPage
