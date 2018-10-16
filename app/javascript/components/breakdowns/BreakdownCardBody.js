import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import BreakdownForm from './BreakdownForm'
import Breakdowns from './Breakdowns'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { categoriesAxios } from './../mixins/requests/CategoriesMixin'
import { breakdownsAxios, breakdownAxios } from './../mixins/requests/BreakdownsMixin'

class BreakdownCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      breakdowns: this.props.breakdowns,
      errorMessages: {}
    }
    this.getBreakdowns = this.getBreakdowns.bind(this)
    this.getBreakdownsCallback = this.getBreakdownsCallback.bind(this)
    this.postBreakdown = this.postBreakdown.bind(this)
    this.postBreakdownCallback = this.postBreakdownCallback.bind(this)
    this.destroyBreakdown = this.destroyBreakdown.bind(this)
    this.destroyBreakdownCallback = this.destroyBreakdownCallback.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
  }

  componentWillMount() {
    this.getBreakdowns()
  }

  getCategoriesCallback(res) {
    this.setState({
      categories: res.data
    })
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessages)
  }

  getBreakdownsCallback(res) {
    this.getCategories()
    this.setState({
      breakdowns: res.data
    })
  }

  getBreakdowns() {
    breakdownsAxios.get(this.getBreakdownsCallback, this.noticeErrorMessages)
  }

  postBreakdownCallback() {
    this.getBreakdowns()
    this.noticeAddMessage()
  }

  postBreakdown(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    breakdownAxios.post(params, this.postBreakdownCallback, this.noticeErrorMessages)
  }

  destroyBreakdownCallback() {
    this.getBreakdowns()
    this.noticeDestroyedMessage()
  }

  destroyBreakdown(breakdownId) {
    this.setState({
      message: ''
    })
    breakdownAxios.delete(breakdownId, this.destroyBreakdownCallback, this.noticeErrorMessages)
  }

  render() {
    return (
      <div className='breakdown-card-body-component'>
        {this.renderAlertMessage()}
        <BreakdownForm categories={this.state.categories} errorMessages={this.state.errorMessages} handleSendForm={this.postBreakdown} />
        <Breakdowns breakdowns={this.state.breakdowns} categories={this.state.categories} getBreakdowns={this.getBreakdowns} handleClickDestroyButton={this.destroyBreakdown} />
      </div>
    )
  }
}

BreakdownCardBody.propTypes = {
  breakdowns: PropTypes.array.isRequired,
}

reactMixin.onClass(BreakdownCardBody, MessageNotifierMixin)

export default BreakdownCardBody
