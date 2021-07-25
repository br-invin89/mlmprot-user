export const ticketPriorityText = (priority) => {
  switch(priority) {
    case 1: return 'Low'
    case 2: return 'Medium'
    case 3: return 'Urgent'
    default: return ''
  }
}

export const ticketTypeText = (priority) => {
  switch(priority) {
    case 1: return 'Technical Support'
    case 2: return 'Product Quality'
    case 3: return 'Other'
    default: return ''
  }
}

export const ticketPriorityStyle = (priority) => {
  switch(priority) {
    case 1: return { backgroundColor: '#fcca3e', color: '#fff' }
    case 2: return { backgroundColor: '#ff7800', color: '#fff' }
    case 3: return { backgroundColor: '#ca2027', color: '#fff' }
    default: return {}
  }
}

export const ticketTypeStyle = (priority) => {
  switch(priority) {
    case 1: return { backgroundColor: '#fcca3e', color: '#fff' }
    case 2: return { backgroundColor: '#ff7800', color: '#fff' }
    case 3: return { backgroundColor: '#ca2027', color: '#fff' }
    default: return {}
  }
}

export const ticketStatusText = (priority) => {
  switch(priority) {
    case 1: return 'Requested'
    case 2: return 'Open'
    case 3: return 'Resolved'
    default: return ''
  }
}

export const ticketStatusStyle = (priority) => {
  switch(priority) {
    case 1: return { backgroundColor: '#0599ca', color: '#fff' }
    case 2: return { backgroundColor: '#fcca3e', color: '#fff' }
    case 3: return { backgroundColor: '#45B854', color: '#fff' }
    default: return {}
  }
}

export const ticketTypeOptions = [
  {
    label: '', value: ''
  },
  {
    label: 'Technical Support', value: 1
  },
  {
    label: 'Product Quality', value: 2
  },
  {
    label: 'Other', value: 3
  }
]

export const ticketPriorityOptions = [
  {
    label: '', value: ''
  },
  {
    label: 'Low', value: 1,
  },
  {
    label: 'Medium', value: 2,
  },
  {
    label: 'Urgent', value: 3,
  },
]
