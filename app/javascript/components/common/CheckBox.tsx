import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

interface ParentProps {
  checked: boolean;
}

class CheckBox extends Component<ParentProps> {
  render(): JSX.Element {
    return (
      <span className='check-box-component box-border'>
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
