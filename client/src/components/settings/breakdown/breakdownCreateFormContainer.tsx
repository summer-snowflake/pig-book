import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { BreakdownParams, Category } from 'types/api'
import { NewBreakdownStore, NewCategoryStore } from 'types/store'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import BreakdownForm from 'components/settings/breakdown/breakdownForm'
import { postBreakdown } from 'actions/breakdownActions'
import { changeBreakdownName, changeCategory, clearEditedBreakdown } from 'actions/breakdownStoreActions'
import { getBreakdowns } from 'actions/breakdownsActions'
import { RootState } from 'reducers/rootReducer'
import { changeCategoryBalanceOfPayments } from 'actions/categoryActions'
import { toBoolean } from 'modules/toBoolean'

interface StateProps {
  newCategoryStore: NewCategoryStore;
  newBreakdownStore: NewBreakdownStore;
}

interface DispatchProps {
  postBreakdown: (params: BreakdownParams) => void;
  changeBreakdownName: (name: string) => void;
  changeCategory: (category: Category | undefined) => void;
  changeCategoryBalanceOfPayments: (balanceOfPayments: boolean) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class BreakdownPostForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.newBreakdownStore.name !== ''
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeCategoryBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeBreakdownName(e.target.value)
  }

  handleChangeCategory(category: Category | undefined): void {
    this.props.changeCategory(category)
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
      category_id: this.props.newBreakdownStore.category_id,
      name: this.props.newBreakdownStore.name
    }

    this.props.postBreakdown(params)
  }

  render(): JSX.Element {
    return (
      <div className='breakdown-create-form-component'>
        <BreakdownForm
          breakdown={this.props.newBreakdownStore}
          category={this.props.newCategoryStore}
          disabled={this.props.newBreakdownStore.isLoading || !this.diff()}
          isLoading={this.props.newBreakdownStore.isLoading}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeCategory={this.handleChangeCategory}
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
        />
        <ValidationErrorMessages messages={this.props.newBreakdownStore.errors} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newBreakdownStore: state.newBreakdown,
    newCategoryStore: state.newCategory
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postBreakdown(params: BreakdownParams): void {
      dispatch(postBreakdown(params)).then(() => {
        dispatch(getBreakdowns()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedBreakdown())
          }, 3000)
        })
      })
    },
    changeCategoryBalanceOfPayments(balanceOfPayments: boolean): void {
      dispatch(changeCategoryBalanceOfPayments(balanceOfPayments))
    },
    changeCategory(category: Category | undefined): void {
      dispatch(changeCategory(category))
    },
    changeBreakdownName(name: string): void {
      dispatch(changeBreakdownName(name))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(BreakdownPostForm))
