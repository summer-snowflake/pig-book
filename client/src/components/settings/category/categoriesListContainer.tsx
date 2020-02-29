import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCategories } from 'actions/categoriesActions';
import CategoryTableRecordContainer from 'components/settings/category/categoryTableRecordContainer';

interface Props {
  getCategories: any,
  categories: any
}

class CategoriesListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.props.getCategories();
  }

  render() {
    return (
      <table className='table categories-list-component'>
        <tbody>
          {this.props.categories.categories.map((category: { id: number, name: string, balance_of_payments: boolean }) => (
            <CategoryTableRecordContainer category={category} key={category.id} />
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
    }
  }
}

export default connect(mapState, mapDispatch)(CategoriesListContainer);
