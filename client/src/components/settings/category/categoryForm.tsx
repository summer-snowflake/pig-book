import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  handleKeyDown: any,
  handleChangeName: any,
  handleChangeBalanceOfPayments: any,
  handleClickSubmitButton: any,
  disabled: boolean,
  category: {
    id: number,
    name: string,
    balance_of_payments: boolean
  }
}

class CategoryForm extends Component<i18nProps & Props> {
  render() {
    const { t } = this.props;

    return (
      <form className='category-form-component form-row'>
        <div className='form-group col-auto category-radio'>
          <span className='radio-span'>
            <input
              className='radio-input'
              checked={this.props.category.balance_of_payments === true}
              onChange={this.props.handleChangeBalanceOfPayments}
              name='category[balance_of_payments]'
              id={'category_balance_of_payments_income-' + this.props.category.id}
              value='true'
              type='radio' />
            <label className='radio-label' htmlFor={'category_balance_of_payments_income-' + this.props.category.id}>
              <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
              <FontAwesomeIcon icon={['fas', 'plus-square']} className='left-icon blue' />
              {t('label.income')}
            </label>
          </span>
          <span className='radio-span'>
            <input
              className='radio-input'
              checked={this.props.category.balance_of_payments === false}
              onChange={this.props.handleChangeBalanceOfPayments}
              name='category[balance_of_payments]'
              value='false'
              id={'category_balance_of_payments_outgo-' + this.props.category.id}
              type='radio' />
            <label className='radio-label' htmlFor={'category_balance_of_payments_outgo-' + this.props.category.id}>
              <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
              <FontAwesomeIcon icon={['fas', 'minus-square']} className='left-icon red' />
              {t('label.outgo')}
            </label>
          </span>
        </div>
        <div className='form-group col-md-4'>
          <input
            type='text'
            className='form-control'
            name='category_name'
            value={this.props.category.name}
            onKeyDown={this.props.handleKeyDown}
            onChange={this.props.handleChangeName} />
        </div>
        <div className='form-group col-auto'>
          <button
            className='btn btn-primary'
            onClick={this.props.handleClickSubmitButton}
            disabled={this.props.disabled}
            type='button'>
            {this.props.category.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
      </form>
    );
  }
}

export default withTranslation()(CategoryForm);
