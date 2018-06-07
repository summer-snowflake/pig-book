import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Place extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(place) {
    this.props.onClickTrashIcon(place)
  }

  render() {
    return (
      <tr className='place-component' id={'place-' + this.props.place.id}>
        <td>
          {this.props.place.name}
        </td>
        <td>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.place} />
        </td>
      </tr>
    )
  }
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired
}

export default Place
