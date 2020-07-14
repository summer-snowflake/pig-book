import React, { Component } from 'react'

interface Props {
  count: number;
  max: number;
}

class Counter extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='counter-component'>
        {this.props.count} / {this.props.max}
      </span>
    )
  }
}

export default Counter
