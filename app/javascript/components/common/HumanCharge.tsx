import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  balanceOfPayments: boolean;
  humanCharge: string;
}

class HumanCharge extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='human-charge-component'>
        {this.props.balanceOfPayments === true ? (
          <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
        ) : (
          <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
        )}
        {this.props.humanCharge}
      </span>
    )
  }
}

export default HumanCharge
