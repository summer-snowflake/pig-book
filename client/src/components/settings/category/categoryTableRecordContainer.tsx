import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditAndCancel from 'components/common/editAndCancel';
import CategoryName from 'components/settings/category/categoryName';
import CategoryForm from 'components/settings/category/categoryForm';
import { patchCategory, switchEditing } from 'actions/categoriesActions';
import CancelUpdateModal from 'components/common/cancelUpdateModal';
import ValidationErrorMessages from 'components/common/validationErrorMessages';

interface Props {
  switchEditing: any,
  patchCategory: any,
  editCategory: {
    isLoading: boolean,
    editingId: number,
    errors: string[]
  }
  category: {
    id: number,
    name: string,
    balance_of_payments: boolean
  },
  key: number
}

interface State {
  isOpenCancelModal: boolean,
  category: {
    id: number | undefined,
    name: string,
    balance_of_payments: boolean
  }
}

class CategoryTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpenCancelModal: false,
      category: {
        id: undefined,
        name: '',
        balance_of_payments: false
      }
    }

    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  toBoolean(booleanStr: string): boolean {
    return booleanStr.toLowerCase() === 'true';
  }

  diff(): boolean {
    return this.props.category.name !== this.state.category.name ||
      this.props.category.balance_of_payments !== this.state.category.balance_of_payments;
  }

  handleClickIcon() {
    // 編集中ではない編集アイコン
    if (this.props.editCategory.editingId === 0) {
      this.props.switchEditing(this.props.category.id);
      this.setState({
        category: this.props.category
      })
    }
    // 編集中の編集アイコン
    if (this.props.editCategory.editingId !== 0 && this.props.editCategory.editingId !== this.props.category.id) {
      alert('編集中')
    }
    // キャンセルアイコン
    if (this.props.editCategory.editingId === this.props.category.id) {
      if (this.diff()) {
        this.setState({
          isOpenCancelModal: true
        })
      } else {
        this.props.switchEditing(0);
      }
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    var ENTER = 13;
    if (e.keyCode === ENTER) {
      e.preventDefault();
      this.handleClickSubmitButton();
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const category = {
      id: this.props.category.id,
      name: e.target.value,
      balance_of_payments: this.state.category.balance_of_payments
    }
    this.setState({
      category: category
    })
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>) {
    const category = {
      id: this.props.category.id,
      name: this.state.category.name,
      balance_of_payments: this.toBoolean(e.target.value)
    }
    this.setState({
      category: category
    })
  }

  handleClickSubmitButton() {
    this.props.patchCategory(this.state.category.id, this.state.category);
  }

  handleClickCancel() {
    this.setState({
      category: this.props.category,
      isOpenCancelModal: false
    })
    this.props.switchEditing(0);
  }

  handleClickClose() {
    this.setState({
      isOpenCancelModal: false
    })
  }

  render() {
    return (
      <tr className='category-table-record-component'>
        {this.props.editCategory.editingId === this.props.category.id ? (
          <td>
            <CancelUpdateModal
               isOpen={this.state.isOpenCancelModal}
               handleClickCancel={this.handleClickCancel}
               handleClickClose={this.handleClickClose} />
            <CategoryForm
              category={this.state.category}
              disabled={this.props.editCategory.isLoading || !this.diff()}
              handleChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              handleKeyDown={this.handleKeyDown}
              handleChangeName={this.handleChangeName}
              handleClickSubmitButton={this.handleClickSubmitButton} />
            <ValidationErrorMessages messages={this.props.editCategory.errors} />
          </td>
        ) : (
          <td>
            <CategoryName category={this.props.category} />
          </td>
        )}
        <td>
          <EditAndCancel editing={this.props.editCategory.editingId === this.props.category.id} handleClickIcon={this.handleClickIcon} />
        </td>
      </tr>
    );
  }
}

function mapState(state: any) {
  return {
    editCategory: state.editCategory
  };
}

function mapDispatch(dispatch: any) {
  return {
    patchCategory(id: number, category: { name: string, balance_of_payments: boolean }) {
      dispatch(patchCategory(id, category));
    },
    switchEditing(editingId: number) {
      dispatch(switchEditing(editingId));
    }
  }
}

export default connect(mapState, mapDispatch)(CategoryTableRecordContainer);
