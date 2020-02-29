import React, { Component } from 'react';

interface Props {
  category: {
    id: number,
    name: string,
    balance_of_payments: boolean
  }
}

class CategoryForm extends Component<Props> {
  render() {
    return (
      <tr className='category-form-component'>
        <td>
          {this.props.category.balance_of_payments === true ? (
            <i className='fas fa-plus-square left-icon blue' />
          ) : (
            <i className='fas fa-minus-square left-icon red' />
          )}
          {this.props.category.name}
        </td>
      </tr>
    );
  }
}

export default CategoryForm;
