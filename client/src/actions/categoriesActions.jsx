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
    type: actionTypes.GET_CATEGORIES_FAILURE
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

const patchCategoryRequest = () => {
  return {
    type: actionTypes.PATCH_CATEGORY_REQUEST
  }
}

const patchCategorySuccess = () => {
  return {
    type: actionTypes.PATCH_CATEGORY_SUCCESS
  }
}

const patchCategoryFailure = (data) => {
  return {
    type: actionTypes.PATCH_CATEGORY_FAILURE,
    data
  }
}

export const patchCategory = (id, params) => {
  return async (dispatch) => {
    dispatch(patchCategoryRequest());

    try {
      if(ready()) {
        const res = await axios.patch('/api/categories/' + id, params, { headers: loginHeaders() });
        dispatch(patchCategorySuccess(res.data));
        dispatch(getCategories());
      } else {
        dispatch(patchCategoryFailure());
      }
    }
    catch (err) {
      if (err.response.status === 422) {
        dispatch(patchCategoryFailure(err.response.data));
      }
      console.error(err);
    }
  }
}

export const switchEditing = (editingId) => {
  return {
    type: actionTypes.SWITCH_EDITING,
    editingId
  }
}
