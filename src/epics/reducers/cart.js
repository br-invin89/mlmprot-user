import { createReducer } from 'redux-create-reducer'

const initialState = {
  products: [],
  isOpenedSidebarCart: false,
  promotionCode: undefined,
  cartType: 'products',
  isPcSubscription: false,
  payType:1 ,
  pcPayType: ''
}

export default createReducer(initialState, {
  [`cart.ADD_PRODUCT`](state, action) {
    const { product, count, productType } = action.payload
    let cartType = 'products'
    let isExist = false
    let products = [...state.products]

    if (product.is_sample==1) {
      cartType = 'sample_products'
    } else if (product.is_pc==1) {
      cartType = 'product_credits'
    }
    if (cartType!=state.cartType) {
      products = []
    }
    
    for (let product_ of products) {
      if (product_.id==product.id) {
        product_.count += count
        isExist = true
      }
    }
    if (!isExist) {
      product.count = count
      product.productType = productType
      products.push(product)
    }

    return {
      ...state,
      products,
      productType,
      cartType,
      isOpenedSidebarCart: true
    }
  },
  [`cart.OPEN_SIDEBAR_CART`](state, action) {
    return {
      ...state,
      isOpenedSidebarCart: true
    }
  },
  [`cart.CLOSE_SIDEBAR_CART`](state, action) {
    return {
      ...state,
      isOpenedSidebarCart: false
    }
  },
  [`cart.CHANGE_QTY`](state, action) {
    const { product, count } = action.payload

    let products = []
    for (let product_ of state.products) {
      if (product_.id==product.id) {
        product_.count = count
      }
      products.push(product_)
    }

    return {
      ...state,
      products
    }
  },
  [`cart.REMOVE_CART`](state, action) {
    const { product } = action.payload
    let products = []
    for (let product_ of state.products) {
      if (product_.id!=product.id) {
        products.push(product_)
      }
    }

    return {
      ...state,
      products,
    }
  },
  [`cart.RESET_COUPON`](state, action) {
    return {
      ...state,
      promotionCode: undefined,
    }
  },
  [`cart.APPLY_COUPON`](state, action) {
    const { promotionCode } = action.payload
    return {
      ...state,
      promotionCode
    }
  },
  [`cart.EMPTY_CART`](state, action) {
    return {
      ...state,
      products: [],
      isOpenedSidebarCart: false,
      promotionCode: undefined,
    }
  },
  [`cart.SET_PC_SUBSCRIPTION`](state, action) {
    return {
      ...state,
      isPcSubscription: action.payload.isPcSubscription
    }
  },
  [`cart.SET_PAY_TYPE`](state, action) {
    return {
      ...state,
      payType: action.payload.payType,
      pcPayType: action.payload.pcPayType,
    }
  }
})
