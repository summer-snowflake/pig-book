import React from 'react'
import PropTypes from 'prop-types'

class PlacesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectPlace = this.handleSelectPlace.bind(this)
  }

  handleSelectPlace(e) {
    let place = this.props.places[e.target.value]
    this.props.handleSelectPlace(place)
  }

  render() {
    return (
      <span className='places-select-box-component'>
        <div className='input-group mb-1'>
          <select className='form-control' disabled={this.props.isDisabled} id='selectable-places' onChange={this.handleSelectPlace} ref='place'>
            <option value='' >{'- お店・施設 -'}</option>
            {this.props.places.map ((place, index) =>
              <option key={place.id} value={index}>{place.name}</option>
            )}
          </select>
        </div>
      </span>
    )
  }
}

PlacesSelectBox.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  places: PropTypes.array.isRequired,
  handleSelectPlace: PropTypes.func.isRequired
}

export default PlacesSelectBox
