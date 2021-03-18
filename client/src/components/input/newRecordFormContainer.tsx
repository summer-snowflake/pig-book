import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { withRouter } from 'react-router-dom'

import { RecordParams, Category, RecordSearchParams } from 'types/api'
import { NewRecordStore, ProfileStore, RecordSearchStore } from 'types/store'
import { RouteComponentProps } from 'types/react-router'
import { toBoolean } from 'modules/toBoolean'
import { postRecord } from 'actions/newRecordActions'
import {
  changeCategory,
  changeBalanceOfPayments,
  changePublishedOn,
  changeBreakdown,
  changePlace,
  changeCharge,
  changeCashlessCharge,
  changePoint,
  changeMemo
} from 'actions/newRecordStoreActions'
import { getCategory } from 'actions/categoryActions'
import { clearEditedRecord } from 'actions/editRecordStoreActions'
import { getRecords } from 'actions/recordsActions'
import { setRecordSearchParams } from 'actions/recordsStoreActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import CreateButton from 'components/common/createButton'
import RecordForm from 'components/input/recordForm'

interface StateProps {
  profileStore: ProfileStore;
  newRecordStore: NewRecordStore;
  recordSearchStore: RecordSearchStore;
}

interface DispatchProps {
  getRecords: (searchParams: RecordSearchParams) => void;
  postRecord: (params: RecordParams, searchParams: RecordSearchParams) => void;
  getCategory: (categoryId: number) => void;
  changeCategory: (category: Category | undefined) => void;
  changeBalanceOfPayments: (balance_of_payments: boolean) => void;
  changePublishedOn: (date: Date) => void;
  changeBreakdown: (breakdownId: number) => void;
  changePlace: (placeId: number) => void;
  changeCharge: (charge: number | string) => void;
  changePoint: (point: number | string) => void;
  changeCashlessCharge: (charge: number | string) => void;
  changeMemo: (memo: string) => void;
  setRecordSearchParams: (params: RecordSearchParams) => void;
}

type Props = RouteComponentProps & StateProps & DispatchProps

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
    // 入力する画面のとき
    let params = {}
    if (this.props.recordSearchStore.date) {
      params = {
        ...this.props.recordSearchStore,
        date: date
      }
      this.props.getRecords(params)
    } else {
      params = {
        date: null,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        order: 'published_at'
      }
    }
    this.props.setRecordSearchParams(params)
  }

  handleChangeBreakdown(breakdownId: number): void {
    this.props.changeBreakdown(breakdownId)
  }

  handleChangePlace(placeId: number): void {
    this.props.changePlace(placeId)
  }

  replaceToNumber(target: string): number | string {
    return target.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
    }).replace(',', '')
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
      published_at: String(this.props.newRecordStore.record.published_on),
      category_id: this.props.newRecordStore.record.category.id,
      breakdown_id: this.props.newRecordStore.record.breakdown_id,
      place_id: this.props.newRecordStore.record.place_id,
      currency: this.props.profileStore.currency,
      charge: this.props.newRecordStore.record.charge,
      cashless_charge: this.props.newRecordStore.record.cashless_charge || 0,
      point: this.props.newRecordStore.record.point || 0,
      memo: this.props.newRecordStore.record.memo,
      tags: this.props.newRecordStore.record.tags
    }
    let searchParams = {}
    if (this.props.recordSearchStore.date) {
      searchParams = {
        ...this.props.recordSearchStore,
        date: this.props.newRecordStore.record.published_on,
      }
    } else {
      searchParams = {
        ...this.props.recordSearchStore,
        date: null
      }
    }
    this.props.postRecord(params, searchParams)
    this.props.history.push({
      search: ''
    })
  }

  render(): JSX.Element {
    return (
      <div className='new-record-form-component'>
        {this.props.newRecordStore.errors.length > 0 && (
          <div className='validation-errors-field'>
            <ValidationErrorMessages messages={this.props.newRecordStore.errors} />
          </div>
        )}
        <RecordForm
          currency={this.props.profileStore.currency}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeBreakdown={this.handleChangeBreakdown}
          onChangeCashlessCharge={this.handleChangeCashlessCharge}
          onChangeCategory={this.handleChangeCategory}
          onChangeCharge={this.handleChangeCharge}
          onChangeMemo={this.handleChangeMemo}
          onChangePlace={this.handleChangePlace}
          onChangePoint={this.handleChangePoint}
          onChangePublishedOn={this.handleChangePublishedOn}
          store={this.props.newRecordStore}
        />
        <CreateButton onClickCreate={this.handleClickCreate} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile,
    newRecordStore: state.newRecord,
    recordSearchStore: state.recordSearch
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getRecords(searchParams: RecordSearchParams): void {
      dispatch(getRecords(searchParams))
    },
    postRecord(params: RecordParams, searchParams: RecordSearchParams): void {
      dispatch(postRecord(params)).then(() => (
        dispatch(getRecords(searchParams)).then(() => (
          setTimeout(() => {
            dispatch(clearEditedRecord())
          }, 3000)
        ))
      ))
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
    changeCharge(charge: number | string): void {
      dispatch(changeCharge(charge))
    },
    changeCashlessCharge(cashlessCharge: number | string): void {
      dispatch(changeCashlessCharge(cashlessCharge))
    },
    changePoint(point: number | string): void {
      dispatch(changePoint(point))
    },
    changeMemo(memo: string): void {
      dispatch(changeMemo(memo))
    },
    setRecordSearchParams(params: RecordSearchParams): void {
      dispatch(setRecordSearchParams(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(NewRecordFormContainer))
