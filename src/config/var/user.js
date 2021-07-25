export const userTypeText = (type) => {
  switch (type) {
    case 1: return 'Affiliate'
    case 2: return 'Customer'
    // case 3: return 'Retails Customer'
    default: return ''
  }
}
export const userStatusText = (status) => {
  switch (status) {
    case 1: return 'inactive'
    case 2: return 'active'
    // case 3: return 'suspended'
    // case 4: return 'terminated'
    // case 5: return 'fraud'
    default: return ''
  }
}

export const userPowerLegText = (power_leg) => {
  switch (power_leg) {
    case 1: return 'Leg 1'
    case 2: return 'Leg 2'
    case 3: return 'Leg 3'
    case 4: return 'Leg 4'
    case 5: return 'Alternative'
    case 6: return 'Lesser'
    case 7: return 'Holding Tank'
    default: return ''
  }
}

export const userStatusOptions = [
  { label: 'Inactive', value: 1, },
  { label: 'Active', value: 2, },
  // { label: 'Suspended', value: 3, },
  // { label: 'Termintated', value: 4, },
  // { label: 'Fraud', value: 5, },
]

export const userTypeOptions = [
  { label: 'Affiliate', value: 1, },
  { label: 'Customer', value: 2, },
  // { label: 'Retails Customer', value: 3, },
]

export const shopSortOptions = [
  { label: 'Oldest to Newest', value: 'created_at_asc', },
  { label: 'Newest to Oldest', value: 'created_at_desc', },
  { label: 'Price - Low to High', value: 'price_asc', },
  { label: 'Price - High to Low', value: 'price_desc', },
  { label: 'BV - Low to High', value: 'bv_asc', },
  { label: 'BV - High to Low', value: 'bv_desc', },
]

