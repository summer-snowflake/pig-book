import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import { CategoriesStore } from 'types/store'
import LabelOption from 'components/common/LabelOption'

interface ParentProps {
  balanceOfPayments: boolean;
  selectedCategoryId?: number;
  onChangeCategory: (category: Category | undefined) => void;
}

interface StateProps {
  categoriesStore: CategoriesStore;
}

interface DispatchProps {
  getCategories: () => void;
}

type Props = ParentProps & StateProps & DispatchProps

class CategorySelectBox extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.loadCategory = this.loadCategory.bind(this)

    this.props.getCategories()
    this.loadCategory(Number(this.props.selectedCategoryId))
  }

  handleChangeCategory(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.loadCategory(Number(e.target.value))
  }

  loadCategory(categoryId: number): void {
    const category = this.props.categoriesStore.categories.find((category) => (
      category.id === categoryId
    ))
    this.props.onChangeCategory(category)
  }

  render(): JSX.Element {
    return (
      <span className='category-select-box-component'>
        <select
          className='form-control categories-list'
          disabled={this.props.categoriesStore.isLoading}
          name='categories-list'
          onChange={this.handleChangeCategory}
          value={this.props.selectedCategoryId}>
          <LabelOption labelName={'category'} />
          {this.props.categoriesStore.categories
            .filter((category: Category) => (
              category.balance_of_payments === this.props.balanceOfPayments
            ))
            .map((category: Category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
      </span>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    categoriesStore: state.categories
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getCategories(): void {
      dispatch(getCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(CategorySelectBox)
