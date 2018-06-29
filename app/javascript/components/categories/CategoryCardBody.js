import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'
import Categories from './Categories'
import CategoryForm from './CategoryForm'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class CategoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
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
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
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
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
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
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
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
        <AlertMessage message={this.state.message} success={this.state.success} />
        <CategoryForm errorMessages={this.state.errorMessages} handleSendForm={this.postCategory} />
        <Categories categories={this.state.categories} getCategories={this.getCategories} handleClickDestroyButton={this.destroyCategory} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
      </div>
    )
  }
}

CategoryCardBody.propTypes = {
  categories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(CategoryCardBody, MessageNotifierMixin)

export default CategoryCardBody
