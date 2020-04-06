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

interface StateProps {
  categories: CategoriesStore;
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
        <table className='table'>
          <tbody>
            {this.props.categories.categories.map((category: Category) => (
              <CategoryTableRecordContainer category={category} key={category.id} />
            ))}
          </tbody>
        </table>
        {this.props.categories.categories.length === 0 && this.props.categories.isLoading && (
          <LoadingImage />
        )}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    categories: state.categories
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
