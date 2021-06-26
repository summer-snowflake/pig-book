import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import * as actionTypes from 'utils/actionTypes'

interface ParentProps {
  actionType: string;
  messages?: string;
}

type Props = ParentProps & I18nProps

class FlashMessage extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props
    let msg = ''
    switch (this.props.actionType) {
    case actionTypes.POST_CATEGORY_SUCCESS:
      msg = t('message.postCategorySuccess')
      break
    case actionTypes.PATCH_CATEGORY_SUCCESS:
      msg = t('message.patchCategorySuccess')
      break
    case actionTypes.PATCH_PROFILE_SUCCESS:
      msg = t('message.patchSuccess')
      break
    case actionTypes.POST_BREAKDOWN_SUCCESS:
      msg = t('message.postBreakdownSuccess')
      break
    case actionTypes.PATCH_BREAKDOWN_SUCCESS:
      msg = t('message.patchBreakdownSuccess')
      break
    case actionTypes.LOGOUT_SUCCESS:
      msg = t('message.logout')
      break
    case actionTypes.LOGIN_SUCCESS:
      msg = t('message.loginSuccess')
      break
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      msg = t('message.deleteCategorySuccess')
      break
    case actionTypes.DELETE_CATEGORY_FAILURE:
      msg = this.props.messages || ''
      break
    case actionTypes.DELETE_BREAKDOWN_SUCCESS:
      msg = t('message.deleteBreakdownSuccess')
      break
    case actionTypes.DELETE_BREAKDOWN_FAILURE:
      msg = this.props.messages || ''
      break
    case actionTypes.DELETE_TAG_FAILURE:
      msg = this.props.messages || ''
      break
    case actionTypes.POST_PLACE_SUCCESS:
      msg = t('message.postPlaceSuccess')
      break
    case actionTypes.PATCH_PLACE_SUCCESS:
      msg = t('message.patchPlaceSuccess')
      break
    case actionTypes.DELETE_PLACE_SUCCESS:
      msg = t('message.deletePlaceSuccess')
      break
    case actionTypes.DELETE_PLACE_FAILURE:
      msg = this.props.messages || ''
      break
    case actionTypes.PATCH_USER_SUCCESS:
      msg = t('message.patchUserSuccess')
      break
    case actionTypes.LOGIN_FAILURE:
      msg = t('message.loginFailure')
      break
    case actionTypes.SIGN_UP_FAILURE:
      msg = t('message.signUpFailure')
      break
    case actionTypes.SIGN_UP_SUCCESS:
      msg = t('message.signedUpButUnconfirmed')
      break
    case actionTypes.POST_RECORD_SUCCESS:
      msg = t('message.postSuccess')
      break
    case actionTypes.PATCH_RECORD_SUCCESS:
      msg = t('message.patchSuccess')
      break
    case actionTypes.CONFIRM_USER_SUCCESS:
      msg = t('message.confirmSuccess')
      break
    case actionTypes.POST_TAG_SUCCESS:
      msg = t('message.postTagSuccess')
      break
    case actionTypes.PATCH_TAG_SUCCESS:
      msg = t('message.patchTagSuccess')
      break
    case actionTypes.DELETE_TAG_SUCCESS:
      msg = t('message.deleteTagSuccess')
      break
    case actionTypes.DELETE_ASSETS_ACCOUNT_SUCCESS:
      msg = t('message.deleteAssetsAccountSuccess')
      break
    case actionTypes.POST_ASSETS_ACCOUNT_SUCCESS:
      msg = t('message.postAssetsAccountSuccess')
      break
    case actionTypes.PATCH_ASSETS_ACCOUNT_SUCCESS:
      msg = t('message.patchAssetsAccountSuccess')
      break
    case actionTypes.POST_PIGGY_BANK_SUCCESS:
      msg = t('message.postPiggyBankSuccess')
      break
    case actionTypes.PATCH_PIGGY_BANK_SUCCESS:
      msg = t('message.patchPiggyBankSuccess')
      break
    case actionTypes.DELETE_PIGGY_BANK_SUCCESS:
      msg = t('message.deletePiggyBankSuccess')
      break
    case actionTypes.POST_PIGGY_ITEM_SUCCESS:
      msg = t('message.postPiggyItemSuccess')
      break
    case actionTypes.PATCH_PIGGY_ITEM_SUCCESS:
      msg = t('message.patchPiggyItemSuccess')
      break
    case actionTypes.DELETE_PIGGY_ITEM_SUCCESS:
      msg = t('message.deletePiggyItemSuccess')
      break
    case actionTypes.ACCESS_FAILURE:
      msg = t('message.accessFailure')
      break
    }

    return (
      <div className='flash-message-component'>
        {this.props.actionType.indexOf('FAILURE') !== -1 ? (
          <i className='fas fa-times-circle left-icon' />
        ) : (
          <i className='fas fa-check-circle left-icon' />
        )}
        {msg}
      </div>
    )
  }
}

export default withTranslation()(FlashMessage)
