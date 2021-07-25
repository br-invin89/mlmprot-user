import { shippingRate, isMemberPrice } from 'utils/shop'

export const validateCheckout = ({cartItems, userData, shippingData, billingData, isSameAddress}) => {
  if (cartItems.length==0) {
    return 'Please add product'
  }
  if (
    !userData || 
    !userData.first_name || !userData.last_name ||
    !userData.email || !userData.phone ||
    !userData.password
  ) {
    return 'Please fill personal information.'
  }
  if (!userData.username.length>9) {
    return 'Please input username less than 9 characters.'
  }
  let regex = /^[a-z]+[a-z0-9_]+$/i
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
  if (regex.exec(userData.username) == null) {
    return 'Please input username as alphanumeric'
  }
  if (!passwordRegex.test(userData.password)) {
    return 'Password must contain Capital letters, Letters, Numbers and Special characters.'
  }
  if (userData.password.length <= 8) {
    return 'Password should be more than 8 characters.'
  }
  if (userData.password != userData.password_confirm) {
    return 'Please input password same as confirm password.'
  }
  regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (regex.exec(userData.email) == null) {
    return 'Please input email as email format'
  }
  
  /*
  regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  if (regex.exec(userData.phone) == null) {
    return 'Please input phone number as phone number format'
  }
  */
  if (!shippingData || 
    !shippingData.shipping_address || 
    !shippingData.shipping_country || 
    !shippingData.shipping_state ||
    !shippingData.shipping_city || 
    !shippingData.shipping_zipcode
  ) {
    return 'Please fill shipping address information.'
  }
  /*
  if (!billingData || 
    !billingData.cc_name || 
    !billingData.cc_type ||
    !billingData.cc_number ||
    !billingData.cc_exp_month || 
    !billingData.cc_exp_year || 
    !billingData.cc_cvv
  ) {
    return 'Please fill credit card information.'
  }
  if (!isSameAddress) {
    if (
      !billingData.billing_address || 
      !billingData.billing_state || 
      !billingData.billing_city || 
      !billingData.billing_zipcode || 
      !billingData.billing_country
    ) {
      return 'Please fill billing address information.'
    }
  }
  regex = /^\d{3}$/i
  if (regex.exec(billingData.cc_cvv) == null) {
    return 'CVV Number should be 3 digit numbers'
  }
  */
  return null
}

export const prepareCheckout = ({cartItems, userData, shippingData, billingData, isSameAddress, distCenter, myUser, payType, userType}) => {
  let orderDetails = []
  for (let item of cartItems) {
    orderDetails.push({
      product_id: item.product.id,
      quantity: item.quantity,
    })
  }
  let user = {
    first_name: userData.first_name, 
    last_name: userData.last_name,
    email: userData.email.toLowerCase().trim(), 
    phone: userData.phone, 
    username: userData.username.toLowerCase().trim(),
    password: userData.password,
    sponsor_id: myUser.id,
    type: userType,
  }
  /*
  let billingDetail = {
    cc_name: billingData.cc_name,
    cc_number: billingData.cc_number,
    cc_type: billingData.cc_type,
    cc_cvv: billingData.cc_cvv,
    cc_exp_date: billingData.cc_exp_month+'/'+billingData.cc_exp_year,
    billing_country: isSameAddress?shippingData.shipping_country:billingData.billing_country,
    billing_state: isSameAddress?shippingData.shipping_state:billingData.billing_state,
    billing_city: isSameAddress?shippingData.shipping_city:billingData.billing_city,
    billing_address: isSameAddress?shippingData.shipping_address:billingData.billing_address,
    billing_address_line2: isSameAddress?shippingData.shipping_address_line2:billingData.billing_address_line2,
    billing_zipcode: isSameAddress?shippingData.shipping_zipcode:billingData.billing_zipcode,
  }
  */
  return {
    user,
    orderDetails,
    payType,
    // billingDetail,
    shippingDetail: {
      ...shippingData,
      dist_center_id: distCenter.id,
    }
  }
}

export const validateAutoship = ({cartItems, userData, shippingData, billingData, isSameAddress, autoshipData}) => {
  let errorMessage = validateCheckout({cartItems, userData, shippingData, billingData, isSameAddress})
  if (errorMessage) return errorMessage
  if (!autoshipData || 
    !autoshipData.start_date || !autoshipData.end_date ||
    !autoshipData.recurring_period
  ) {
    return 'Please fill autoship.'
  }
  return null
}

export const prepareAutoship = ({cartItems, userData, shippingData, billingData, isSameAddress, distCenter, myUser, payType, userType, autoshipData}) => {
  let data = prepareCheckout({cartItems, userData, shippingData, billingData, isSameAddress, distCenter, myUser, payType, userType})
  data['is_autoship'] = 1
  data['start_date'] = autoshipData['start_date']
  data['end_date'] = autoshipData['end_date']
  data['recurring_period'] = autoshipData['recurring_period']
  return data
}

export const validateCoupon = (promotionCode) => {
  if (promotionCode=='') {
    return 'Please input promotion code.'
  }  
  return null
}

export const prepareCoupon = (userData, products, promotionCode) => {
  let user_type = userData.type
  let promotion_code = promotionCode
  let order_details = []
  for (let product of products) {
    let product_ = {
      product_id: product.id,
      quantity: product.count,
    }
    order_details.push(product_)
  }
  
  return {
    user_type, promotion_code,
    order_details
  }
}

export const validateShipping = (cartItems, shippingData, distCenter ) => {
  if (cartItems.length==0) {
    return 'No products'
  }
  if (!shippingData || 
    !distCenter ||
    !shippingData.shipping_country ||
    !shippingData.shipping_state ||
    !shippingData.shipping_city ||
    !shippingData.shipping_zipcode
  ) {
    return 'Input shipping address'
  }

  return null
}

export const prepareShipping = (cartItems, shippingData, distCenter ) => {
  let orderDetails = cartItems.map(el=>({
    product_id: el.product.id,
    quantity: el.quantity,
  }))
  
  return {
    orderDetails,
    shippingDetail: {...shippingData, dist_center_id: distCenter.id },
  }
}

export const validateTax = (distCenter, shippingData, cartItems, shippingPrice, userType) => {
  if (cartItems.length==0) {
    return 'No products'
  }
  if (!shippingData || 
    !distCenter ||
    !shippingData.shipping_country ||
    !shippingData.shipping_state ||
    !shippingData.shipping_city ||
    !shippingData.shipping_zipcode
  ) {
    return 'Input shipping address'
  }
  if (shippingPrice==undefined) {
    return 'No yet got shipping price'
  }
  if (!userType) {
    return 'No user type selected'
  }

  return null
}

export const prepareTax = ( distCenter, shippingData, cartItems, shippingPrice, userType ) => {
  let orderDetails = cartItems.map(el=>({
    product_id: el.product.id,
    quantity: el.quantity,
  }))
  
  return {
    orderDetails,
    shippingDetail: {...shippingData, dist_center_id: distCenter.id },
    order: {
      shipping_price: shippingPrice,
    },
    user: {
      type: userType,
    }
  }
}
