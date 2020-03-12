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
  onChangeChecking: (placeCategoryIds: number[], checkedCategoryIds: number[]) => void;
}

interface StateProps {
  placeCategories: PlaceCategoriesStore;
}

interface DispatchProps {
  getPlaceCategories: (placeId: number) => void;
}

interface State {
  removedPlaceCategoryIds: number[];
  checkedCategoryIds: number[];
}

type Props = ParentProps & StateProps & DispatchProps

class CategoryCheckboxesContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      removedPlaceCategoryIds: [],
      checkedCategoryIds: []
    }

    this.checkedCheckbox = this.checkedCheckbox.bind(this)
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.addCheckedItem = this.addCheckedItem.bind(this)
    this.deleteCheckedItem = this.deleteCheckedItem.bind(this)

    this.props.getPlaceCategories(this.props.placeId)
  }

  checkedCheckbox(id: number): boolean {
    return this.props.placeCategories.categories.map((c) => c.id).includes(id)
  }

  handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    let itemIds = []
    if (e.target.checked) {
      itemIds = this.addCheckedItem(Number(e.target.value))
    } else {
      itemIds = this.deleteCheckedItem(Number(e.target.value))
    }
    const placeCategoryIds = this.props.placeCategories.categories.map((c) => c.id)
    this.props.onChangeChecking(placeCategoryIds, itemIds)
  }

  addCheckedItem(categoryId: number): number[] {
    let placeCategoryIds = this.props.placeCategories.categories.map((c) => c.id)
    placeCategoryIds = placeCategoryIds.filter((c) => !this.state.removedPlaceCategoryIds.includes(c))
    const ids: number[] = [...this.state.checkedCategoryIds, ...placeCategoryIds, categoryId]
    const set: Set<number> = new Set(ids)
    this.setState({
      checkedCategoryIds: Array.from(set)
    })
    return Array.from(set)
  }

  deleteCheckedItem(categoryId: number): number[] {
    let ids = this.state.checkedCategoryIds
    if (ids.length === 0) {
      ids = this.props.placeCategories.categories.map((c) => c.id)
    }
    const index = ids.indexOf(categoryId)
    ids.splice(index, 1)
    const removedIds = this.state.removedPlaceCategoryIds
    if (this.props.placeCategories.categories.map((c) => c.id).includes(categoryId)) {
      removedIds.push(categoryId)
    }
    this.setState({
      removedPlaceCategoryIds: removedIds,
      checkedCategoryIds: ids
    })
    return ids
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
                  onChange={this.handleChangeCheckbox}
                  type='checkbox'
                  value={category.id}
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
