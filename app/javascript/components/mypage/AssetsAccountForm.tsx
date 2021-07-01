import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { EditAssetsAccountStore, NewAssetsAccountStore } from 'types/store'
import BalanceOfPaymentsRadios from 'components/common/BalanceOfPaymentsRadios'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'

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
        <ValidationErrorMessages errors={this.props.assetsAccountStore.errors} />
        <div className='form-group wide'>
          <input
            autoComplete={'off'}
            className='form-control'
            disabled={this.props.assetsAccountStore.isLoading}
            name='assets_account_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            placeholder={t('placeholder.assetsAccountName')}
            type='text'
            value={this.props.assetsAccountStore.name}
          />
        </div>
        <div className='form-group row'>
          <BalanceOfPaymentsRadios
            category={this.props.assetsAccountStore}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
            labelDisabled={true}
          />
          <span className='currency-badge'>
            {t('label.currency-unit-' + this.props.assetsAccountStore.currency)}
          </span>
          <input
            autoComplete={'off'}
            className='form-control'
            name='assets_account_money'
            onChange={this.props.onChangeMoney}
            onKeyDown={this.props.onKeyDown}
            placeholder={'0'}
            type='text'
            value={this.props.assetsAccountStore.money}
          />
        </div>
        <button
          className='btn btn-primary'
          disabled={this.props.assetsAccountStore.isLoading}
          onClick={this.props.onClickSubmitButton}
          type='button'>
          {t('button.set')}
        </button>
      </form>
    )
  }
}

export default withTranslation()(AssetsAccountForm)
