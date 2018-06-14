import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'
import PlaceCategories from './PlaceCategories'

class Place extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickPlusIcon = this.handleClickPlusIcon.bind(this)
  }

  onClickTrashIcon(place) {
    this.props.onClickTrashIcon(place)
  }

  handleClickPlusIcon() {
    this.props.onClickPlusIcon(this.props.place)
  }

  render() {
    return (
      <tr className='place-component' id={'place-' + this.props.place.id}>
        <td>
          {this.props.place.name}
        </td>
        <td>
          <span className={'badge badge-info'} onClick={this.handleClickPlusIcon}>
            <span>
              <i className='fas fa-plus' />
            </span>
          </span>
        </td>
        <td>
          <PlaceCategories categories={this.props.place.categories || []} />
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
  onClickTrashIcon: PropTypes.func.isRequired,
  onClickPlusIcon: PropTypes.func.isRequired
}

export default Place
