import React from 'react'
import { toast } from 'react-toastify'

import * as actionTypes from 'utils/actionTypes'
import { WithRelationsCategory, Tag } from 'types/api'
import { EditRecordStore } from 'types/store'
import { RecordAction } from 'types/action'
import FlashMessage from 'components/common/flashMessage'

const initialState = {
  isLoading: false,
  isOpenEditRecordModal: false,
  editedRecordId: undefined,
  record: {
    id: 0,
    published_on: new Date(),
    charge: '',
    cashless_charge: '',
    point: '',
    memo: '',
    category_id: undefined,
    category: {
      id: undefined,
      balance_of_payments: false
    },
    breakdown_id: undefined,
    place_id: undefined,
    tags: []
  },
  breakdowns: [],
  places: [],
  tags: [],
  errors: []
}

interface StoreAction extends RecordAction {
  category: WithRelationsCategory;
  tag: Tag;
  balance_of_payments: boolean;
  publishedOn: Date;
  breakdownId: number | undefined;
  placeId: number | undefined;
  charge: number;
  cashlessCharge: number;
  point: number;
  memo: string;
  errors: string[];
}

const editRecordReducer = (state: EditRecordStore = initialState, action: StoreAction): EditRecordStore => {
  switch (action.type) {
  case actionTypes.PATCH_RECORD_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.PATCH_RECORD_SUCCESS:
    toast.success(<FlashMessage actionType={action.type} />)
    return {
      ...state,
      isLoading: false,
      isOpenEditRecordModal: false,
      errors: [],
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      },
      editedRecordId: action.record.id
    }
  case actionTypes.POST_RECORD_SUCCESS:
    return {
      ...state,
      editedRecordId: action.record.id
    }
  case actionTypes.CLEAR_EDITED_RECORD:
    return {
      ...state,
      editedRecordId: undefined
    }
  case actionTypes.PATCH_RECORD_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    }
  case actionTypes.CHANGE_EDIT_RECORD_CATEGORY:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: action.category || {
          id: undefined,
          balance_of_payments: state.record.category.balance_of_payments
        },
        category_id: undefined,
        breakdown_id: undefined,
        place_id: undefined,
        tags: state.record.tags
      },
      breakdowns: [],
      places: []
    }
  case actionTypes.CHANGE_EDIT_RECORD_BALANCE_OF_PAYMENTS:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: {
          id: undefined,
          balance_of_payments: action.balance_of_payments
        },
        category_id: undefined,
        breakdown_id: undefined,
        place_id: undefined,
        tags: state.record.tags
      },
      breakdowns: [],
      places: []
    }
  case actionTypes.CHANGE_EDIT_RECORD_PUBLISHED_ON:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: action.publishedOn,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_BREAKDOWN:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: action.breakdownId,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_PLACE:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: action.placeId,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_CHARGE:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: action.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_CASHLESS_CHARGE:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: action.cashlessCharge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_POINT:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: action.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.CHANGE_EDIT_RECORD_MEMO:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: action.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags
      }
    }
  case actionTypes.ADD_EDIT_RECORD_TAG:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: [...state.record.tags, action.tag]
      }
    }
  case actionTypes.REMOVE_EDIT_RECORD_TAG:
    return {
      ...state,
      record: {
        id: state.record.id,
        published_on: state.record.published_on,
        charge: state.record.charge,
        cashless_charge: state.record.cashless_charge,
        point: state.record.point,
        memo: state.record.memo,
        category: state.record.category,
        category_id: state.record.category_id,
        breakdown_id: state.record.breakdown_id,
        place_id: state.record.place_id,
        tags: state.record.tags.filter((tag) => tag.id !== action.tag.id)
      }
    }
  case actionTypes.EDIT_RECORD:
    return {
      ...state,
      isOpenEditRecordModal: true,
      record: {
        id: action.record.id,
        published_on: new Date(action.record.published_at),
        charge: action.record.rounded_charge,
        cashless_charge: action.record.cashless_charge === 0 ? '' : action.record.cashless_charge,
        point: action.record.point === 0 ? '' : action.record.point,
        memo: action.record.memo,
        category: action.record.category,
        category_id: action.record.category.id,
        breakdown_id: action.record.breakdown_id,
        place_id: action.record.place_id,
        tags: action.record.tags
      },
      errors: []
    }
  case actionTypes.GET_EDIT_RECORD_CATEGORY_REQUEST:
    return {
      ...state,
      isLoading: true
    }
  case actionTypes.GET_EDIT_RECORD_CATEGORY_SUCCESS:
    return {
      ...state,
      isLoading: false,
      breakdowns: action.category.breakdowns,
      places: action.category.places
    }
  case actionTypes.CLOSE_EDIT_MODAL:
    return {
      ...state,
      isLoading: false,
      isOpenEditRecordModal: false
    }
  case actionTypes.LOGOUT_SUCCESS:
    return {
      ...initialState
    }
  case actionTypes.GET_COOKIES_FAILURE:
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default editRecordReducer
