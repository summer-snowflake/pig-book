import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { WithCategoriesPlace } from 'types/api'
import PlaceTableRecordContainer from 'components/settings/place/placeTableRecordContainer'
import { getPlaces } from 'actions/placesActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  placesStore: {
    places: WithCategoriesPlace[];
  };
}

interface DispatchProps {
  getPlaces: () => void;
}

type Props = StateProps & DispatchProps

class PlacesListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getPlaces()
  }

  render(): JSX.Element {
    return (
      <table className='table places-list-component'>
        <tbody>
          {this.props.placesStore.places.map((place: WithCategoriesPlace) => (
            <PlaceTableRecordContainer key={place.id} place={place} />
          ))}
        </tbody>
      </table>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    placesStore: state.places
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getPlaces(): void {
      dispatch(getPlaces())
    }
  }
}

export default connect(mapState, mapDispatch)(PlacesListContainer)
