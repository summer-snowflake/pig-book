import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  category: {
    name: string,
    balance_of_payments: boolean
  }
}

class CategoryName extends Component<Props> {
  render() {
    return (
      <span className='category-name-component'>
        {this.props.category.balance_of_payments === true ? (
          <FontAwesomeIcon icon={['fas', 'plus-square']} className='left-icon blue' />
        ) : (
          <FontAwesomeIcon icon={['fas', 'minus-square']} className='left-icon red' />
        )}
        {this.props.category.name}
      </span>
    );
  }
}

export default CategoryName;
