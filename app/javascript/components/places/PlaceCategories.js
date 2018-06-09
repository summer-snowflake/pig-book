import React from 'react'
import PropTypes from 'prop-types'

class PlaceCategories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='place-categories-component'>
        <ul>
          {this.props.categories.map((category) =>
            <li key={category.id}>{category.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

PlaceCategories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PlaceCategories
