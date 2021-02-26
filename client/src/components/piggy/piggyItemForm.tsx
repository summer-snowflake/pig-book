import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'

import { PiggyBank } from 'types/api'
import { NewPiggyItemStore } from 'types/store'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'
import ValidationErrorMessages from 'components/common/validationErrorMessages'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangePublishedOn: (date: Date) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCharge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  piggyItemStore: NewPiggyItemStore;
  piggyBank: PiggyBank;
}

type Props = ParentProps & I18nProps

class PiggyItemForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='piggy-item-form-component'>
        {this.props.piggyItemStore.errors.length > 0 && (
          <div className='validation-errors-field'>
            <ValidationErrorMessages messages={this.props.piggyItemStore.errors} />
          </div>
        )}
        <div className='form-group'>
          <div className='col'>
            <DatePicker
              className='form-control'
              dateFormat='yyyy/MM/dd'
              onChange={this.props.onChangePublishedOn}
              selected={this.props.piggyItemStore.publishedOn}
            />
          </div>
        </div>
        <div className='form-group col-auto category-radio'>
          <BalanceOfPaymentsRadios
            category={this.props.piggyItemStore}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
            labelDisabled={true}
          />
        </div>
        <div className='form-group'>
          <div className='col currency-field'>
            <input
              autoComplete={'off'}
              className='form-control'
              disabled={this.props.piggyItemStore.isLoading}
              name='piggy-item-name'
              onChange={this.props.onChangeName}
              onKeyDown={this.props.onKeyDown}
              type='text'
              value={this.props.piggyItemStore.name}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='col currency-field'>
            <span className='badge-field'>
              <span className="currency-badge-component badge badge-pill badge-light green">
                {t('label.currency-unit-' + this.props.piggyBank.currency)}
              </span>
            </span>
            <input
              autoComplete={'off'}
              className='form-control'
              name='piggy-item-charge'
              onChange={this.props.onChangeCharge}
              onKeyDown={this.props.onKeyDown}
              placeholder={'0'}
              type='text'
              value={this.props.piggyItemStore.charge}
            />
          </div>
        </div>
        <div className='form-group col'>
          <button
            className='btn btn-primary'
            disabled={this.props.piggyItemStore.isLoading}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {t('button.set')}
          </button>
        </div>
      </form>
    )
  }
}

export default withTranslation()(PiggyItemForm)
