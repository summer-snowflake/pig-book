import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { postCategory, changeCategoryBalanceOfPayments, changeCategoryName } from 'actions/categoryActions';
import ValidationErrorMessages from 'components/common/validationErrorMessages';

interface Props {
  postCategory: any,
  changeCategoryBalanceOfPayments: any,
  changeCategoryName: any,
  category: {
    isLoading: boolean,
    name: string,
    balanceOfPayments: boolean,
    errors: string[]
  }
}

class CategoryPostForm extends Component<i18nProps & Props> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
  }

  diff(): boolean {
    return this.props.category.name !== '';
  }

  toBoolean(booleanStr: string): boolean {
    return booleanStr.toLowerCase() === 'true';
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCategoryBalanceOfPayments(this.toBoolean(e.target.value));
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.changeCategoryName(e.target.value);
  }

  handleClickSubmitButton() {
    const params = {
      balanceOfPayments: this.props.category.balanceOfPayments,
      name: this.props.category.name
    }

    this.props.postCategory(params);
  }

  render() {
    const { t } = this.props;

    return (
      <div className='category-create-form-component'>
        <form className='new-category form-row'>
          <div className='form-group col-md-3 category-radio'>
            <span className='radio-span'>
              <input
                className='radio-input'
                checked={this.props.category.balanceOfPayments === true}
                onChange={this.handleChangeBalanceOfPayments}
                name='category[balance_of_payments]'
                id='category_balance_of_payments_income'
                value='true'
                type='radio' />
              <label className='radio-label' htmlFor='category_balance_of_payments_income'>
                <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                <i className='fas fa-plus-square left-icon blue' />
                {t('label.income')}
              </label>
            </span>
            <span className='radio-span'>
              <input
                className='radio-input'
                checked={this.props.category.balanceOfPayments === false}
                onChange={this.handleChangeBalanceOfPayments}
                name='category[balance_of_payments]'
                value='false'
                id='category_balance_of_payments_outgo'
                type='radio' />
              <label className='radio-label' htmlFor='category_balance_of_payments_outgo'>
                <FontAwesomeIcon icon={['fas', 'check']} className='left-icon' />
                <i className='fas fa-minus-square left-icon red' />
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
              onChange={this.handleChangeName} />
          </div>
          <div className='form-group col-auto'>
            <button
              className='btn btn-primary'
              onClick={this.handleClickSubmitButton}
              disabled={this.props.category.isLoading || !this.diff()}
              type='button'>
              {t('button.add')}
            </button>
          </div>
        </form>
        <ValidationErrorMessages messages={this.props.category.errors} />
      </div>
    );
  }
}

function mapState(state: any) {
  return {
    category: state.category
  };
}

function mapDispatch(dispatch: any) {
  return {
    postCategory(params: { category: { balanceOfPayments: boolean, name: string } }) {
      dispatch(postCategory(params));
    },
    changeCategoryBalanceOfPayments(balanceOfPayments: boolean) {
      dispatch(changeCategoryBalanceOfPayments(balanceOfPayments));
    },
    changeCategoryName(name: string) {
      dispatch(changeCategoryName(name));
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(CategoryPostForm));
