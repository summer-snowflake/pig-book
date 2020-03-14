import React, { Component } from 'react'
import DatePicker from 'react-datepicker'

import { Record, Category } from 'types/api'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'
import CategorySelectBoxContainer from 'components/settings/category/categorySelectBoxContainer'

import 'stylesheets/datepicker/datepicker.sass'
import 'stylesheets/datepicker/datepicker-overrides.sass'

interface Props {
  record: Record;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (category: Category | undefined) => void;
  onChangePublishedOn: (date: Date) => void;
}

class RecordForm extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='record-form-component'>
        <div className='form-group date-picker'>
          <DatePicker
            className='form-control'
            dateFormat='yyyy/MM/dd'
            onChange={this.props.onChangePublishedOn}
            selected={this.props.record.published_on}
          />
        </div>
        <div className='form-group row'>
          <div className='col-auto category-radio'>
            <BalanceOfPaymentsRadios
              category={this.props.record.category}
              onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
            />
          </div>
          <div className='col-md-6'>
            <CategorySelectBoxContainer
              balanceOfPayments={this.props.record.category.balance_of_payments}
              onChangeCategory={this.props.onChangeCategory}
              selectedCategoryId={this.props.record.category.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RecordForm
