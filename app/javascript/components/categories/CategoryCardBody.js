import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import Categories from './Categories'
import CategoryForm from './CategoryForm'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class CategoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      categories: this.props.categories,
      errorMessages: {}
    }
    this.destroyCategory = this.destroyCategory.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.postCategory = this.postCategory.bind(this)
  }

  componentWillMount() {
    this.getCategories()
  }

  getCategories() {
    let options = {
      method: 'GET',
      url: origin + '/api/categories',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          categories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/categories',
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getCategories()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyCategory(category_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'delete',
      url: origin + '/api/categories/' + category_id,
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getCategories()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
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
reactMixin.onClass(CategoryCardBody, LocalStorageMixin)

export default CategoryCardBody
