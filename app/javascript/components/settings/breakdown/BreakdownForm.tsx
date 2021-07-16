import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Breakdown, Category } from 'types/api'
import LoadingImage from 'components/common/loadingImage'
import CategorySelectBox from 'components/common/CategorySelectBox'
import BalanceOfPaymentsRadios from 'components/common/BalanceOfPaymentsRadios'
import { EditBreakdownStore, NewBreakdownStore } from 'types/store'

interface ParentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeBalanceOfPayments: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (category: Category | undefined) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmitButton: () => void;
  breakdownStore: NewBreakdownStore | EditBreakdownStore;
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
    const breakdown = this.props.breakdownStore.breakdown

    return (
      <form className='breakdown-form-component'>
        <div className='form-group row'>
          <BalanceOfPaymentsRadios
            category={breakdown.category}
            onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          />
          <CategorySelectBox
            balanceOfPayments={breakdown.category.balance_of_payments}
            onChangeCategory={this.props.onChangeCategory}
            selectedCategoryId={breakdown.category.id}
          />
          <input
            className='form-control'
            name='breakdown_name'
            onChange={this.props.onChangeName}
            onKeyDown={this.props.onKeyDown}
            type='text'
            value={breakdown.name}
          />
          <button
            className='btn btn-primary'
            disabled={this.props.breakdownStore.isLoading}
            onClick={this.props.onClickSubmitButton}
            type='button'
          >
            {breakdown.id ? (
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

export default withTranslation()(BreakdownForm)
