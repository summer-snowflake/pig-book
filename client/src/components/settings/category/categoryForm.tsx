import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Category } from 'types/api'
import LoadingImage from 'components/common/loadingImage'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'

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
          <BalanceOfPaymentsRadios
            category={this.props.category}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
          />
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
        <div className='loading-image-form'>
          {this.props.isLoading && (
            <LoadingImage />
          )}
        </div>
      </form>
    )
  }
}

export default withTranslation()(CategoryForm)
