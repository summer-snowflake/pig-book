import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { CategoryParams, Category } from 'types/api'
import { EditCategoryStore } from 'types/store'
import { patchCategory, deleteCategory } from 'actions/categoryActions'
import {
  editCategory, exitCategory, clearEditedCategory
} from 'actions/categoryStoreActions'
import { openAlertModal } from 'actions/alertStoreActions'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import { toBoolean } from 'modules/toBoolean'
import { encodeQueryData } from 'modules/encode'
import Trash from 'components/common/Trash'
import DestroyModal from 'components/common/DestroyModal'
import CancelModal from 'components/common/CancelModal'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import CategoryName from 'components/common/CategoryName'
import Edit from 'components/common/Edit'
import Cancel from 'components/common/Cancel'
import CategoryForm from 'components/settings/category/CategoryForm'

interface ParentProps {
  category: Category;
}

interface StateProps {
  editCategoryStore: EditCategoryStore;
}

interface DispatchProps {
  editCategory: (category: Category) => void;
  exitCategory: () => void;
  patchCategory: (id: number, params: CategoryParams) => void;
  deleteCategory: (categoryId: number) => void;
  openAlertModal: (messageType: string) => void;
}

type Props = ParentProps & StateProps & DispatchProps & RouteComponentProps

interface State {
  isOpenDestroyModal: boolean;
  isOpenCancelModal: boolean;
}

class CategoryItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false,
      isOpenCancelModal: false
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickListIcon = this.handleClickListIcon.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.category.name !== this.props.editCategoryStore.category.name ||
      this.props.category.balance_of_payments !== this.props.editCategoryStore.category.balance_of_payments
  }

  editing(): boolean {
    return this.props.editCategoryStore.isEditing && this.props.category.id == this.props.editCategoryStore.category.id
  }

  handleClickEditIcon(): void {
    if (this.props.editCategoryStore.isEditing) {
      this.props.openAlertModal('editing')
    } else {
      this.props.editCategory(this.props.category)
    }
  }

  handleClickCancelIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.exitCategory()
    }
  }

  handleClickCancelButton(): void {
    this.setState({
      isOpenCancelModal: false
    })
    this.props.exitCategory()
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
      ...this.props.editCategoryStore.category,
      name: e.target.value
    }
    this.props.editCategory(category)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    const category = {
      ...this.props.editCategoryStore.category,
      balance_of_payments: toBoolean(e.target.value)
    }
    this.props.editCategory(category)
  }

  handleClickClose(): void {
    this.setState({
      isOpenDestroyModal: false,
      isOpenCancelModal: false
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

  handleClickListIcon(): void {
    const today = new Date()
    const params = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      order: 'published_at',
      page: 1,
      category_id: this.props.category.id
    }
    this.props.history.push({
      pathname: '/list',
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickSubmitButton(): void {
    const category = this.props.editCategoryStore.category
    this.props.patchCategory(category.id, category)
  }

  render(): JSX.Element {
    return (
      <tr className={'category-item-component' + (this.props.category.id === this.props.editCategoryStore.editedCategoryId ? ' edited' : '')}>
        <td>
          {this.editing() && (
            <ValidationErrorMessages errors={this.props.editCategoryStore.errors} />
          )}
          {this.editing() ? (
            <CategoryForm
              categoryStore={this.props.editCategoryStore}
              onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown} />
          ) : (
            <CategoryName balanceOfPayments={this.props.category.balance_of_payments} name={this.props.category.name} />
          )}
        </td>
        <td className='icon-field'>
          <CancelModal
            isOpen={this.state.isOpenCancelModal}
            onClickCancel={this.handleClickCancelButton}
            onClickClose={this.handleClickClose} />
          {this.editing() ? (
            <Cancel onClickIcon={this.handleClickCancelIcon} />
          ) : (
            <Edit onClickIcon={this.handleClickEditIcon} />
          )}
        </td>
        <td className='icon-field'>
          <Trash onClickIcon={this.handleClickTrashIcon}/>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose} />
        </td>
        <td className='icon-field piped'>
          <span className='span' onClick={this.handleClickListIcon}>
            <i className='far fa-list-alt' />
          </span>
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editCategoryStore: state.editCategory
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchCategory(id: number, category: CategoryParams): void {
      dispatch(patchCategory(id, category)).then(() => {
        dispatch(getCategories()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedCategory())
          }, 3000)
        })
      })
    },
    editCategory(category: Category): void {
      dispatch(editCategory(category))
    },
    exitCategory(): void {
      dispatch(exitCategory())
    },
    deleteCategory(categoryId: number): void {
      dispatch(deleteCategory(categoryId)).then(() => {
        dispatch(getCategories())
      })
    },
    openAlertModal(messageType: string): void {
      dispatch(openAlertModal(messageType))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(CategoryItem))
