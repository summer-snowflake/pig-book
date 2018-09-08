import React from 'react'
import PropTypes from 'prop-types'

import HumanBalanceOfPayments from './HumanBalanceOfPayments'

class CategoriesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
  }

  handleSelectCategory(e) {
    let category = this.props.categories.find( category => category.id == e.target.value )
    this.props.handleSelectCategory(category)
  }

  handleClickPlusButton() {
    console.log('plus')
  }

  render() {
    return (
      <span className='categories-select-box-component'>
        <div className='input-group mb-1'>
          <div className="input-group-prepend">
            <div className="input-group-text" htmlFor='selectable-categories'>
              <HumanBalanceOfPayments balanceOfPayments={this.props.selectedBalanceOfPayments} />
            </div>
          </div>
          <select className='form-control' id='selectable-categories' onChange={this.handleSelectCategory} ref='category' value={this.props.selectedCategoryId}>
            {!this.props.selectedCategoryId && <option value='' >{'- カテゴリ -'}</option>}
            {this.props.categories.map ((category) =>
              <option key={category.id} value={category.id}>{category.name}</option>
            )}
          </select>
          {this.props.plusButton && (
            <button className='btn btn-primary btn-sm' onClick={this.handleClickPlusButton}>
              <i className='fas fa-plus' />
            </button>
          )}
        </div>
      </span>
    )
  }
}

CategoriesSelectBox.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedBalanceOfPayments: PropTypes.bool,
  selectedCategoryId: PropTypes.number,
  plusButton: PropTypes.bool.isRequired,
  handleSelectCategory: PropTypes.func.isRequired
}

export default CategoriesSelectBox
