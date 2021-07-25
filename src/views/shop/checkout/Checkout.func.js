import { shippingRate, isMemberPrice } from 'utils/shop'

export const validateCheckout = ({ userData, isSameAddress }) => {
  if (!userData.first_name || !userData.last_name ||
    !userData.email || !userData.phone
  ) {
    return 'Please fill personal information on settings page first.'
  }
  if (!userData.shipping_detail || 
    !userData.shipping_detail.shipping_address || 
    !userData.shipping_detail.shipping_country || 
    !userData.shipping_detail.shipping_state ||
    !userData.shipping_detail.shipping_city || 
    !userData.shipping_detail.shipping_zipcode
  ) {
    return 'Please fill shipping information on settings page first.'
  }
  if (!userData.billing_detail || 
    !userData.billing_detail.cc_name || 
    !userData.billing_detail.cc_type ||
    !userData.billing_detail.cc_exp_date 
  ) {
    return 'Please fill credit card information on settings page first.'
  }
  if (!isSameAddress) {
    if (
      !userData.billing_detail.billing_zipcode || 
      !userData.billing_detail.billing_address || 
      !userData.billing_detail.billing_state ||
      !userData.billing_detail.billing_city || 
      !userData.billing_detail.billing_country
    ) {
      return 'Please fill billing address on settings page first.'
    }
  }
  return null
}

export const prepareCheckout = ({ userData, isSameAddress, products, promotionCode, payType, pcPayType, isPcSubscription }) => {
  let orderDetails = []
  for (let product of products) {
    orderDetails.push({
      product_id: product.id,
      quantity: product.count,
    })
  }
  let promoCode = promotionCode

  let data = {
    orderDetails,
    promoCode,
    payType,
    pcPayType,
  }
  if (isPcSubscription) {
    data['is_autoship'] = 1
  }
  return data
}

export const validateAutoship = ({ userData, isSameAddress, autoshipData }) => {
  let errorMessage = validateCheckout(userData, isSameAddress)
  if (errorMessage) return errorMessage
  if (!autoshipData.day_of_month) {
    return 'Please input day of month'
  }
  return null
}

export const prepareAutoship = ({ userData, isSameAddress, products, promotionCode, payType, autoshipData }) => {
  let data = prepareCheckout(userData, isSameAddress, products, promotionCode, payType)
  data['autoship'] = autoshipData
  return data
}

export const validateCoupon = ({ promotionCode }) => {
  if (!promotionCode) {
    return 'Please input promotion code.'
  }  
  return null
}

export const prepareCoupon = ({ userData, products, promotionCode }) => {  
  let promoCode = promotionCode
  let orderDetails = []
  for (let product of products) {
    let product_ = {
      product_id: product.id,
      quantity: product.count,
    }
    orderDetails.push(product_)
  }
  
  return {
    promoCode,
    orderDetails
  }
}

export const validateTax = ({ userData, products, shippingPrice }) => {
  if (products.length==0) {
    return 'No products'
  }
  if (!userData.shipping_detail || 
    !userData.shipping_detail.dist_center_id ||
    !userData.shipping_detail.shipping_country ||
    !userData.shipping_detail.shipping_state ||
    !userData.shipping_detail.shipping_city ||
    !userData.shipping_detail.shipping_zipcode
  ) {
    return 'Input shipping address'
  }

  return null
}

export const prepareTax = ({ userData, products, shippingPrice }) => {
  let orderDetails = []
  products.map(product=>{
    orderDetails.push({
      product_id: product.id,
      quantity: product.count
    })
  })
  
  return {
    orderDetails,
    order: {
      shipping_price: shippingPrice
    } 
  }
}

export const validateShipping = ({ userData, products }) => {
  if (products.length==0) {
    return 'No products'
  }
  if (!userData.shipping_detail || 
    !userData.shipping_detail.dist_center_id ||
    !userData.shipping_detail.shipping_country
  ) {
    return 'Input shipping address'
  }

  return null
}

export const prepareShipping = ({ userData, products }) => {
  let orderDetails = products.map(el => ({ product_id: el.id, quantity: el.count }))
  
  return {
    orderDetails,
  }
}
