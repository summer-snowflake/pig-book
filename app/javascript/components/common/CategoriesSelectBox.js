import React from 'react'
import PropTypes from 'prop-types'

class CategoriesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      human_balance_of_payments: '収支'
    }
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
  }

  handleSelectCategory(e) {
    let category = this.props.categories[e.target.value]
    this.setState({
      human_balance_of_payments: (category || {}).human_balance_of_payments || '収支'
    })
    this.props.handleSelectCategory((category || {}).id)
  }

  render() {
    return (
      <div className='categories-select-box-component'>
        <div className='input-group mb-3'>
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor='selectable-categories'>{this.state.human_balance_of_payments}</label>
          </div>
          <select className='custom-select' id='selectable-categories' onChange={this.handleSelectCategory} ref='category'>
            <option />
            {this.props.categories.map ((category, index) =>
              <option key={category.id} value={index}>{category.name}</option>
            )}
          </select>
        </div>
      </div>
    )
  }
}

CategoriesSelectBox.propTypes = {
  categories: PropTypes.array.isRequired,
  handleSelectCategory: PropTypes.func.isRequired
}

export default CategoriesSelectBox
