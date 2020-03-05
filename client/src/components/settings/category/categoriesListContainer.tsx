import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import CategoryTableRecordContainer from 'components/settings/category/categoryTableRecordContainer'
import { getCategories } from 'actions/categoriesActions'
import LoadingImage from 'components/common/loadingImage'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  categories: {
    isLoading: boolean;
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
    const table = (
      <table className='table categories-list-component'>
        <tbody>
          {this.props.categories.categories.map((category: { id: number; name: string; balance_of_payments: boolean }) => (
            <CategoryTableRecordContainer category={category} key={category.id} />
          ))}
        </tbody>
      </table>
    )

    const loading = (
      <LoadingImage />
    )

    return this.props.categories.isLoading ? loading : table
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
