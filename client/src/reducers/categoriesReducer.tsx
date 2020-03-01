import * as actionTypes from 'utils/actionTypes'

const initialState = {
  isLoading: false,
  categories: []
}

interface Action {
  type: string;
  data: {
    name: string;
    balanceOfPayments: boolean;
  };
}

const categoriesReducer = (state = initialState, action: Action): {} => {
  switch (action.type) {
  case actionTypes.GET_CATEGORIES_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_CATEGORIES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      categories: action.data
    }
  case actionTypes.GET_CATEGORIES_FAILURE:
    return {
      ...state,
      isLoading: false
    }
  default:
    return state
  }
}

export default categoriesReducer
