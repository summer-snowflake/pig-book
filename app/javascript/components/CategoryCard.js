import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Categories from './categories/Categories'
import CategoryForm from './categories/CategoryForm'
import AlertMessage from './common/AlertMessage'

class CategoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      categories: this.props.categories,
      errorMessages: []
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
        if(res.status == '200') {
          this.setState({
            categories: res.data
          })
        }
      })
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: []
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
      .then((res) => {
        if(res.status == '201') {
          this.getCategories()
          this.setState({
            message: '追加しました',
            success: true
          })
        }
      })
      .catch((error) => {
        if (error.response.status == '422') {
          this.setState({
            errorMessages: error.response.data.error_messages
          })
        } else {
          this.setState({
            message: error.response.data.error_message,
            success: false
          })
        }
        console.error(error)
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
      .then((res) => {
        if(res.status == '200') {
          this.getCategories()
          this.setState({
            message: '削除しました',
            success: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.error_message,
          success: false
        })
        console.error(error)
      })
  }

  render() {
    return (
      <div className='category-card-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <CategoryForm handleSendForm={this.postCategory} errorMessages={this.state.errorMessages} />
        <Categories categories={this.state.categories} handleClickDestroyButton={this.destroyCategory} />
      </div>
    )
  }
}

CategoryCard.propTypes = {
  categories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default CategoryCard
