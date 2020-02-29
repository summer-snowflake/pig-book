import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';
import { getCategories } from 'actions/categoriesActions';

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

const postCategoryFailure = (data) => {
  return {
    type: actionTypes.POST_CATEGORY_FAILURE,
    data
  }
}

export const postCategory = (params) => {
  return async (dispatch) => {
    dispatch(postCategoryRequest());
    try {
      if(ready()) {
        const res = await axios.post('/api/categories', params, { headers: loginHeaders() });
        dispatch(postCategorySuccess(res.data));
        dispatch(getCategories());
      } else {
        dispatch(postCategoryFailure());
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(postCategoryFailure(err.response.data));
      }
      console.error(err);
    }
  }
}

export const changeCategoryBalanceOfPayments = (balance_of_payments) => {
  return {
    type: actionTypes.CHANGE_CATEGORY_BALANCE_OF_PAYMENTS,
    balance_of_payments
  }
}

export const changeCategoryName = (name) => {
  return {
    type: actionTypes.CHANGE_CATEGORY_NAME,
    name
  }
}
