import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { withTranslation } from 'react-i18next'
import { ThunkDispatch } from 'redux-thunk'

import { PlaceParams } from 'types/api'
import { NewPlaceStore } from 'types/store'
import ValidationErrorMessages from 'components/common/validationErrorMessages'
import PlaceForm from 'components/settings/place/placeForm'
import { postPlace, changePlaceName } from 'actions/placeActions'
import { clearEditedPlace } from 'actions/placeStoreActions'
import { getPlaces } from 'actions/placesActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  newPlaceStore: NewPlaceStore;
}

interface DispatchProps {
  postPlace: (params: PlaceParams) => void;
  changePlaceName: (name: string) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class PlacePostForm extends Component<Props> {
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
    this.props.changePlaceName(e.target.value)
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
      name: this.props.newPlaceStore.name
    }

    this.props.postPlace(params)
  }

  render(): JSX.Element {
    return (
      <div className='place-create-form-component'>
        <PlaceForm
          disabled={this.props.newPlaceStore.isLoading || !this.diff()}
          isLoading={this.props.newPlaceStore.isLoading}
          onChangeName={this.handleChangeName}
          onClickSubmitButton={this.handleClickSubmitButton}
          onKeyDown={this.handleKeyDown}
          place={this.props.newPlaceStore}
        />
        <ValidationErrorMessages messages={this.props.newPlaceStore.errors} />
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
    changePlaceName(name: string): void {
      dispatch(changePlaceName(name))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(PlacePostForm))
