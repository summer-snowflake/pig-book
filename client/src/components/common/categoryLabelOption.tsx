import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

class CategoryLabelOption extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <option className='category-label-option-component'>
        {'- ' + t('label.category') +' -'}
      </option>
    )
  }
}

export default withTranslation()(CategoryLabelOption)
