import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  currency: string;
  charge: number;
}

class HumanCharge extends Component<Props & I18nProps> {
  toHumanCharge(): string {
    const { t } = this.props

    let charge = ''
    if (t('label.locale') === 'jp-JP') {
      charge = Math.floor(this.props.charge).toLocaleString(t('label.locale'), { style: 'currency', currency: 'JPY'})
    } else {
      charge = this.props.charge.toLocaleString(t('label.locale'), { maximumSignificantDigits: 3 })
    }
    return charge
  }

  render(): JSX.Element {
    return (
      <span className='human-charge-component'>
        {this.toHumanCharge()}
      </span>
    )
  }
}

export default withTranslation()(HumanCharge)
