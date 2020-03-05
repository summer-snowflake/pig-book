import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Breakdown, Category } from 'types/api'
import LoadingImage from 'components/common/loadingImage'
import CategorySelectBoxContainer from 'components/settings/category/categorySelectBoxContainer'
import BalanceOfPaymentsRadios from 'components/settings/category/balanceOfPaymentsRadios'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (category: Category | undefined) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  category: Category;
  breakdown: Breakdown;
  disabled: boolean;
  isLoading: boolean;
}

type Props = ParentProps & I18nProps

class BreakdownForm extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
  }

  toBoolean(booleanStr: string): boolean {
    return booleanStr.toLowerCase() === 'true'
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChangeBalanceOfPayments(e)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <form className='breakdown-form-component form-row'>
        <div className='form-group col-auto category-radio'>
          <BalanceOfPaymentsRadios
            category={this.props.category}
            onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          />
        </div>
        <div className='form-group col-auto'>
          <CategorySelectBoxContainer
            balanceOfPayments={this.props.category.balance_of_payments}
            onChangeCategory={this.props.onChangeCategory}
            selectedCategoryId={this.props.category.id}
          />
        </div>
        <div className='form-group col-md-4'>
          <input
            className='form-control'
            name='breakdown_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={this.props.breakdown.name}
          />
        </div>
        <div className='form-group col-auto'>
          <button
            className='btn btn-primary'
            disabled={this.props.disabled}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {this.props.breakdown.id ? (
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

export default withTranslation()(BreakdownForm)
