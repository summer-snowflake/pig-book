import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { PlaceParams } from 'types/api'
import { NewPlaceStore } from 'types/store'
import { postPlace } from 'actions/placeActions'
import { clearEditedPlace, newPlace } from 'actions/placeStoreActions'
import { getPlaces } from 'actions/placesActions'
import { RootState } from 'reducers/rootReducer'
import ValidationErrorMessages from 'components/common/ValidationErrorMessages'
import PlaceForm from 'components/settings/place/PlaceForm'

interface StateProps {
  newPlaceStore: NewPlaceStore;
}

interface DispatchProps {
  postPlace: (params: PlaceParams) => void;
  newPlace: (place: PlaceParams) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class NewPlaceField extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  diff(): boolean {
    return this.props.newPlaceStore.name !== ''
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const place = {
      ...this.props.newPlaceStore.place,
      name: e.target.value
    }
    this.props.newPlace(place)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = {
      name: this.props.newPlaceStore.place.name
    }

    this.props.postPlace(params)
  }

  render(): JSX.Element {
    return (
      <div className='place-create-form-component'>
        <ValidationErrorMessages errors={this.props.newPlaceStore.errors} />
        <PlaceForm
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
          placeStore={this.props.newPlaceStore}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newPlaceStore: state.newPlace
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postPlace(params: PlaceParams): void {
      dispatch(postPlace(params)).then(() => {
        dispatch(getPlaces()).then(() => {
          setTimeout(() => {
            dispatch(clearEditedPlace())
          }, 3000)
        })
      })
    },
    newPlace(place: PlaceParams): void {
      dispatch(newPlace(place))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(NewPlaceField))
