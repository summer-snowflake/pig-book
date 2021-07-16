import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { Breakdown, BreakdownParams, Category } from 'types/api'
import { NewBreakdownStore, NewCategoryStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { postBreakdown } from 'actions/breakdownActions'
import { clearEditedBreakdown, newBreakdown } from 'actions/breakdownStoreActions'
import { getBreakdowns } from 'actions/breakdownsActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import BreakdownForm from 'components/settings/breakdown/BreakdownForm'

interface StateProps {
  newCategoryStore: NewCategoryStore;
  newBreakdownStore: NewBreakdownStore;
}

interface DispatchProps {
  postBreakdown: (params: BreakdownParams) => void;
  newBreakdown: (breakdown: Breakdown) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class NewBreakdownField extends Component<Props> {
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
    const breakdown = {
      ...this.props.newBreakdownStore.breakdown,
      category: {
        ...this.props.newBreakdownStore.breakdown.category,
        balance_of_payments: toBoolean(e.target.value)
      }
    }
    this.props.newBreakdown(breakdown)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const breakdown = {
      ...this.props.newBreakdownStore.breakdown,
      name: e.target.value
    }
    this.props.newBreakdown(breakdown)
  }

  handleChangeCategory(category: Category | undefined): void {
    const breakdown = {
      ...this.props.newBreakdownStore.breakdown,
      category_id: category?.id || 0,
      category: category || {
        id: 0,
        name: '',
        balance_of_payments: false
      }
    }
    this.props.newBreakdown(breakdown)
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
      category_id: this.props.newBreakdownStore.breakdown.category_id,
      name: this.props.newBreakdownStore.breakdown.name
    }

    this.props.postBreakdown(params)
  }

  render(): JSX.Element {
    return (
      <div className='breakdown-create-form-component'>
        <ValidationErrorMessages errors={this.props.newBreakdownStore.errors} />
        <BreakdownForm
          breakdownStore={this.props.newBreakdownStore}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeCategory={this.handleChangeCategory}
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
    newBreakdown(breakdown: Breakdown): void {
      dispatch(newBreakdown(breakdown))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(NewBreakdownField))
