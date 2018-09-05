import React from 'react'
import PropTypes from 'prop-types'

import CategoryPicker from './CategoryPicker'

class CategoryPickers extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton(category_id) {
    this.props.onClickPickerButton(category_id)
  }

  render() {
    return (
      <div className='category-pickers-component'>
        {this.props.categories.map ((category) =>
          <CategoryPicker category={category} key={category.id} onClickPickerButton={this.handleClickPickerButton} />
        )}
      </div>
    )
  }
}

CategoryPickers.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

export default CategoryPickers
