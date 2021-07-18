import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  balanceOfPayments: boolean;
  name: string;
}

class CategoryName extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='category-name-component'>
        {this.props.balanceOfPayments === true ? (
          <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
        ) : (
          <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
        )}
        {this.props.name}
      </span>
    )
  }
}

export default CategoryName
