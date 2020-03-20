import React, { Component } from 'react'

interface Props {
  cancelable: boolean;
  keyword: string;
  onClickCancel?: () => void;
}

class KeywordButton extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='keyword-button-component search-keyword'>
        {this.props.keyword}
        {this.props.cancelable && (
          <span className='search-keyword-cancel' onClick={this.props.onClickCancel}>
            <i className='fas fa-times right-icon' />
          </span>
        )}
      </span>
    )
  }
}

export default KeywordButton
