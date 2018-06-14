import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import BreakdownForm from './BreakdownForm'
import Breakdowns from './Breakdowns'
import AlertMessage from './../common/AlertMessage'

class BreakdownCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      categories: [],
      breakdowns: this.props.breakdowns,
      errorMessages: {}
    }
    this.getBreakdowns = this.getBreakdowns.bind(this)
    this.postBreakdown = this.postBreakdown.bind(this)
    this.destroyBreakdown = this.destroyBreakdown.bind(this)
    this.getCategories = this.getCategories.bind(this)
  }

  componentWillMount() {
    this.getBreakdowns()
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

  getBreakdowns() {
    let options = {
      method: 'GET',
      url: origin + '/api/breakdowns',
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
            breakdowns: res.data
          })
        }
      })
  }

  postBreakdown(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/breakdowns',
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if (res.status == '201') {
          this.getBreakdowns()
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

  destroyBreakdown(breakdown_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/breakdowns/' + breakdown_id,
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
        if(res.status == '204') {
          this.getBreakdowns()
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
      <div className='breakdown-card-body-component'>
        <BreakdownForm categories={this.state.categories} errorMessages={this.state.errorMessages} handleSendForm={this.postBreakdown} />
        <AlertMessage message={this.state.message} success={this.state.success} />
        <Breakdowns breakdowns={this.state.breakdowns} handleClickDestroyButton={this.destroyBreakdown} />
      </div>
    )
  }
}

BreakdownCardBody.propTypes = {
  breakdowns: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default BreakdownCardBody
