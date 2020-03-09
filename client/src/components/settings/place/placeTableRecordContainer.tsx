import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { PlaceParams, Place } from 'types/api'
import { EditPlaceStore, CategoriesStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import PlaceName from 'components/settings/place/placeName'
import PlaceForm from 'components/settings/place/placeForm'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import DestroyModal from 'components/common/destroyModal'
import CategorizedButton from 'components/settings/place/categorizedButton'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import { getPlaces, switchEditing } from 'actions/placesActions'
import { patchPlace, deletePlace } from 'actions/placeActions'
import { RootState } from 'reducers/rootReducer'
import AlertModal from 'components/common/alertModal'
import CategorizedModal from 'components/settings/place/categorizedModal'
import Trash from 'components/common/trash'
import { getCategories } from 'actions/categoriesActions'

interface StateProps {
  editPlace: EditPlaceStore;
  categories: CategoriesStore;
}

interface DispatchProps {
  switchEditing: (editingId: number) => void;
  patchPlace: (id: number, params: PlaceParams) => void;
  deletePlace: (placeId: number) => void;
  getCategories: () => void;
}

interface ParentProps {
  place: Place;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  isOpenDestroyModal: boolean;
  isOpenCategorizedModal: boolean;
  place: Place;
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
        name: ''
      }
    }

    this.handleClickIcon = this.handleClickIcon.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
  }

  diff(): boolean {
    return this.props.place.name !== this.state.place.name
  }

  handleClickIcon(): void {
    // 編集中ではない編集アイコン
    if (this.props.editPlace.editingId === 0) {
      this.props.switchEditing(this.props.place.id)
      this.setState({
        place: this.props.place
      })
    }
    // 編集中の編集アイコン
    if (this.props.editPlace.editingId !== 0 && this.props.editPlace.editingId !== this.props.place.id) {
      this.setState({
        isOpenAlertModal: true
      })
    }
    // キャンセルアイコン
    if (this.props.editPlace.editingId === this.props.place.id) {
      if (this.diff()) {
        this.setState({
          isOpenCancelModal: true
        })
      } else {
        this.props.switchEditing(0)
      }
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
      name: e.target.value
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
    this.props.switchEditing(0)
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      isOpenDestroyModal: false,
      isOpenCategorizedModal: false,
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
    this.props.getCategories()
  }

  render(): JSX.Element {
    return (
      <tr className='place-table-record-component'>
        {this.props.editPlace.editingId === this.props.place.id ? (
          <td>
            <CancelUpdateModal
              isOpen={this.state.isOpenCancelModal}
              onClickCancel={this.handleClickCancel}
              onClickClose={this.handleClickClose}
            />
            <PlaceForm
              disabled={this.props.editPlace.isLoading || !this.diff()}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
              place={this.state.place}
            />
            <ValidationErrorMessages messages={this.props.editPlace.errors} />
          </td>
        ) : (
          <td>
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
            editing={this.props.editPlace.editingId === this.props.place.id}
            onClickIcon={this.handleClickIcon}
          />
        </td>
        <td>
          <CategorizedModal
            categories={this.props.categories.categories}
            isOpen={this.state.isOpenCategorizedModal}
            onClickClose={this.handleClickClose}
          />
          <CategorizedButton onClickButton={this.handleClickPlusButton} />
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
    editPlace: state.editPlace,
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
    switchEditing(editingId: number): void {
      dispatch(switchEditing(editingId))
    },
    deletePlace(placeId: number): void {
      dispatch(deletePlace(placeId)).then(() => {
        dispatch(getPlaces())
      })
    },
    getCategories(): void {
      dispatch(getCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(PlaceTableRecordContainer)
