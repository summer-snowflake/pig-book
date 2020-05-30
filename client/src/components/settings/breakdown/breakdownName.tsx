import React, { Component } from 'react'

interface Props {
  breakdown: {
    name: string;
  };
}

class BreakdownName extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='breakdown-name-component'>
        {this.props.breakdown.name}
      </span>
    )
  }
}

export default BreakdownName
