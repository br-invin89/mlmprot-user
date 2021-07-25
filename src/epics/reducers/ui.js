import { createReducer } from "redux-create-reducer";

const initialState = {
  pageTitle: "",
  language: "en",
  currency: {
    symbol: "$",
    name: "",
  },
  theme: undefined,
};

export default createReducer(initialState, {
  [`ui.SET_THEME`](state, action) {
    return {
      ...state,
      theme: action.payload.theme,
    };
  },
  [`ui.SET_PAGE_TITLE`](state, action) {
    return {
      ...state,
      pageTitle: action.payload.pageTitle,
    };
  },
  [`ui.SET_LANGUAGE`](state, action) {
    return {
      ...state,
      language: action.payload.language,
    };
  },
  [`ui.SET_CURRENCY`](state, action) {
    const { symbol, name } = action.payload;

    return {
      ...state,
      currency: {
        symbol,
        name,
      },
    };
  },
});
