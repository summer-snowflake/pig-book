import React from 'react'
import PropTypes from 'prop-types'

import AddCategoryModal from './../common/AddCategoryModal'
import BalanceOfPaymentsRadioButtons from './../common/BalanceOfPaymentsRadioButtons'

class CategoriesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredCategories: [],
      addCategoryModalIsOpen: false
    }
    this.handleSelectBalanceOfPayments = this.handleSelectBalanceOfPayments.bind(this)
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.onAddCategory = this.onAddCategory.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
  }

  handleSelectCategory(e) {
    let category = this.props.categories.find( category => category.id == e.target.value )
    this.props.handleSelectCategory(category)
  }

  handleClickPlusButton() {
    this.setState({
      addCategoryModalIsOpen: true
    })
  }

  onClickCloseButton() {
    this.setState({
      addCategoryModalIsOpen: false
    })
  }

  onAddCategory(category) {
    this.props.handleSelectNewCategory(category)
    this.setState({
      addCategoryModalIsOpen: false
    })
  }

  handleSelectBalanceOfPayments(e) {
    let categories = this.props.categories.filter((category) => {
      return String(category.balance_of_payments) == e.target.value
    })
    this.setState({
      filteredCategories: categories
    })
  }

  render() {
    let categories = this.props.categories.filter((category) => {
      return String(category.balance_of_payments) == 'false'
    })
    categories = this.state.filteredCategories.length == 0 ? categories : this.state.filteredCategories

    return (
      <span className='categories-select-box-component'>
        <div className='input-group mb-1'>
          <BalanceOfPaymentsRadioButtons id={1} onChangeBalanceOfPayments={this.handleSelectBalanceOfPayments} value={this.props.selectedBalanceOfPayments} />
          <select className='form-control' id='selectable-categories' name='category' onChange={this.handleSelectCategory} value={this.props.selectedCategoryId}>
            {!this.props.selectedCategoryId && <option value='' >{'- カテゴリ -'}</option>}
            {categories.map ((category) =>
              <option key={category.id} value={category.id}>{category.name}</option>
            )}
          </select>
          {this.props.plusButton && (
            <button className='btn btn-primary btn-sm' onClick={this.handleClickPlusButton}>
              <i className='fas fa-plus' />
            </button>
          )}
          <AddCategoryModal handleAddCategory={this.onAddCategory} handleClickCloseButton={this.onClickCloseButton} modalIsOpen={this.state.addCategoryModalIsOpen} />
        </div>
      </span>
    )
  }
}

CategoriesSelectBox.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedBalanceOfPayments: PropTypes.bool,
  selectedCategoryId: PropTypes.string,
  plusButton: PropTypes.bool.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  handleSelectNewCategory: PropTypes.func
}

export default CategoriesSelectBox
