import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Provider } from 'react-redux'

import AssetsAccountsList from 'components/mypage/AssetsAccountsList'
import { store } from 'modules/store'

import 'stylesheets/mypage.sass'

type Props = I18nProps

class TotalAssets extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='total-assets-component'>
        <Provider store={store}>
          <AssetsAccountsList />
        </Provider>
      </div>
    )
  }
}

export default withTranslation()(TotalAssets)
