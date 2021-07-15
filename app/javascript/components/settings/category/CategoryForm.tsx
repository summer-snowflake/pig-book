import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import BalanceOfPaymentsRadios from 'components/common/BalanceOfPaymentsRadios'
import { EditCategoryStore, NewCategoryStore } from 'types/store'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  categoryStore: NewCategoryStore | EditCategoryStore;
}

type Props = ParentProps & I18nProps

class CategoryForm extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props
    const category = this.props.categoryStore.category

    return (
      <form className='category-form-component'>
        <div className='form-group row'>
          <BalanceOfPaymentsRadios
            category={category}
            onChangeBalanceOfPayments={this.props.onChangeBalanceOfPayments}
          />
          <input
            className='form-control'
            name='category_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={category.name}
          />
          <button
            className='btn btn-primary'
            disabled={this.props.categoryStore.isLoading}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {category.id ? (
              t('button.update')
            ) : (
              t('button.add')
            )}
          </button>
        </div>
      </form>
    )
  }
}

export default withTranslation()(CategoryForm)
