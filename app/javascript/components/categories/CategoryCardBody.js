import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import Categories from './Categories'
import CategoryForm from './CategoryForm'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { categoriesAxios, categoryAxios } from './../mixins/requests/CategoriesMixin'

class CategoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories,
      errorMessages: {}
    }
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.postCategoryCallback = this.postCategoryCallback.bind(this)
    this.destroyCategory = this.destroyCategory.bind(this)
    this.destroyCategoryCallback = this.destroyCategoryCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  componentWillMount() {
    this.getCategories()
  }

  getCategoriesCallback(res) {
    this.setState({
      categories: res.data
    })
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessage)
  }

  postCategoryCallback() {
    this.getCategories()
    this.noticeAddMessage()
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    categoryAxios.post(params, this.postCategoryCallback, this.noticeErrorMessage)
  }

  destroyCategoryCallback() {
    this.getCategories()
    this.noticeDestroyedMessage()
  }

  destroyCategory(categoryId) {
    this.setState({
      message: ''
    })
    categoryAxios.delete(categoryId, this.destroyCategoryCallback, this.noticeErrorMessage)
  }

  render() {
    return (
      <div className='category-card-body-component'>
        {this.renderAlertMessage()}
        <CategoryForm errorMessages={this.state.errorMessages} handleSendForm={this.postCategory} />
        <Categories categories={this.state.categories} getCategories={this.getCategories} handleClickDestroyButton={this.destroyCategory} />
      </div>
    )
  }
}

CategoryCardBody.propTypes = {
  categories: PropTypes.array.isRequired
}

reactMixin.onClass(CategoryCardBody, MessageNotifierMixin)

export default CategoryCardBody
