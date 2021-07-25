import store from 'epics/store'

export const shippingRate = (product, count) => {
  let shippingRate = 0;
  if (product.shipping_rates && product.shipping_rates.length>0) {
    shippingRate = product.shipping_rates[0].rate;
    product.shipping_rates.sort((a, b) => b.rate-a.rate);
    for (let shipping_rate of product.shipping_rates) {
      if (count<=shipping_rate.units) shippingRate = shipping_rate.rate;      
    }
  }
  return shippingRate;
}

export const isMemberPrice = () => {
  const state = store.getState()
  const myUser = state.auth.user
  if (!myUser) return false
  if (myUser.type==1 || myUser.type==2) return true
  return false
}
