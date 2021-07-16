import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { PlaceParams, WithCategoriesPlace, Place } from 'types/api'
import { EditPlaceStore, CategoriesStore } from 'types/store'
import { encodeQueryData } from 'modules/encode'
import { getPlaces } from 'actions/placesActions'
import { patchPlace, deletePlace, postPlaceCategories } from 'actions/placeActions'
import { editPlace, exitPlace, clearEditedPlace } from 'actions/placeStoreActions'
import { getCategories } from 'actions/categoriesActions'
import { RootState } from 'reducers/rootReducer'
import Trash from 'components/common/Trash'
import DestroyModal from 'components/common/DestroyModal'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import CancelModal from 'components/common/CancelModal'
import Cancel from 'components/common/Cancel'
import Edit from 'components/common/Edit'
import CategoryName from 'components/common/CategoryName'
import PlusButton from 'components/common/PlusButton'
import PlaceForm from 'components/settings/place/PlaceForm'

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
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.handleClickListIcon = this.handleClickListIcon.bind(this)
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

  handleClickCancelIcon(): void {
    this.setState({
      place: this.props.place,
      isOpenCancelModal: false
    })
    this.props.exitPlace()
  }

  handleClickCancelButton(): void {
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

  handleClickListIcon(): void {
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
      <tr className={'place-item-component' + (this.props.place.id === this.props.editPlaceStore.editedPlaceId ? ' edited' : '')}>
        {this.editing() ? (
          <td>
            <ValidationErrorMessages errors={this.props.editPlaceStore.errors} />
            <PlaceForm
              disabled={this.props.editPlaceStore.isLoading || !this.diff()}
              isLoading={this.props.editPlaceStore.isLoading}
              onChangeName={this.handleChangeName}
              onClickSubmitButton={this.handleClickSubmitButton}
              onKeyDown={this.handleKeyDown}
              place={this.state.place}
            />
          </td>
        ) : (
          <td>
            {this.props.place.name}
          </td>
        )}
        <td className='icon-field'>
          <CancelModal
            isOpen={this.state.isOpenCancelModal}
            onClickCancel={this.handleClickCancelButton}
            onClickClose={this.handleClickClose} />
          {this.editing() ? (
            <Cancel onClickIcon={this.handleClickCancelIcon} />
          ) : (
            <Edit onClickIcon={this.handleClickEditIcon} />
          )}
        </td>
        <td className='plus-icon-field'>
          <PlusButton onClickButton={this.handleClickPlusButton} />
        </td>
        <td className='categorized-list-field'>
          {this.props.place.categories.map((category) => (
            <CategoryName balanceOfPayments={category.balance_of_payments} name={category.name} key={category.id} />
          ))}
        </td>
        <td className='icon-field'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
        <td className='icon-field piped'>
          <span className='span' onClick={this.handleClickListIcon}>
            <i className='far fa-list-alt' />
          </span>
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
