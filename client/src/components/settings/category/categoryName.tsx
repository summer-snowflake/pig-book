import React, { Component } from 'react';

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
          <i className='fas fa-plus-square left-icon blue' />
        ) : (
          <i className='fas fa-minus-square left-icon red' />
        )}
        {this.props.category.name}
      </span>
    );
  }
}

export default CategoryName;
