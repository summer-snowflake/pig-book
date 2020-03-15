import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  currency: string;
}

class CurrencyBadge extends Component<Props & I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <span className='currency-badge-component badge badge-pill badge-light'>
        {t('label.currency-unit-' + this.props.currency)}
      </span>
    )
  }
}

export default withTranslation()(CurrencyBadge)
