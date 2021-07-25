export const calculatePercent = (userData) => {  
  let totalLimit = 0
  let totalArchived = 0
  let totalPercent = 0
  let pvPercent = 0
  let gvPercent = 0
  let pePercent = 0
  let leftPartnersPercent = 0
  let rightPartnersPercent = 0

  if(userData && ( userData['qualifications'] == null )) {
    userData['qualifications'] = {};
    userData['qualifications']['pv'] = 0;
    userData['qualifications']['gv'] = 0;
    userData['qualifications']['pe'] = 0;
    userData['qualifications']['left_brand_partners'] = 0;
    userData['qualifications']['right_brand_partners'] = 0;
  }
  if (userData && userData['rank'] && userData['next_rank']) {
    // pv
    if (userData['next_rank']['settings']['pv']) {
      if (userData['qualifications']['pv']>=userData['next_rank']['settings']['pv']) {
        pvPercent = 100
        totalArchived += userData['next_rank']['settings']['pv']-userData['rank']['settings']['pv']
        totalLimit += userData['next_rank']['settings']['pv']-userData['rank']['settings']['pv']
      } else {
        pvPercent = (userData['qualifications']['pv']-userData['rank']['settings']['pv'])/
          (userData['next_rank']['settings']['pv']-userData['rank']['settings']['pv'])*100
        totalArchived += userData['qualifications']['pv']-userData['rank']['settings']['pv']
        totalLimit += userData['next_rank']['settings']['pv']-userData['rank']['settings']['pv']
      }
    } else {
      pvPercent = 100
    }
    // gv
    if (userData['next_rank']['settings']['gv']) {
      if (userData['qualifications']['gv']>=userData['next_rank']['settings']['gv']) {
        gvPercent = 100
        totalArchived += userData['next_rank']['settings']['gv']-userData['rank']['settings']['gv']
        totalLimit += userData['next_rank']['settings']['gv']-userData['rank']['settings']['gv']
      } else {
        gvPercent = (userData['qualifications']['gv']-userData['rank']['settings']['gv'])/
          (userData['next_rank']['settings']['gv']-userData['rank']['settings']['gv']) * 100
        totalArchived += userData['qualifications']['gv']-userData['rank']['settings']['gv']
        totalLimit += userData['next_rank']['settings']['gv']-userData['rank']['settings']['gv']
      }
    } else {
      gvPercent = 100
    }
    // pe
    if (userData['next_rank']['settings']['pe']) {
      if (userData['qualifications']['pe']>=userData['next_rank']['settings']['pe']) {
        pePercent = 100
        totalArchived += userData['next_rank']['settings']['pe']-userData['rank']['settings']['pe']
        totalLimit += userData['next_rank']['settings']['pe']-userData['rank']['settings']['pe']
      } else {
        pePercent = (userData['qualifications']['pe']-userData['rank']['settings']['pe'])/
          (userData['next_rank']['settings']['pe']-userData['rank']['settings']['pe']) * 100
        totalArchived += userData['qualifications']['pe']-userData['rank']['settings']['pe']
        totalLimit += userData['next_rank']['settings']['pe']-userData['rank']['settings']['pe']
      }
    } else {
      pePercent = 100
    }
    // left brand partners
    if (userData['next_rank']['settings']['left_brand_partners']) {
      if (userData['qualifications']['left_brand_partners']>=userData['next_rank']['settings']['left_brand_partners']) {
        leftPartnersPercent = 100
        totalArchived += userData['next_rank']['settings']['left_brand_partners']-userData['rank']['settings']['left_brand_partners']
        totalLimit += userData['next_rank']['settings']['left_brand_partners']-userData['rank']['settings']['left_brand_partners']
      } else {
        leftPartnersPercent = (userData['qualifications']['left_brand_partners']-userData['rank']['settings']['left_brand_partners'])/
          (userData['next_rank']['settings']['left_brand_partners']-userData['rank']['settings']['left_brand_partners']) * 100
        totalArchived += userData['qualifications']['left_brand_partners']-userData['rank']['settings']['left_brand_partners']
        totalLimit += userData['next_rank']['settings']['left_brand_partners']-userData['rank']['settings']['left_brand_partners']
      }
    } else {
      leftPartnersPercent = 100
    }
    // right brand partners
    if (userData['next_rank']['settings']['right_brand_partners']) {
      if (userData['qualifications']['right_brand_partners']>=userData['next_rank']['settings']['right_brand_partners']) {
        rightPartnersPercent = 100
        totalArchived += userData['next_rank']['settings']['right_brand_partners']-userData['rank']['settings']['right_brand_partners']
        totalLimit += userData['next_rank']['settings']['right_brand_partners']-userData['rank']['settings']['right_brand_partners']
      } else {
        rightPartnersPercent = (userData['qualifications']['right_brand_partners']-userData['rank']['settings']['right_brand_partners'])/
          (userData['next_rank']['settings']['right_brand_partners']-userData['rank']['settings']['right_brand_partners']) * 100
        totalArchived += userData['qualifications']['right_brand_partners']-userData['rank']['settings']['right_brand_partners']
        totalLimit += userData['next_rank']['settings']['right_brand_partners']-userData['rank']['settings']['right_brand_partners']
      }
    } else {
      rightPartnersPercent = 100
    }
  }

  if (totalLimit==0) {
    totalPercent = 100
    if (!userData || !userData['rank']) totalPercent = 0
  } else {
    totalPercent = totalArchived/totalLimit*100
  }

  return { totalPercent, totalArchived, totalLimit, 
    pvPercent, gvPercent, 
    pePercent, leftPartnersPercent, rightPartnersPercent
  }
}
