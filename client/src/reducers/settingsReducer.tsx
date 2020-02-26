import * as actionTypes from 'utils/actionTypes';

const initialState = {
  isLoading: false,
  locale: 'ja',
  currency: 'yen'
}

interface Action {
  type: string,
  locale?: string,
  currency?: string
}

const settingsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locale: state.locale,
        currency: state.currency
      }
    case actionTypes.GET_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.CHANGE_SETTINGS_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    case actionTypes.CHANGE_SETTINGS_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    default:
      return state;
  }
}

export default settingsReducer;
