export const autoshipStatusText = (status) => {
  const strings = {
    1: 'Active', 2: 'Failed', 3: 'Cancelled'
  }
  return strings[status]
}
