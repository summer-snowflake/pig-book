import * as actionTypes from 'utils/actionTypes';

const initialState = {
  editing: false,
  editingMemo: false,
  isLoading: false,
  locale: 'ja',
  currency: 'yen',
  memo: ''
}

interface Action {
  type: string,
  data: { locale: string, currency: string, memo: string },
  locale?: string,
  currency?: string,
  memo?: string,
  editing?: boolean,
  editingMemo?: boolean
}

const settingsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.PATCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locale: action.data?.locale,
        currency: action.data?.currency,
        memo: action.data?.memo
      }
    case actionTypes.PATCH_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editing: false,
        editingMemo: false,
        locale: action.data?.locale,
        currency: action.data?.currency,
        memo: action.data?.memo
      }
    case actionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.PATCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.CHANGE_PROFILE_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    case actionTypes.CHANGE_PROFILE_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    case actionTypes.SET_EDITING:
      return {
        ...state,
        editing: action.editing
      }
    case actionTypes.SET_EDITING_MEMO:
      return {
        ...state,
        editingMemo: action.editingMemo
      }
    default:
      return state;
  }
}

export default settingsReducer;
