import React, { Component } from 'react'

interface Props {
  onClickIcon: () => void;
}

class Trash extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='trash-component icon-field float-right'>
        <span onClick={this.props.onClickIcon}>
          <i className='fas fa-trash' />
        </span>
      </div>
    )
  }
}

export default Trash

