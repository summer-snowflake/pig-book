import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RouteComponentProps } from 'types/react-router'
import { withRouter } from 'react-router-dom'

import { PlaceParams, WithCategoriesPlace, Place } from 'types/api'
import { EditPlaceStore, CategoriesStore } from 'types/store'
import { encodeQueryData } from 'modules/encode'
import EditAndCancel from 'components/common/editAndCancel'
import PlaceName from 'components/settings/place/placeName'
import PlaceForm from 'components/settings/place/placeForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import DestroyModal from 'components/common/destroyModal'
import CategorizedPlusButton from 'components/settings/place/categorizedPlusButton'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import { getPlaces } from 'actions/placesActions'
import { patchPlace, deletePlace, postPlaceCategories, editPlace, exitPlace, clearEditedPlace } from 'actions/placeActions'
import { RootState } from 'reducers/rootReducer'
import AlertModal from 'components/common/alertModal'
import ListIcon from 'components/common/listIcon'
import CategorizedModal from 'components/settings/place/categorizedModal'
import Trash from 'components/common/trash'
import { getCategories } from 'actions/categoriesActions'
import CategoryName from 'components/settings/category/categoryName'

interface StateProps {
  editPlaceStore: EditPlaceStore;
  categoriesStore: CategoriesStore;
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

type Props = RouteComponentProps & ParentProps & StateProps & DispatchProps

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
    this.handleClickAlignJustify = this.handleClickAlignJustify.bind(this)
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

  handleClickAlignJustify(): void {
    const today = new Date()
    const params = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      order: 'published_at',
      page: 1,
      place_id: this.props.place.id
    }
    this.props.history.push({
      pathname: '/list',
      search: '?' + encodeQueryData(params)
    })
  }

  render(): JSX.Element {
    return (
      <tr className={'place-table-record-component' + (this.props.place.id === this.props.editPlaceStore.editedPlaceId ? ' edited' : '')}>
        {this.editing() ? (
          <td className='place-field-td' colSpan={2}>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <PlaceForm
              disabled={this.props.editPlaceStore.isLoading || !this.diff()}
              isLoading={this.props.editPlaceStore.isLoading}
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
            categories={this.props.categoriesStore.categories}
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
        <td className='icon-field-td piped'>
          <ListIcon onClickIcon={this.handleClickAlignJustify} />
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    editPlaceStore: state.editPlace,
    categoriesStore: state.categories
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchPlace(id: number, place: PlaceParams): void {
      dispatch(patchPlace(id, place)).then(() => {
        dispatch(getPlaces()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedPlace())
          }, 3000)
        })
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
        dispatch(getPlaces()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedPlace())
          }, 3000)
        })
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(PlaceTableRecordContainer))
