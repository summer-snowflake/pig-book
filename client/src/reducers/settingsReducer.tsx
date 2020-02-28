import * as actionTypes from 'utils/actionTypes';

const initialState = {
  editing: false,
  isLoading: false,
  locale: 'ja',
  currency: 'yen'
}

interface Action {
  type: string,
  data: { locale: string, currency: string },
  locale?: string,
  currency?: string
  editing?: boolean
}

const settingsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.PATCH_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locale: action.data?.locale,
        currency: action.data?.currency
      }
    case actionTypes.PATCH_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editing: false,
        locale: state.locale,
        currency: state.currency
      }
    case actionTypes.GET_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.PATCH_SETTINGS_FAILURE:
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
    case actionTypes.SET_EDITING:
      return {
        ...state,
        editing: action.editing
      }
    default:
      return state;
  }
}

export default settingsReducer;
