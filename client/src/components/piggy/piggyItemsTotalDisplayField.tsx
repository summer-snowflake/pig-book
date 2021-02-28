import React, { Component } from 'react'

import { PiggyItem } from 'types/api';
import HumanCharge from 'components/common/humanCharge'

interface ParentProps {
  currency: string;
  piggyItems: PiggyItem[];
}

type Props = ParentProps;

class PiggyItemsTotalDisplayField extends Component<Props> {
  calculateTotalAssets(items: PiggyItem[]): number {
    const plusItems = items
      .filter((item) => item.balance_of_payments)
      .map((item) => Number(item.charge))
    const minusItems = items
      .filter((item) => !item.balance_of_payments)
      .map((item) => Number(item.charge))

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

  render(): JSX.Element {
    return (
      <div className='piggy-items-total-display-field-component'>
        <HumanCharge
          charge={this.calculateTotalAssets(this.props.piggyItems)}
          currency={this.props.currency}
        />
      </div>
    )
  }
}

export default PiggyItemsTotalDisplayField
