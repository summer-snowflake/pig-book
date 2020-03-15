import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { RecordParams, Category } from 'types/api'
import { NewRecordStore, ProfileStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { postRecord, changeCategory, changeBalanceOfPayments, changePublishedOn, changeBreakdown, changePlace, changeCharge, changeCashlessCharge, changePoint, changeMemo } from 'actions/newRecordActions'
import { getCategory } from 'actions/categoryActions'
import { RootState } from 'reducers/rootReducer'
import CreateButton from 'components/common/createButton'
import RecordForm from 'components/input/recordForm'

interface StateProps {
  profile: ProfileStore;
  newRecord: NewRecordStore;
}

interface DispatchProps {
  postRecord: (params: RecordParams) => void;
  getCategory: (categoryId: number) => void;
  changeCategory: (category: Category | undefined) => void;
  changeBalanceOfPayments: (balance_of_payments: boolean) => void;
  changePublishedOn: (date: Date) => void;
  changeBreakdown: (breakdownId: number) => void;
  changePlace: (placeId: number) => void;
  changeCharge: (charge: number) => void;
  changePoint: (point: number) => void;
  changeCashlessCharge: (charge: number) => void;
  changeMemo: (memo: string) => void;
}

type Props = StateProps & DispatchProps

class NewRecordFormContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleChangeBreakdown = this.handleChangeBreakdown.bind(this)
    this.handleChangePlace = this.handleChangePlace.bind(this)
    this.handleChangeCharge = this.handleChangeCharge.bind(this)
    this.handleChangeCashlessCharge = this.handleChangeCashlessCharge.bind(this)
    this.handleChangePoint = this.handleChangePoint.bind(this)
    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickCreate = this.handleClickCreate.bind(this)
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

  handleChangeBreakdown(breakdownId: number): void {
    this.props.changeBreakdown(breakdownId)
  }

  handleChangePlace(placeId: number): void {
    this.props.changePlace(placeId)
  }

  replaceToNumber(target: string): number {
    const value = target.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
    }).replace(',', '')
    return Number(value) || 0
  }

  handleChangeCharge(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeCharge(this.replaceToNumber(e.target.value))
  }

  handleChangeCashlessCharge(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeCashlessCharge(this.replaceToNumber(e.target.value))
  }

  handleChangePoint(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changePoint(this.replaceToNumber(e.target.value))
  }

  handleChangeMemo(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.changeMemo(e.target.value)
  }

  handleClickCreate(): void {
    const params = {
      published_at: this.props.newRecord.record.published_on,
      category_id: this.props.newRecord.record.category.id,
      breakdown_id: this.props.newRecord.record.breakdown_id,
      place_id: this.props.newRecord.record.place_id,
      currency: this.props.profile.currency,
      charge: this.props.newRecord.record.charge,
      cashless_charge: this.props.newRecord.record.cashless_charge,
      point: this.props.newRecord.record.point,
      memo: this.props.newRecord.record.memo
    }
    this.props.postRecord(params)
  }

  render(): JSX.Element {
    return (
      <div className='new-record-form-component col-md-4'>
        <RecordForm
          currency={this.props.profile.currency}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeBreakdown={this.handleChangeBreakdown}
          onChangeCashlessCharge={this.handleChangeCashlessCharge}
          onChangeCategory={this.handleChangeCategory}
          onChangeCharge={this.handleChangeCharge}
          onChangeMemo={this.handleChangeMemo}
          onChangePlace={this.handleChangePlace}
          onChangePoint={this.handleChangePoint}
          onChangePublishedOn={this.handleChangePublishedOn}
          store={this.props.newRecord}
        />
        <CreateButton onClickCreate={this.handleClickCreate} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profile: state.profile,
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
    },
    changeBreakdown(breakdownId: number): void {
      dispatch(changeBreakdown(breakdownId))
    },
    changePlace(placeId: number): void {
      dispatch(changePlace(placeId))
    },
    changeCharge(charge: number): void {
      dispatch(changeCharge(charge))
    },
    changeCashlessCharge(cashlessCharge: number): void {
      dispatch(changeCashlessCharge(cashlessCharge))
    },
    changePoint(point: number): void {
      dispatch(changePoint(point))
    },
    changeMemo(memo: string): void {
      dispatch(changeMemo(memo))
    }
  }
}

export default connect(mapState, mapDispatch)(NewRecordFormContainer)
