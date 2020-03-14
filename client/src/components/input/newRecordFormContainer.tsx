import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { RecordParams, Category } from 'types/api'
import { NewRecordStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { postRecord, changeCategory, changeBalanceOfPayments, changePublishedOn } from 'actions/newRecordActions'
import { getCategory } from 'actions/categoryActions'
import { RootState } from 'reducers/rootReducer'
import RecordForm from 'components/input/recordForm'

interface StateProps {
  newRecord: NewRecordStore;
}

interface DispatchProps {
  postRecord: (params: RecordParams) => void;
  changeCategory: (category: Category | undefined) => void;
  changeBalanceOfPayments: (balance_of_payments: boolean) => void;
  changePublishedOn: (date: Date) => void;
  getCategory: (categoryId: number) => void;
}

type Props = StateProps & DispatchProps

class NewRecordFormContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
  }

  handleChangeCategory(category: Category | undefined): void {
    this.props.changeCategory(category)
    if (category) {
      this.props.getCategory(category.id)
    }
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangePublishedOn(date: Date): void {
    this.props.changePublishedOn(date)
  }

  render(): JSX.Element {
    return (
      <div className='new-record-form-component col-md-4'>
        <RecordForm
          breakdowns={this.props.newRecord.breakdowns}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeCategory={this.handleChangeCategory}
          onChangePublishedOn={this.handleChangePublishedOn}
          record={this.props.newRecord.record}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newRecord: state.newRecord
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postRecord(params: RecordParams): void {
      dispatch(postRecord(params))
    },
    changeCategory(category: Category | undefined): void {
      dispatch(changeCategory(category))
    },
    getCategory(categoryId: number): void {
      dispatch(getCategory(categoryId))
    },
    changeBalanceOfPayments(balance_of_payments: boolean): void {
      dispatch(changeBalanceOfPayments(balance_of_payments))
    },
    changePublishedOn(date: Date): void {
      dispatch(changePublishedOn(date))
    }
  }
}

export default connect(mapState, mapDispatch)(NewRecordFormContainer)
