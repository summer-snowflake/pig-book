import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import { CategoriesStore } from 'types/store'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import LoadingImage from 'components/common/LoadingImage'
import CategoryItem from 'components/settings/category/CategoryItem'

interface StateProps {
  categoriesStore: CategoriesStore;
}

interface DispatchProps {
  getCategories: () => void;
}

type Props = StateProps & DispatchProps

class CategoriesList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getCategories()
  }

  render(): JSX.Element {
    return (
      <div className='categories-list-component'>
        <div className='counter'>
          {this.props.categoriesStore.categories.length + ' / 10'}
        </div>
        <table className='table'>
          <tbody>
            {this.props.categoriesStore.categories.map((category: Category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
            {this.props.categoriesStore.categories.length === 0 && this.props.categoriesStore.isLoading && (
              <LoadingImage />
            )}
          </tbody>
        </table>
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

export default connect(mapState, mapDispatch)(CategoriesList)
