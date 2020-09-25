import React, { Component } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'

import { RecordParams, Category, RecordSearchParams } from 'types/api'
import { EditRecordStore, ProfileStore, RecordSearchStore } from 'types/store'
import { RouteComponentProps } from 'types/react-router'
import { toBoolean } from 'modules/toBoolean'
import { customModalStyles } from 'modules/modalStyles'
import { patchRecord, clearEditedRecord, changeCategory, changeBalanceOfPayments, changePublishedOn, changeBreakdown, changePlace, changeCharge, changeCashlessCharge, changePoint, changeMemo } from 'actions/editRecordActions'
import { getCategory, getEditRecordCategory } from 'actions/categoryActions'
import { getRecords, setRecordSearchParams } from 'actions/recordsActions'
import { RootState } from 'reducers/rootReducer'
import CloseButton from 'components/common/closeButton'
import UpdateButton from 'components/common/updateButton'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import RecordForm from 'components/input/recordForm'

interface ParentProps {
  isOpen: boolean;
  onClickClose: () => void;
}

interface StateProps {
  profileStore: ProfileStore;
  editRecordStore: EditRecordStore;
  recordSearchStore: RecordSearchStore;
}

interface DispatchProps {
  patchRecord: (recordId: number, params: RecordParams, searchParams: RecordSearchParams) => void;
  getCategory: (categoryId: number) => void;
  getEditRecordCategory: (categoryId: number) => void;
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

type Props = ParentProps & RouteComponentProps & StateProps & DispatchProps

class EditRecordModalContainer extends Component<Props> {
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
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
  }

  handleChangeCategory(category: Category | undefined): void {
    this.props.changeCategory(category)
    if (category) {
      this.props.getEditRecordCategory(category.id)
    }
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangePublishedOn(date: Date): void {
    let params = this.props.recordSearchStore
    if (this.props.recordSearchStore.date) {
      params = {
        ...this.props.recordSearchStore,
        date: date
      }
    } else {
      params = {
        ...this.props.recordSearchStore,
        page: (this.props.recordSearchStore.year !== date.getFullYear() || this.props.recordSearchStore.month !== date.getMonth() + 1) ? 1 : this.props.recordSearchStore.page,
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    }
    this.props.setRecordSearchParams(params)
    this.props.changePublishedOn(date)
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

  handleClickUpdateButton(): void {
    const params = {
      published_at: String(this.props.editRecordStore.record.published_on),
      category_id: this.props.editRecordStore.record.category.id || NaN,
      breakdown_id: this.props.editRecordStore.record.breakdown_id,
      place_id: this.props.editRecordStore.record.place_id,
      currency: this.props.profileStore.currency,
      charge: this.props.editRecordStore.record.charge,
      cashless_charge: this.props.editRecordStore.record.cashless_charge || 0,
      point: this.props.editRecordStore.record.point || 0,
      memo: this.props.editRecordStore.record.memo,
      tags: this.props.editRecordStore.record.tags
    }
    this.props.patchRecord(this.props.editRecordStore.record.id, params, this.props.recordSearchStore)
    this.props.history.push({
      search: ''
    })
  }

  render(): JSX.Element {
    return (
      <div className='edit-record-modal-component modal'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customModalStyles(40)}
            >
              <div className='modal-body'>
                {this.props.editRecordStore.errors.length > 0 && (
                  <div className='validation-errors-field'>
                    <ValidationErrorMessages messages={this.props.editRecordStore.errors} />
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
                  store={this.props.editRecordStore}
                />
                <UpdateButton onClickButton={this.handleClickUpdateButton} />
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile,
    editRecordStore: state.editRecord,
    recordSearchStore: state.recordSearch
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchRecord(recordId: number, params: RecordParams, searchParams: RecordSearchParams): void {
      dispatch(patchRecord(recordId, params)).then(() => (
        dispatch(getRecords(searchParams)).then(() => {
          setTimeout(() => {
            dispatch(clearEditedRecord())
          }, 3000)
        })
      ))
    },
    changeCategory(category: Category | undefined): void {
      dispatch(changeCategory(category))
    },
    getCategory(categoryId: number): void {
      dispatch(getCategory(categoryId))
    },
    getEditRecordCategory(categoryId: number): void {
      dispatch(getEditRecordCategory(categoryId))
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

export default connect(mapState, mapDispatch)(withRouter(EditRecordModalContainer))
