import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { EditPiggyBankStore, NewPiggyBankStore } from 'types/store'
import ValidationErrorMessages from 'components/common/validationErrorMessages'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSubmitButton: () => void;
  piggyBankStore: NewPiggyBankStore | EditPiggyBankStore;
}

type Props = ParentProps & I18nProps

class PiggyBankForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='piggy-bank-form-component'>
        {this.props.piggyBankStore.errors.length > 0 && (
          <div className='validation-errors-field'>
            <ValidationErrorMessages messages={this.props.piggyBankStore.errors} />
          </div>
        )}
        <div className='form-group'>
          <div className='col text-right'>
            {t('label.currency')}：
            {t('label.currency-unit-' + this.props.piggyBankStore.currency)}
          </div>
        </div>
        <div className='form-group'>
          <div className='col currency-field'>
            <input
              autoComplete={'off'}
              className='form-control'
              disabled={this.props.piggyBankStore.isLoading}
              name='piggy_bank_title'
              onChange={this.props.onChangeTitle}
              onKeyDown={this.props.onKeyDown}
              placeholder={t('label.title')}
              type='text'
              value={this.props.piggyBankStore.title}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='col currency-field'>
            <textarea
              autoComplete={'off'}
              className='form-control'
              disabled={this.props.piggyBankStore.isLoading}
              name='piggy_bank_description'
              onChange={this.props.onChangeDescription}
              placeholder={t('label.description')}
              rows={8}
              value={this.props.piggyBankStore.description}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='col'>
            <button
              className='btn btn-primary'
              disabled={this.props.piggyBankStore.isLoading}
              onClick={this.props.onClickSubmitButton}
              type='button'
            >
              {this.props.piggyBankStore && this.props.piggyBankStore.id ? (
                <span>{t('button.update')}</span>
              ) : (
                <span>{t('button.add')}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default withTranslation()(PiggyBankForm)
