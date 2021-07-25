export const orderStatusText = (status) => {
  switch (status) {
    case 1: return 'pending'
    case 2: return 'confirmed'
    case 3: return 'shipped'
    case 4: return 'failed'
    case 5: return 'refunded'
    case 6: return 'partial refunded'
    case 7: return 'resent'
    case 8: return 'canceled'
    case 9: return 'chargebacked'
  }
  return ''
}
export const orderStatusColor = (status) => {
  if (status==1) {
    return '#F9AC38'
  } else if (status==2) {
    return '#5856D6'
  } else if (status==3) {
    return '#1890FF'
  } else if (status==4) {
    return '#F56B6E'
  } else if (status==5) {
    return '#7F8FA4'
  } else if (status==6) {
    return '#7F8FA4'
  } else if (status==7) {
    return '#1890FF'
  } else if (status==8) {
    return '#F56B6E'
  } else if (status==9) {
    return '#F56B6E'
  }

  return '#F56B6E'
}
