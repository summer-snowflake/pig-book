import React, { Component } from 'react';

import EditAndCancel from 'components/common/editAndCancel';
import CategoryName from 'components/settings/category/categoryName';
import CategoryForm from 'components/settings/category/categoryForm';

interface Props {
  category: {
    id: number,
    name: string,
    balance_of_payments: boolean
  }
}

interface State {
  editing: boolean
}

class CategoryTableRecord extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editing: false
    }

    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
  }

  handleClickIcon() {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleKeyDown() {
  }

  handleChangeName() {
  }

  handleChangeBalanceOfPayments() {
  }

  handleClickSubmitButton() {
  }

  render() {
    return (
      <tr className='category-table-record-component'>
        {this.state.editing ? (
          <td>
            <CategoryForm
              category={this.props.category}
              disabled={false}
              handleChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              handleKeyDown={this.handleKeyDown}
              handleChangeName={this.handleChangeName}
              handleClickSubmitButton={this.handleClickSubmitButton} />
          </td>
        ) : (
          <td>
            <CategoryName category={this.props.category} />
          </td>
        )}
        <td>
          <EditAndCancel editing={this.state.editing} handleClickIcon={this.handleClickIcon} />
        </td>
      </tr>
    );
  }
}

export default CategoryTableRecord;
