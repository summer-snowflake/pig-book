import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

interface ParentProps {
  checked: boolean;
  onClick: () => void;
}

class CheckBox extends Component<ParentProps> {
  render(): JSX.Element {
    return (
      <span className='check-box-component box-border' onClick={this.props.onClick}>
        {this.props.checked ? (
          <FontAwesomeIcon icon={['fas', 'check']} />
        ) : (
          <FontAwesomeIcon className='transparent' icon={['fas', 'check']} />
        )}
      </span>
    )
  }
}

export default CheckBox
