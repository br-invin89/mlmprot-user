export const creditWithdrawRequestStatusText = (status) => {
  const strings = {
    1: 'Pending', 2: 'Rejected', 3: 'Paid', 4: 'Failed'
  }
  return strings[status]
}
