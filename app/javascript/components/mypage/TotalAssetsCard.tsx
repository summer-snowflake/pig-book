import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import AssetsAccountsList from 'components/mypage/AssetsAccountsList'

type Props = I18nProps

class TotalAssetsCard extends Component<Props> {
  render (): JSX.Element {
    const { t } = this.props

    return (
      <div className='total-assets-card-component card'>
        <div className='card-header'>
          <i className='fas fa-coins left-icon' />
          {t('title.totalAssets')}
        </div>
        <div className='card-body with-background-image'>
          <AssetsAccountsList />
        </div>
      </div>
    );
  }
}

export default withTranslation()(TotalAssetsCard)
