import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { CategoryParams } from 'types/api'
import { NewCategoryStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { postCategory } from 'actions/categoryActions'
import { clearEditedCategory, newCategory } from 'actions/categoryStoreActions'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import CategoryForm from 'components/settings/category/CategoryForm'

interface StateProps {
  newCategoryStore: NewCategoryStore;
}

interface DispatchProps {
  postCategory: (params: CategoryParams) => void;
  newCategory: (category: CategoryParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class NewCategoryField extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    const category = {
      ...this.props.newCategoryStore.category,
      balance_of_payments: toBoolean(e.target.value)
    }
    this.props.newCategory(category)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const category = {
      ...this.props.newCategoryStore.category,
      name: e.target.value
    }
    this.props.newCategory(category)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = this.props.newCategoryStore.category
    this.props.postCategory(params)
  }

  render(): JSX.Element {
    return (
      <div className='category-create-form-component'>
        <ValidationErrorMessages errors={this.props.newCategoryStore.errors} />
        <CategoryForm
          categoryStore={this.props.newCategoryStore}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newCategoryStore: state.newCategory
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postCategory(params: CategoryParams): void {
      dispatch(postCategory(params)).then(() => {
        dispatch(getCategories()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedCategory())
          }, 3000)
        })
      })
    },
    newCategory(category: CategoryParams): void {
      dispatch(newCategory(category))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(NewCategoryField))
