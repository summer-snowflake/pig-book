import React, { Component } from 'react'

import { AssetsAccount } from 'types/api';
import HumanCharge from 'components/common/HumanCharge'

interface ParentProps {
  currency: string;
  assetsAccounts: AssetsAccount[];
}

type Props = ParentProps;

class TotalAssetsDisplayField extends Component<Props> {
  calculateTotalAssets(assets: AssetsAccount[], currency: string): number {
    const plusItems = assets
      .filter((account) => account.balance_of_payments && account.currency === currency && account.checked)
      .map((account) => account.money)
    const minusItems = assets
      .filter((account) => !account.balance_of_payments && account.currency === currency && account.checked)
      .map((account) => account.money)

    if (plusItems.length > 0 && minusItems.length > 0) {
      return plusItems.reduceRight((a, x) => a += x) - minusItems.reduceRight((a, x) => a += x)
    } else if (plusItems.length > 0) {
      return plusItems.reduceRight((a, x) => a += x)
    } else if (minusItems.length > 0) {
      return 0 - minusItems.reduceRight((a, x) => a += x)
    } else {
      return 0
    }
  }

  toHumanCharge(charge: number): string {
    if (this.props.currency === 'yen') {
      return Math.floor(charge).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
    } else if (this.props.currency === 'dollar') {
      return charge.toLocaleString('ja-JP', { style: 'currency', currency: 'USD' })
    } else {
      return String(charge)
    }
  }

  render(): JSX.Element {
    return (
      <div className='total-assets-display-field-component'>
        <span className='large-size-charge dark-green'>
          {this.toHumanCharge(this.calculateTotalAssets(this.props.assetsAccounts, this.props.currency))}
        </span>
      </div>
    )
  }
}

export default TotalAssetsDisplayField
