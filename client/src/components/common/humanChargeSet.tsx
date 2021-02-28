import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import HumanCharge from 'components/common/humanCharge'

interface Props {
  balanceOfPayments: boolean;
  currency: string;
  charge: number;
}

class HumanChargeSet extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='human-charge-set-component'>
        {this.props.balanceOfPayments === true ? (
          <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
        ) : (
          <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
        )}
        <HumanCharge currency={this.props.currency} charge={this.props.charge} />
      </span>
    )
  }
}

export default HumanChargeSet
