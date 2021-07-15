import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import CategoriesList from 'components/settings/category/CategoriesList'

class CategoryCard extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='category-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-th-large left-icon' />
            {t('menu.category')}
          </div>
          <div className='card-body with-background-image'>
            <CategoriesList />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(CategoryCard)
