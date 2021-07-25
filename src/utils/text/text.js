import store from '../../epics/store'
import moment from 'moment'

export const asPrice = (priceNumber) => {
  if (priceNumber == null) return ''
  if (isNaN(priceNumber)) return priceNumber
  const state = store.getState()
  priceNumber = (priceNumber * 1).toFixed(2) 
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return state.ui.currency.symbol + priceNumber
}

export const asNumber = (number) => {
  if (number == null) return ''
  if (isNaN(number)) return number
  return (number*1).toLocaleString()
}

export const asKNumber = (number) => {
  if (number == null) return ''
  if (isNaN(number)) return number
  if (number < 100) {
    return number
  } else {
    return Math.floor(number / 10) / 100 + 'K'
  }
}

export const asPercent = (number) => {
  if (number == null) return ''
  if (isNaN(number)) return number
  return (number * 100).toFixed(2) + '%'
}

export const asDate = (date) => {
  if (date == null) return ''
  return moment(date).format('MM/DD/YY')
}

export const asDate2 = (updatedAt) => {
  if (updatedAt == null) return ''

  return (moment(updatedAt).format('ddd, DD-MM-YYYY'))
}

export const asDateTime = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;
  return moment(x).format('MM/DD/YY hh:mm:ss');
};

export const asTime = (updatedAt) => {
  if (updatedAt == null) return ''

  return moment(updatedAt).format('hh:mm:ss A')
}

export const snake2Pascal = (str) => {
  str += ''
  str = str.split('-')

  function upper(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
  }

  for (var i = 0; i < str.length; i++) {
    var str2 = str[i].split('/')
    for (var j = 0; j < str2.length; j++) {
      str2[j] = upper(str2[j])
    }
    str[i] = str2.join(' ')
  }
  return str.join(' ')
}
