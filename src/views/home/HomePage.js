import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Grid
} from '@material-ui/core'
import CustomHtml from 'components/customHtml/CustomHtml'
import BannerSection from './home/BannerSection'
import BestSellingSection from './home/BestSellingSection'
import MyAccountCard from './home/MyAccountCard'
import QuickLinkCards from './home/QuickLinkCards'
import NewsCard from './home/NewsCard'

export default function HomePage() {
  const history = useHistory()
  const [isAbleShow, setIsAbleShow] = useState(false)
  const myUser = useSelector(state=>state.auth.user)

  useEffect(() => {
    if (!myUser) return     
    if (myUser.verification_status==2) {
      history.push('/verification')
      return
    }
    if (myUser.tax_status==2) {
      history.push('/tax-form')
      return
    }
    // if (!myUser.leg_position) {
    //   history.push('/autoship/current-autoships')
    // }
    if (myUser.type==2 || myUser.type==3) {
      history.push('/autoship/current-autoships')
      return
    }
    history.push('/dashboard')
    setIsAbleShow(true)
  }, [myUser])

  return (
    <Grid container spacing={3}>
      {isAbleShow &&
      <>
        <Grid item xs={12}>
          <BannerSection />
        </Grid>
        <Grid item xs={12}>
          <BestSellingSection />
        </Grid>
        <Grid item lg={3} md={4} sm={5} xs={12}>
          <MyAccountCard />
        </Grid>
        <Grid item lg={5} md={8} sm={7} xs={12}>
          <QuickLinkCards />
        </Grid>
        <Grid item lg={4} md={12}>
          <NewsCard />
        </Grid>
      </>}      
    </Grid>
  )
}

/*
<CustomHtml page={'home'} />
*/
