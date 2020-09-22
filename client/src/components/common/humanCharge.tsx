import React, { Component } from 'react'

interface Props {
  currency: string;
  charge: number;
}

class HumanCharge extends Component<Props> {
  toHumanCharge(): string {
    if (this.props.currency === 'yen') {
      return Math.floor(this.props.charge).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
    } else if (this.props.currency === 'dollar') {
      return this.props.charge.toLocaleString('ja-JP', { style: 'currency', currency: 'USD' })
    } else {
      return String(this.props.charge)
    }
  }

  render(): JSX.Element {
    return (
      <span className='human-charge-component'>
        {this.toHumanCharge()}
      </span>
    )
  }
}

export default HumanCharge
