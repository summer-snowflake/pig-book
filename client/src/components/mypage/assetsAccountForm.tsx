import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { EditAssetsAccountStore, NewAssetsAccountStore } from 'types/store'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'
import ValidationErrorMessages from 'components/common/validationErrorMessages'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMoney: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  assetsAccountStore: NewAssetsAccountStore | EditAssetsAccountStore;
}

type Props = ParentProps & I18nProps

class AssetsAccountForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='assets-account-form-component'>
        {this.props.assetsAccountStore.errors.length > 0 && (
          <div className='validation-errors-field'>
            <ValidationErrorMessages messages={this.props.assetsAccountStore.errors} />
          </div>
        )}
        <div className='form-group col-auto category-radio'>
          <BalanceOfPaymentsRadios
            category={this.props.assetsAccountStore}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
            labelDisabled={true}
          />
        </div>
        <div className='form-group'>
          <div className='col-md-8 currency-field'>
            <input
              autoComplete={'off'}
              className='form-control'
              disabled={this.props.assetsAccountStore.isLoading}
              name='category_name'
              onChange={this.props.onChangeName}
              onKeyDown={this.props.onKeyDown}
              type='text'
              value={this.props.assetsAccountStore.name}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='col-md-8 currency-field'>
            <span className='badge-field'>
              <span className="currency-badge-component badge badge-pill badge-light green">
                {t('label.currency-unit-' + this.props.assetsAccountStore.currency)}
              </span>
            </span>
            <input
              autoComplete={'off'}
              className='form-control'
              name='category_name'
              onChange={this.props.onChangeMoney}
              onKeyDown={this.props.onKeyDown}
              placeholder={'0'}
              type='text'
              value={this.props.assetsAccountStore.money}
            />
          </div>
        </div>
        <div className='form-group col'>
          <button
            className='btn btn-primary'
            disabled={this.props.assetsAccountStore.isLoading}
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

export default withTranslation()(AssetsAccountForm)
