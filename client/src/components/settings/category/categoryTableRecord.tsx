import React, { Component } from 'react';

import EditAndCancel from 'components/common/editAndCancel';
import CategoryName from 'components/settings/category/categoryName';

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

  render() {
    return (
      <tr className='category-table-record-component'>
        {this.state.editing ? (
          <td>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='category_name'
                value={this.props.category.name}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChangeName} />
            </div>
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
