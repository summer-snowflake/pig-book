import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import * as actionTypes from 'utils/actionTypes'

import 'stylesheets/errors.sass'

interface Props {
  actionType: string;
}

class FlashMessage extends Component<I18nProps & Props> {
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
    case actionTypes.LOGOUT_SUCCESS:
      msg = t('message.logout')
      break
    case actionTypes.LOGIN_SUCCESS:
      msg = t('message.loginSuccess')
      break
    case actionTypes.LOGIN_FAILURE:
      msg = t('message.loginFailure')
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
