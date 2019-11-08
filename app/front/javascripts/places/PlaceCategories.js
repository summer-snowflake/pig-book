import React from 'react'
import PropTypes from 'prop-types'

import SquareIcon from './../common/SquareIcon'

class PlaceCategories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='place-categories-component'>
        <ul className='place-category'>
          {this.props.categories.map((category) => (
            <li key={category.id}>
              <SquareIcon balanceOfPayments={category.balance_of_payments} />
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

PlaceCategories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default PlaceCategories
