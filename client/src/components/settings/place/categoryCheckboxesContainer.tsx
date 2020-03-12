import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Category } from 'types/api'
import { PlaceCategoriesStore } from 'types/store'
import { getPlaceCategories } from 'actions/placeActions'
import { RootState } from 'reducers/rootReducer'
import CategoryName from 'components/settings/category/categoryName'
import LoadingImage from 'components/common/loadingImage'

interface ParentProps {
  categories: Category[];
  placeId: number;
}

interface StateProps {
  placeCategories: PlaceCategoriesStore;
}

interface DispatchProps {
  getPlaceCategories: (placeId: number) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class CategoryCheckboxesContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.checkedCheckbox = this.checkedCheckbox.bind(this)

    this.props.getPlaceCategories(this.props.placeId)
  }

  checkedCheckbox(id: number): boolean {
    return this.props.placeCategories.categories.map((c) => c.id).includes(id)
  }

  render(): JSX.Element {
    return (
      <div className='category-checkboxes-component'>
        {this.props.placeCategories.isLoading ? (
          <LoadingImage />
        ) : (
          <div>
            {this.props.categories.map((category) => (
              <span key={category.id}>
                <input
                  className='checkbox-input'
                  defaultChecked={this.checkedCheckbox(category.id)}
                  id={'category-' + category.id}
                  type='checkbox'
                />
                <label className='checkbox-label' htmlFor={'category-' + category.id}>
                  <i className='fas fa-check left-icon' />
                  <CategoryName category={category} />
                </label>
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    placeCategories: state.placeCategories
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getPlaceCategories(placeId: number): void {
      dispatch(getPlaceCategories(placeId))
    }
  }
}

export default connect(mapState, mapDispatch)(CategoryCheckboxesContainer)
