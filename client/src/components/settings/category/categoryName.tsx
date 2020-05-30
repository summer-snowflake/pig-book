import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  category: {
    name: string;
    balance_of_payments: boolean;
  };
}

class CategoryName extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='category-name-component'>
        {this.props.category.balance_of_payments === true ? (
          <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
        ) : (
          <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
        )}
        {this.props.category.name}
      </span>
    )
  }
}

export default CategoryName
