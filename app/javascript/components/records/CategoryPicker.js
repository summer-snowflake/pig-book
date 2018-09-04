import React from 'react'
import PropTypes from 'prop-types'

import SquareIcon from './../common/SquareIcon'

class CategoryPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='category-picker-component'>
        {this.props.categories.map ((category) =>
          (<div className='picker-button' key={category.id}>
            <SquareIcon balanceOfPayments={category.balance_of_payments} />
            {category.name}
          </div>)
        )}
      </div>
    )
  }
}

CategoryPicker.propTypes = {
  categories: PropTypes.array.isRequired
}

export default CategoryPicker
