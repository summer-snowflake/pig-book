import React, { Component } from 'react'

interface ParentProps {
  onClickIcon: () => void;
}

type Props = ParentProps

class Cancel extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='cancel-component'>
        <span onClick={this.props.onClickIcon}>
          <i className='fas fa-times' />
        </span>
      </div>
    )
  }
}

export default Cancel
