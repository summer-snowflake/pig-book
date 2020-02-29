import * as actionTypes from 'utils/actionTypes';
import { setting as axios } from 'config/axios';
import { ready, loginHeaders } from 'utils/cookies';

const getCategoriesRequest =() => {
  return {
    type: actionTypes.GET_CATEGORIES_REQUEST
  }
}

const getCategoriesSuccess = (data) => {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    data
  }
}

const getCategoriesFailure = () => {
  return {
    type: actionTypes.POST_CATEGORY_FAILURE
  }
}

export const getCategories = () => {
  return async (dispatch) => {
    dispatch(getCategoriesRequest());
    try {
      if(ready()) {
        const res = await axios.get('/api/categories', { headers: loginHeaders() });
        dispatch(getCategoriesSuccess(res.data));
      } else {
        dispatch(getCategoriesFailure());
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}
