import { createReducer } from 'redux-create-reducer'

const initialState = {
  isOpenedDetailBox: false,
  detailBoxPosition: {
    left: 0,
    top: 0
  },
  detailData: undefined,
  shouldSearchAgain: false,
  previousSearchingUserIds: [],
  searchingUserId: ''
}

export default createReducer(initialState, {
  [`binaryTree.OPEN_DETAIL_BOX`](state, action) {
    const { detailBoxPosition, detailData } = action.payload
    return {
      ...state,
      isOpenedDetailBox: true,
      detailBoxPosition,
      detailData
    }
  },
  [`binaryTree.CLOSE_DETAIL_BOX`](state, action) {
    return {
      ...state,
      isOpenedDetailBox: false,
    }
  },
  [`binaryTree.SEARCH`](state, action) {
    const { user_id } = action.payload
    let previousSearchingUserIds = state.previousSearchingUserIds
    previousSearchingUserIds.push(user_id)    

    return {
      ...state,
      previousSearchingUserIds,
      searchingUserId: user_id,
      shouldSearchAgain: true
    }
  },
  [`binaryTree.INIT`] (state, action) {
    return {
      ...state,
      previousSearchingUserIds: [],
      searchingUserId: '',
      shouldSearchAgain: false
    }
  },
  [`binaryTree.SEARCH_DONE`](state, action) {
    return {
      ...state,
      shouldSearchAgain: false
    }
  },
  [`binaryTree.SEARCH_BACK`](state, action) {
    let previousSearchingUserIds = state.previousSearchingUserIds
    previousSearchingUserIds.pop()
    let user_id = previousSearchingUserIds.length>0?previousSearchingUserIds[previousSearchingUserIds.length-1]:''
    return {
      ...state,
      previousSearchingUserIds,
      searchingUserId: user_id,
      shouldSearchAgain: true
    }
  }
})
