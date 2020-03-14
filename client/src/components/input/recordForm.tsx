import React, { Component } from 'react'
import DatePicker from 'react-datepicker'

import { Category } from 'types/api'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'
import CategorySelectBoxContainer from 'components/settings/category/categorySelectBoxContainer'
import BreakdownSelectBox from 'components/input/breakdownSelectBox'
import TodayButton from 'components/input/todayButton'

import 'stylesheets/datepicker/datepicker.sass'
import 'stylesheets/datepicker/datepicker-overrides.sass'
import { NewRecordStore } from 'types/store'

interface Props {
  store: NewRecordStore;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (category: Category | undefined) => void;
  onChangeBreakdown: (breakdownId: number) => void;
  onChangePublishedOn: (date: Date) => void;
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
        <div className='form-group row'>
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
      </div>
    )
  }
}

export default RecordForm
