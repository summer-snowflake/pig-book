import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

const postCategoryRequest = () => {
  return {
    type: actionTypes.POST_CATEGORY_REQUEST
  }
}

const postCategorySuccess = (data) => {
  return {
    type: actionTypes.POST_CATEGORY_SUCCESS,
    data
  }
}

const postCategoryFailure = () => {
  return {
    type: actionTypes.POST_CATEGORY_FAILURE
  }
}

export const postCategory = (params) => {
  return async (dispatch) => {
    dispatch(postCategoryRequest());
    try {
      if(ready()) {
        const res = await axios.post('/api/categories', params, { headers: loginHeaders() });
        dispatch(postCategorySuccess(res.data));
      } else {
        dispatch(postCategoryFailure());
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const changeCategoryBalanceOfPayments = (balanceOfPayments) => {
  return {
    type: actionTypes.CHANGE_CATEGORY_BALANCE_OF_PAYMENTS,
    balanceOfPayments
  }
}

export const changeCategoryName = (name) => {
  return {
    type: actionTypes.CHANGE_CATEGORY_NAME,
    name
  }
}
