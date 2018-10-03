import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import TemplateForm from './TemplateForm'
import Templates from './Templates'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import { categoriesAxios } from './../mixins/requests/CategoriesMixin'
import { tagsAxios } from './../mixins/requests/TagsMixin'
import { templatesAxios, templateAxios } from './../mixins/requests/TemplatesMixin'

class TemplateCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      categories: [],
      tags: [],
      templates: this.props.templates,
      errorMessages: {}
    }
    this.getTemplates = this.getTemplates.bind(this)
    this.getTemplatesCallback = this.getTemplatesCallback.bind(this)
    this.postTemplate = this.postTemplate.bind(this)
    this.postTemplateCallback = this.postTemplateCallback.bind(this)
    this.destroyTemplate = this.destroyTemplate.bind(this)
    this.destroyTemplateCallback = this.destroyTemplateCallback.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
    this.getTags = this.getTags.bind(this)
    this.getTagsCallback = this.getTagsCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  componentWillMount() {
    this.getTags()
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getTagsCallback(res) {
    this.getTemplates()
    this.setState({
      tags: res.data
    })
  }

  getTags() {
    tagsAxios.get(this.getTagsCallback, this.noticeErrorMessage)
  }

  getCategoriesCallback(res) {
    this.setState({
      categories: res.data
    })
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessage)
  }

  getTemplatesCallback(res) {
    this.getCategories()
    this.setState({
      templates: res.data
    })
  }

  getTemplates() {
    templatesAxios.get(this.getTemplatesCallback, this.noticeErrorMessage)
  }

  postTemplateCallback() {
    this.getTemplates()
    this.noticeAddMessage()
  }

  postTemplate(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    templateAxios.post(params, this.postTemplateCallback, this.noticeErrorMessage)
  }

  destroyTemplateCallback() {
    this.getTemplates()
    this.noticeDestroyedMessage()
  }

  destroyTemplate(templateId) {
    this.setState({
      message: ''
    })
    templateAxios.delete(templateId, this.destroyTemplateCallback, this.noticeErrorMessage)
  }

  render() {
    return (
      <div className='template-card-body-component'>
        {this.renderAlertMessage()}
        <TemplateForm categories={this.state.categories} errorMessages={this.state.errorMessages} handleSendForm={this.postTemplate} tags={this.state.tags} />
        <Templates categories={this.state.categories} getTemplates={this.getTemplates} handleClickDestroyButton={this.destroyTemplate} templates={this.state.templates} />
      </div>
    )
  }
}

TemplateCardBody.propTypes = {
  templates: PropTypes.array.isRequired
}

reactMixin.onClass(TemplateCardBody, MessageNotifierMixin)
reactMixin.onClass(TemplateCardBody, LocalStorageMixin)

export default TemplateCardBody
