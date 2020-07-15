import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import { CategoriesStore } from 'types/store'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import CategoryTableRecordContainer from 'components/settings/category/categoryTableRecordContainer'
import LoadingImage from 'components/common/loadingImage'
import Counter from 'components/common/counter'

interface StateProps {
  categoriesStore: CategoriesStore;
}

interface DispatchProps {
  getCategories: () => void;
}

type Props = StateProps & DispatchProps

class CategoriesListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getCategories()
  }

  render(): JSX.Element {
    return (
      <div className='categories-list-component'>
        <Counter count={this.props.categoriesStore.categories.length} max={20} />
        <table className='table'>
          <tbody>
            {this.props.categoriesStore.categories.map((category: Category) => (
              <CategoryTableRecordContainer category={category} key={category.id} />
            ))}
          </tbody>
        </table>
        {this.props.categoriesStore.categories.length === 0 && this.props.categoriesStore.isLoading && (
          <LoadingImage />
        )}
      </div>
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

export default connect(mapState, mapDispatch)(CategoriesListContainer)
