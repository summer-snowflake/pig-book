import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Category } from 'types/api'

interface Props extends I18nProps {
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  category: Category;
}

class BalanceOfPaymentsRadios extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <span className='balance-of-payments-radios-component'>
        <span className='radio-span'>
          <input
            checked={this.props.category.balance_of_payments === true}
            className='radio-input'
            id={'category_balance_of_payments_income-' + this.props.category.id}
            name='category[balance_of_payments]'
            onChange={this.props.onChangeBalanceOfPayments}
            type='radio'
            value='true'
          />
          <label className='radio-label' htmlFor={'category_balance_of_payments_income-' + this.props.category.id}>
            <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
            <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
            {t('label.income')}
          </label>
        </span>
        <span className='radio-span'>
          <input
            checked={this.props.category.balance_of_payments === false}
            className='radio-input'
            id={'category_balance_of_payments_outgo-' + this.props.category.id}
            name='category[balance_of_payments]'
            onChange={this.props.onChangeBalanceOfPayments}
            type='radio'
            value='false'
          />
          <label className='radio-label' htmlFor={'category_balance_of_payments_outgo-' + this.props.category.id}>
            <FontAwesomeIcon className='left-icon' icon={['fas', 'check']} />
            <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
            {t('label.outgo')}
          </label>
        </span>
      </span>
    )
  }
}

export default withTranslation()(BalanceOfPaymentsRadios)
