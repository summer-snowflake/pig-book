import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import { categoriesAxios } from './../mixins/requests/CategoriesMixin'
import AddCategoryModal from './../common/AddCategoryModal'
import BalanceOfPaymentsIcons from './../common/BalanceOfPaymentsIcons'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class CategoriesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addCategoryModalIsOpen: false,
      selectedCategory: undefined,
      selectedBalanceOfPayments: false,
      originalCategories: [],
      categories: []
    }
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.handleClickPlusIcon = this.handleClickPlusIcon.bind(this)
    this.handleClickMinusIcon = this.handleClickMinusIcon.bind(this)
    this.onAddCategory = this.onAddCategory.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
    this.getCategories()
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessages)
  }

  getCategoriesCallback(res) {
    this.setState({
      originalCategories: res.data,
      categories: res.data.filter( category => category.balance_of_payments == false )
    })
    if(this.props.selectedCategoryId) {
      let category = res.data.find( category => category.id == this.props.selectedCategoryId )
      console.log(category)
      this.setState({
        selectedCategory: category,
        selectedBalanceOfPayments: category.balance_of_payments,
        categories: res.data.filter( resCategory => resCategory.balance_of_payments == category.balance_of_payments )
      })
    }
  }

  handleSelectCategory(e) {
    let category = this.state.categories.find( category => category.id == e.target.value )
    this.setState({
      categories: this.state.originalCategories.filter( resCategory => resCategory.balance_of_payments == category.balance_of_payments ),
      selectedCategory: category,
      selectedBalanceOfPayments: category.balance_of_payments
    })
    this.props.handleSelectCategory(category)
  }

  handleClickPlusButton() {
    this.setState({
      addCategoryModalIsOpen: true
    })
  }

  handleClickPlusIcon() {
    this.setState({
      selectedBalanceOfPayments: true,
      categories: this.state.originalCategories.filter( category => category.balance_of_payments == true )
    })
  }

  handleClickMinusIcon() {
    this.setState({
      selectedBalanceOfPayments: false,
      categories: this.state.originalCategories.filter( category => category.balance_of_payments == false )
    })
  }

  onClickCloseButton() {
    this.setState({
      addCategoryModalIsOpen: false
    })
  }

  onAddCategory(category) {
    this.props.handleSelectNewCategory(category)
    this.getCategories()
    this.setState({
      addCategoryModalIsOpen: false,
      selectedBalanceOfPayments: category.balance_of_payments,
      selectedCategory: category
    })
  }

  render() {
    return (
      <span className='categories-select-box-component'>
        <div className='input-group mb-1'>
          <BalanceOfPaymentsIcons
            onClickMinusIcon={this.handleClickMinusIcon}
            onClickPlusIcon={this.handleClickPlusIcon}
            selectedBalanceOfPayments={this.state.selectedBalanceOfPayments}
          />
          <select className='form-control' id='selectable-categories' onChange={this.handleSelectCategory} value={this.props.selectedCategoryId || (this.state.selectedCategory || {}).id}>
            {!(this.props.selectedCategoryId || (this.state.selectedCategory || {}).id) && <option value='' >{'- カテゴリ -'}</option>}
            {this.state.categories.map ((category) =>
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
  handleSelectCategory: PropTypes.func.isRequired,
  handleSelectNewCategory: PropTypes.func,
  plusButton: PropTypes.bool.isRequired,
  selectedCategoryId: PropTypes.number
}

reactMixin.onClass(CategoriesSelectBox, MessageNotifierMixin)

export default CategoriesSelectBox
