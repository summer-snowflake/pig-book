import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { CategoryParams, Category } from 'types/api'
import { EditCategoryStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import CategoryName from 'components/settings/category/categoryName'
import CategoryForm from 'components/settings/category/categoryForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import DestroyModal from 'components/common/destroyModal'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import { getCategories, switchEditing } from 'actions/categoriesActions'
import { patchCategory, deleteCategory } from 'actions/categoryActions'
import { RootState } from 'reducers/rootReducer'
import AlertModal from 'components/common/alertModal'
import Trash from 'components/common/trash'
import { toBoolean } from 'modules/toBoolean'

interface StateProps {
  editCategory: EditCategoryStore;
}

interface DispatchProps {
  switchEditing: (editingId: number) => void;
  patchCategory: (id: number, params: CategoryParams) => void;
  deleteCategory: (categoryId: number) => void;
}

interface ParentProps {
  category: Category;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
  category: Category;
}

class CategoryTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      category: {
        id: 0,
        name: '',
        balance_of_payments: false
      }
    }

    this.handleClickIcon = this.handleClickIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
  }

  diff(): boolean {
    return this.props.category.name !== this.state.category.name ||
      this.props.category.balance_of_payments !== this.state.category.balance_of_payments
  }

  handleClickIcon(): void {
    // 編集中ではない編集アイコン
    if (this.props.editCategory.editingId === 0) {
      this.props.switchEditing(this.props.category.id)
      this.setState({
        category: this.props.category
      })
    }
    // 編集中の編集アイコン
    if (this.props.editCategory.editingId !== 0 && this.props.editCategory.editingId !== this.props.category.id) {
      this.setState({
        isOpenAlertModal: true
      })
    }
    // キャンセルアイコン
    if (this.props.editCategory.editingId === this.props.category.id) {
      if (this.diff()) {
        this.setState({
          isOpenCancelModal: true
        })
      } else {
        this.props.switchEditing(0)
      }
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const category = {
      id: this.props.category.id,
      name: e.target.value,
      balance_of_payments: this.state.category.balance_of_payments
    }
    this.setState({
      category: category
    })
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    const category = {
      id: this.props.category.id,
      name: this.state.category.name,
      balance_of_payments: toBoolean(e.target.value)
    }
    this.setState({
      category: category
    })
  }

  handleClickSubmitButton(): void {
    this.props.patchCategory(this.state.category.id, this.state.category)
  }

  handleClickCancel(): void {
    this.setState({
      category: this.props.category,
      isOpenCancelModal: false
    })
    this.props.switchEditing(0)
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false
    })
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickDestroy(): void {
    this.setState({
      isOpenDestroyModal: false
    })
    this.props.deleteCategory(this.props.category.id)
  }

  render(): JSX.Element {
    return (
      <tr className='category-table-record-component'>
        {this.props.editCategory.editingId === this.props.category.id ? (
          <td>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <CategoryForm
              category={this.state.category}
              disabled={this.props.editCategory.isLoading || !this.diff()}
              onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
            />
            <ValidationErrorMessages messages={this.props.editCategory.errors} />
          </td>
        ) : (
          <td>
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
            <CategoryName category={this.props.category} />
          </td>
        )}
        <td className='icon-field-td'>
          <EditAndCancel
            editing={this.props.editCategory.editingId === this.props.category.id}
            onClickIcon={this.handleClickIcon}
          />
        </td>
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editCategory: state.editCategory
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchCategory(id: number, category: CategoryParams): void {
      dispatch(patchCategory(id, category)).then(() => {
        dispatch(getCategories())
      })
    },
    switchEditing(editingId: number): void {
      dispatch(switchEditing(editingId))
    },
    deleteCategory(categoryId: number): void {
      dispatch(deleteCategory(categoryId)).then(() => {
        dispatch(getCategories())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(CategoryTableRecordContainer)
