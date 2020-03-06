import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import CategoryTableRecordContainer from 'components/settings/category/categoryTableRecordContainer'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  categories: {
    categories: Category[];
  };
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
      <table className='table categories-list-component'>
        <tbody>
          {this.props.categories.categories.map((category: Category) => (
            <CategoryTableRecordContainer category={category} key={category.id} />
          ))}
        </tbody>
      </table>
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
