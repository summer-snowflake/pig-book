import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { PlaceParams, WithCategoriesPlace, Place } from 'types/api'
import { EditPlaceStore, CategoriesStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import PlaceName from 'components/settings/place/placeName'
import PlaceForm from 'components/settings/place/placeForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import DestroyModal from 'components/common/destroyModal'
import CategorizedPlusButton from 'components/settings/place/categorizedPlusButton'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import { getPlaces } from 'actions/placesActions'
import { patchPlace, deletePlace, postPlaceCategories, editPlace, exitPlace } from 'actions/placeActions'
import { RootState } from 'reducers/rootReducer'
import AlertModal from 'components/common/alertModal'
import CategorizedModal from 'components/settings/place/categorizedModal'
import Trash from 'components/common/trash'
import { getCategories } from 'actions/categoriesActions'
import CategoryName from 'components/settings/category/categoryName'

interface StateProps {
  editPlaceStore: EditPlaceStore;
  categories: CategoriesStore;
}

interface DispatchProps {
  editPlace: (place: Place) => void;
  exitPlace: () => void;
  patchPlace: (id: number, params: PlaceParams) => void;
  deletePlace: (placeId: number) => void;
  getCategories: (placeId: number) => void;
  postPlaceCategories: (placeId: number, categoryIds: number[]) => void;
}

interface ParentProps {
  place: WithCategoriesPlace;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
  isOpenCategorizedModal: boolean;
  place: WithCategoriesPlace;
}

class PlaceTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      isOpenCategorizedModal: false,
      place: {
        id: 0,
        name: '',
        categories: []
      }
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
  }

  diff(): boolean {
    return this.props.place.name !== this.state.place.name
  }

  editing(): boolean {
    return this.props.place.id === this.props.editPlaceStore.place.id
  }

  handleClickEditIcon(): void {
    // 編集中ではない場合
    if (this.props.editPlaceStore.place.id === 0) {
      this.props.editPlace(this.props.place)
      this.setState({
        place: this.props.place
      })
    } else {
      // 他のアイテム編集中の場合
      if (this.props.editPlaceStore.place.id !== this.props.place.id) {
        this.setState({
          isOpenAlertModal: true
        })
      }
    }
  }

  handleClickExitIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.exitPlace()
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const place = {
      id: this.props.place.id,
      name: e.target.value,
      categories: this.props.place.categories
    }
    this.setState({
      place: place
    })
  }

  handleClickSubmitButton(): void {
    this.props.patchPlace(this.state.place.id, this.state.place)
  }

  handleClickCancel(): void {
    this.setState({
      place: this.props.place,
      isOpenCancelModal: false
    })
    this.props.exitPlace()
  }

  handleClickSubmit(categoryIds: number[]): void {
    this.setState({
      isOpenCategorizedModal: false
    })
    this.props.postPlaceCategories(this.props.place.id, categoryIds)
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      isOpenCategorizedModal: false
    })
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickDestroy(): void {
    this.setState({
      isOpenDestroyModal: false
    })
    this.props.deletePlace(this.props.place.id)
  }

  handleClickPlusButton(): void {
    this.setState({
      isOpenCategorizedModal: true
    })
    this.props.getCategories(this.props.place.id)
  }

  render(): JSX.Element {
    return (
      <tr className='place-table-record-component'>
        {this.editing() ? (
          <td className='place-field-td' colSpan={2}>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <PlaceForm
              disabled={this.editing() && !this.diff()}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
              place={this.state.place}
            />
            <ValidationErrorMessages messages={this.props.editPlaceStore.errors} />
          </td>
        ) : (
          <td className='place-field-td' colSpan={2}>
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
            <PlaceName place={this.props.place} />
          </td>
        )}
        <td className='icon-field-td'>
          <EditAndCancel
            editing={this.editing()}
            onClickEditIcon={this.handleClickEditIcon}
            onClickExitIcon={this.handleClickExitIcon}
          />
        </td>
        <td className='plus-field-td'>
          <CategorizedModal
            categories={this.props.categories.categories}
            isOpen={this.state.isOpenCategorizedModal}
            onClickClose={this.handleClickClose}
            onClickSubmit={this.handleClickSubmit}
            placeId={this.props.place.id}
          />
          <CategorizedPlusButton onClickButton={this.handleClickPlusButton} />
        </td>
        <td className='place-categories-field-td'>
          {this.props.place.categories.map((category) => (
            <CategoryName category={category} key={category.id} />
          ))}
        </td>
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editPlaceStore: state.editPlace,
    categories: state.categories
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchPlace(id: number, place: PlaceParams): void {
      dispatch(patchPlace(id, place)).then(() => {
        dispatch(getPlaces())
      })
    },
    editPlace(place: Place): void {
      dispatch(editPlace(place))
    },
    exitPlace(): void {
      dispatch(exitPlace())
    },
    deletePlace(placeId: number): void {
      dispatch(deletePlace(placeId)).then(() => {
        dispatch(getPlaces())
      })
    },
    getCategories(): void {
      dispatch(getCategories())
    },
    postPlaceCategories(placeId: number, categoryIds: number[]): void {
      dispatch(postPlaceCategories(placeId, categoryIds)).then(() => {
        dispatch(getPlaces())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(PlaceTableRecordContainer)
