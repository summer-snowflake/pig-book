import React, { Component } from 'react'
import DatePicker from 'react-datepicker'

import { Category } from 'types/api'
import { NewRecordStore, EditRecordStore } from 'types/store'
import CurrencyBadge from 'components/common/CurrencyBadge'
import BalanceOfPaymentsRadios from 'components/common/BalanceOfPaymentsRadios'
import CategorySelectBox from 'components/common/CategorySelectBox'
import TodayButton from 'components/input/TodayButton'
import BreakdownSelectBox from 'components/input/BreakdownSelectBox'
import PlaceSelectBox from 'components/input/PlaceSelectBox'
import TagsSelectField from 'components/input/TagsSelectField'

import 'stylesheets/datepicker/datepicker.sass'
import 'stylesheets/datepicker/datepicker-overrides.sass'

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
    this.isCashlessRange = this.isCashlessRange.bind(this)
  }

  handleClickTodayButton(): void {
    const today = new Date()
    this.props.onChangePublishedOn(today)
  }

  isCashlessRange(): boolean {
    const publishedTime = this.props.store.record.published_on.getTime()
    const startTime = new Date(2019, 9, 1, 0, 0, 0).getTime() // 2019/10/01
    const endTime = new Date(2020, 5, 30, 23, 59, 59).getTime() // 2020/06/30
    return (publishedTime >= startTime && publishedTime <= endTime)
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
          <BalanceOfPaymentsRadios
            category={this.props.store.record.category}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
            recordId={this.props.store.record.id}
          />
          <CategorySelectBox
            balanceOfPayments={this.props.store.record.category.balance_of_payments}
            onChangeCategory={this.props.onChangeCategory}
            selectedCategoryId={this.props.store.record.category.id}
          />
        </div>
        <div className='form-group row'>
          <BreakdownSelectBox
            breakdowns={this.props.store.breakdowns}
            defaultBreakdownId={this.props.store.record.breakdown_id}
            isLoading={this.props.store.isLoading}
            onChangeBreakdown={this.props.onChangeBreakdown} />
        </div>
        <div className='form-group row'>
          <PlaceSelectBox
            defaultPlaceId={this.props.store.record.place_id}
            isLoading={this.props.store.isLoading}
            onChangePlace={this.props.onChangePlace}
            places={this.props.store.places} />
        </div>
        <div className='form-group'>
          <TagsSelectField recordTags={this.props.store.record.tags} recordId={this.props.store.record.id} />
        </div>
        <div className='form-group row'>
          <CurrencyBadge currency={this.props.currency} />
          <input
            className='form-control'
            onChange={this.props.onChangeCharge}
            placeholder={'0'}
            type='text'
            value={this.props.store.record.charge}
          />
          {this.isCashlessRange() && (
            <div>
              <span className='cashless-gadge green'>
                <i className='far fa-check-square' />
              </span>
              <input
                className='form-control number'
                onChange={this.props.onChangeCashlessCharge}
                placeholder={'0'}
                type='text'
                value={this.props.store.record.cashless_charge}
              />
            </div>
          )}
          <span className='point-badge green'>
            <i className='fas fa-parking' />
          </span>
          <input
            className='form-control'
            onChange={this.props.onChangePoint}
            placeholder={'0'}
            type='text'
            value={this.props.store.record.point} />
          </div>
        <div className='form-group'>
          <textarea
            className='text-form-control'
            onChange={this.props.onChangeMemo}
            rows={3}
            value={this.props.store.record.memo} />
        </div>
      </div>
    )
  }
}

export default RecordForm
