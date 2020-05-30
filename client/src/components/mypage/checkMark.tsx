import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  check: boolean;
}

class CheckMark extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='check-mark-component'>
        {this.props.check ? (
          <FontAwesomeIcon className='left-icon green' icon={['fas', 'check']} />
        ) : (
          <FontAwesomeIcon className='left-icon red' icon={['fas', 'exclamation']} />
        )}
      </span>
    )
  }
}

export default CheckMark
