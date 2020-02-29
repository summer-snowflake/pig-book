import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { getCategories } from 'actions/categoriesActions';
import { postCategory, changeCategoryBalanceOfPayments, changeCategoryName } from 'actions/categoryActions';
import CategoryForm from 'components/settings/category/categoryForm';

interface Props {
  getCategories: any,
  categories: any
}

class CategoriesListContainer extends Component<i18nProps & Props> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.props.getCategories();
  }

  render() {
    const { t } = this.props;

    return (
      <table className='categories-list-component'>
        <tbody>
          {this.props.categories.categories.map((category: { id: number, name: string, balance_of_payments: boolean }) => (
            <CategoryForm category={category} key={category.id} />
          ))}
        </tbody>
      </table>
    );
  }
}

function mapState(state: any) {
  return {
    categories: state.categories
  };
}

function mapDispatch(dispatch: any) {
  return {
    getCategories() {
      dispatch(getCategories());
    },
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

export default connect(mapState, mapDispatch)(withTranslation()(CategoriesListContainer));
