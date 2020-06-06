import React, { Component } from 'react'
import DatePicker from 'react-datepicker'

import { Category } from 'types/api'
import CurrencyBadge from 'components/common/currencyBadge'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'
import CategorySelectBoxContainer from 'components/settings/category/categorySelectBoxContainer'
import BreakdownSelectBox from 'components/input/breakdownSelectBox'
import PlaceSelectBox from 'components/input/placeSelectBox'
import TodayButton from 'components/input/todayButton'
import TagsSelectForm from 'components/input/tagsSelectForm'

import 'stylesheets/datepicker/datepicker.sass'
import 'stylesheets/datepicker/datepicker-overrides.sass'
import { NewRecordStore, EditRecordStore } from 'types/store'

interface Props {
  store: NewRecordStore | EditRecordStore;
  currency: string;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (category: Category | undefined) => void;
  onChangeBreakdown: (breakdownId: number) => void;
  onChangePlace: (placeId: number) => void;
  onChangePublishedOn: (date: Date) => void;
  onChangeCharge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCashlessCharge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePoint: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

class RecordForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickTodayButton = this.handleClickTodayButton.bind(this)
  }

  handleClickTodayButton(): void {
    const today = new Date()
    this.props.onChangePublishedOn(today)
  }

  render(): JSX.Element {
    return (
      <div className='record-form-component'>
        <div className='form-group row date-picker-field'>
          <DatePicker
            className='form-control'
            dateFormat='yyyy/MM/dd'
            onChange={this.props.onChangePublishedOn}
            selected={this.props.store.record.published_on}
          />
          <TodayButton onClickTodayButton={this.handleClickTodayButton} />
        </div>
        <div className='form-group row'>
          <div className='col-auto category-radio'>
            <BalanceOfPaymentsRadios
              category={this.props.store.record.category}
              onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
              recordId={this.props.store.record.id}
            />
          </div>
          <div className='col-md-6'>
            <CategorySelectBoxContainer
              balanceOfPayments={this.props.store.record.category.balance_of_payments}
              onChangeCategory={this.props.onChangeCategory}
              selectedCategoryId={this.props.store.record.category.id}
            />
          </div>
        </div>
        <div className='form-group'>
          <BreakdownSelectBox
            breakdowns={this.props.store.breakdowns}
            defaultBreakdownId={this.props.store.record.breakdown_id}
            isLoading={this.props.store.isLoading}
            onChangeBreakdown={this.props.onChangeBreakdown}
          />
        </div>
        <div className='form-group'>
          <PlaceSelectBox
            defaultPlaceId={this.props.store.record.place_id}
            isLoading={this.props.store.isLoading}
            onChangePlace={this.props.onChangePlace}
            places={this.props.store.places}
          />
        </div>
        <div className='form-group'>
          <TagsSelectForm tags={this.props.store.record.tags} />
        </div>
        <div className='form-group row'>
          <div className='col-md-4 currency-field'>
            <span className='badge-field'>
              <CurrencyBadge currency={this.props.currency} />
            </span>
            <input
              className='form-control'
              onChange={this.props.onChangeCharge}
              placeholder={'0'}
              type='text'
              value={this.props.store.record.charge}
            />
          </div>
          <div className='col-md-3'>
            <span className='badge-field'>
              <span className='badge badge-pill badge-light'>
                <i className='far fa-check-square' />
              </span>
            </span>
            <input
              className='form-control number'
              onChange={this.props.onChangeCashlessCharge}
              placeholder={'0'}
              type='text'
              value={this.props.store.record.cashless_charge}
            />
          </div>
          <div className='col-md-3'>
            <span className='badge-field'>
              <span className='badge badge-pill badge-light'>
                <i className='fas fa-parking' />
              </span>
            </span>
            <input
              className='form-control'
              onChange={this.props.onChangePoint}
              placeholder={'0'}
              type='text'
              value={this.props.store.record.point}
            />
          </div>
        </div>
        <div className='form-group'>
          <textarea className='form-control' onChange={this.props.onChangeMemo} rows={3} value={this.props.store.record.memo} />
        </div>
      </div>
    )
  }
}

export default RecordForm
