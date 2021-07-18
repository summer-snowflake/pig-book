import React, { Component } from 'react'

interface ParentProps {
  onClickButton: () => void;
}

type Props = ParentProps

class PlusButton extends Component<Props> {
  render(): JSX.Element {
    return (
      <button
        className='plus-button-component btn btn-secondary'
        onClick={this.props.onClickButton}
      >
        <i className='fas fa-plus' />
      </button>
    )
  }
}

export default PlusButton
