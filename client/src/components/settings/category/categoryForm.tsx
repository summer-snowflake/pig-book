import React, { Component } from 'react';

import EditAndCancel from 'components/common/editAndCancel';

interface Props {
  category: {
    id: number,
    name: string,
    balance_of_payments: boolean
  }
}

class CategoryForm extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleClickIcon = this.handleClickIcon.bind(this);
  }

  handleClickIcon() {

  }

  render() {
    return (
      <tr className='category-form-component'>
        <td>
          {this.props.category.balance_of_payments === true ? (
            <i className='fas fa-plus-square left-icon blue' />
          ) : (
            <i className='fas fa-minus-square left-icon red' />
          )}
          <span className='align-middle'>
            {this.props.category.name}
          </span>
        </td>
        <td>
          <EditAndCancel editing={false} handleClickIcon={this.handleClickIcon} />
        </td>
      </tr>
    );
  }
}

export default CategoryForm;
