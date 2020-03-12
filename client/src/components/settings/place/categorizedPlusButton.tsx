import React, { Component } from 'react'

interface Props {
  onClickButton: () => void;
}

class CategorizedButton extends Component<Props> {
  render(): JSX.Element {
    return (
      <button className='categorized-button-component btn btn-secondary btn-sm' onClick={this.props.onClickButton}>
        <i className='fas fa-plus' />
      </button>
    )
  }
}

export default CategorizedButton
