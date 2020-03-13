import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { toBoolean } from 'modules/toBoolean'
import { postRecord, changeCategory, changeBalanceOfPayments } from 'actions/newRecordActions'
import { RecordParams, Category } from 'types/api'
import { NewRecordStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import RecordForm from 'components/input/recordForm'

interface StateProps {
  newRecord: NewRecordStore;
}

interface DispatchProps {
  postRecord: (params: RecordParams) => void;
  changeCategory: (category: Category | undefined) => void;
  changeBalanceOfPayments: (balance_of_payments: boolean) => void;
}

type Props = StateProps & DispatchProps

class NewRecordFormContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
  }

  handleChangeCategory(category: Category | undefined): void {
    this.props.changeCategory(category)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeBalanceOfPayments(toBoolean(e.target.value))
  }

  render(): JSX.Element {
    return (
      <div className='new-record-form-component col-md-4'>
        <RecordForm
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeCategory={this.handleChangeCategory}
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
    changeBalanceOfPayments(balance_of_payments: boolean): void {
      dispatch(changeBalanceOfPayments(balance_of_payments))
    }
  }
}

export default connect(mapState, mapDispatch)(NewRecordFormContainer)
