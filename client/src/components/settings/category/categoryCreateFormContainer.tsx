import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { postCategory, changeCategoryBalanceOfPayments, changeCategoryName } from 'actions/categoryActions';
import ValidationErrorMessages from 'components/common/validationErrorMessages';
import CategoryForm from 'components/settings/category/categoryForm';

interface Props {
  postCategory: any,
  changeCategoryBalanceOfPayments: any,
  changeCategoryName: any,
  category: {
    isLoading: boolean,
    name: string,
    balance_of_payments: boolean,
    errors: string[]
  }
}

class CategoryPostForm extends Component<i18nProps & Props> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    var ENTER = 13;
    if (e.keyCode === ENTER) {
      e.preventDefault();
      this.handleClickSubmitButton();
    }
  }

  handleClickSubmitButton() {
    const params = {
      balance_of_payments: this.props.category.balance_of_payments,
      name: this.props.category.name
    }

    this.props.postCategory(params);
  }

  render() {
    return (
      <div className='category-create-form-component'>
        <CategoryForm
          category={this.props.category}
          disabled={this.props.category.isLoading || !this.diff()}
          handleChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          handleKeyDown={this.handleKeyDown}
          handleChangeName={this.handleChangeName}
          handleClickSubmitButton={this.handleClickSubmitButton} />
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
    postCategory(params: { category: { balance_of_payments: boolean, name: string } }) {
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
