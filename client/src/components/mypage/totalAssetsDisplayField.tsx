import React, { Component } from 'react'

import HumanCharge from 'components/common/humanCharge'

interface ParentProps {
  currency: string;
  sum: number;
}

type Props = ParentProps;

class TotalAssetsDisplayField extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='total-assets-display-field-component'>
        <HumanCharge charge={this.props.sum} currency={this.props.currency} />
      </div>
    )
  }
}

export default TotalAssetsDisplayField
