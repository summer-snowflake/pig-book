import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  currency: string;
}

type Props = ParentProps & I18nProps

class CurrencyBadge extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <span className='currency-badge-component currency-badge'>
        {t('label.currency-unit-' + this.props.currency)}
      </span>
    )
  }
}

export default withTranslation()(CurrencyBadge)
