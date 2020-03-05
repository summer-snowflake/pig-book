import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Category } from 'types/api'
import LoadingImage from 'components/common/loadingImage'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  category: Category;
  disabled: boolean;
  isLoading: boolean;
}

type Props = ParentProps & I18nProps

class CategoryForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='category-form-component form-row'>
        <div className='form-group col-auto category-radio'>
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
        </div>
        <div className='form-group col-md-4'>
          <input
            className='form-control'
            name='category_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.category.name}
          />
        </div>
        <div className='form-group col-auto'>
          <button
            className='btn btn-primary'
            disabled={this.props.disabled}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {this.props.category.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
        {this.props.isLoading && (
          <LoadingImage />
        )}
      </form>
    )
  }
}

export default withTranslation()(CategoryForm)
