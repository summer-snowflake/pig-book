import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { CategoryParams } from 'types/api'
import { NewCategoryStore } from 'types/store'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import CategoryForm from 'components/settings/category/categoryForm'
import { postCategory, changeCategoryBalanceOfPayments, changeCategoryName } from 'actions/categoryActions'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import { toBoolean } from 'modules/toBoolean'

interface StateProps {
  newCategory: NewCategoryStore;
}

interface DispatchProps {
  postCategory: (params: CategoryParams) => void;
  changeCategoryBalanceOfPayments: (balance_of_payments: boolean) => void;
  changeCategoryName: (name: string) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class CategoryPostForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.newCategory.name !== ''
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeCategoryBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeCategoryName(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = {
      balance_of_payments: this.props.newCategory.balance_of_payments,
      name: this.props.newCategory.name
    }

    this.props.postCategory(params)
  }

  render(): JSX.Element {
    return (
      <div className='category-create-form-component'>
        <CategoryForm
          category={this.props.newCategory}
          disabled={this.props.newCategory.isLoading || !this.diff()}
          isLoading={this.props.newCategory.isLoading}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
        />
        <ValidationErrorMessages messages={this.props.newCategory.errors} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newCategory: state.newCategory
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postCategory(params: CategoryParams): void {
      dispatch(postCategory(params)).then(() => {
        dispatch(getCategories())
      })
    },
    changeCategoryBalanceOfPayments(balanceOfPayments: boolean): void {
      dispatch(changeCategoryBalanceOfPayments(balanceOfPayments))
    },
    changeCategoryName(name: string): void {
      dispatch(changeCategoryName(name))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(CategoryPostForm))
