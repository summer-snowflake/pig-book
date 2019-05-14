import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from '../../mixins/MessageNotifierMixin'
import TemplatePickers from './TemplatePickers'
import { templatesAxios } from '../../mixins/requests/TemplatesMixin'

class AllTemplates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      templates: []
    }
    this.handleClickOpenLink = this.handleClickOpenLink.bind(this)
    this.getTemplates = this.getTemplates.bind(this)
    this.getTemplatesCallback = this.getTemplatesCallback.bind(this)
  }

  handleClickOpenLink() {
    if (!this.state.isOpen) {
      this.getTemplates()
    } else {
      this.setState({
        isOpen: false,
        templates: []
      })
    }
  }

  getTemplates() {
    templatesAxios.get(this.getTemplatesCallback, this.noticeErrorMessages)
  }

  getTemplatesCallback(res) {
    this.setState({
      isOpen: true,
      templates: res.data
    })
  }

  render() {
    return (
      <div className='all-templates-component'>
        <span className='link' onClick={this.handleClickOpenLink}>
          {this.state.isOpen ? (
            <span className='caret-icon'>
              <i className='fas fa-caret-down left-icon' />
            </span>
          ) : (
            <span className='caret-icon'>
              <i className='fas fa-caret-right left-icon' />
            </span>
          )}
          {'すべて表示'}
        </span>
        <TemplatePickers onClickPickerButton={this.props.onClickPickerButton} templates={this.state.templates} />
      </div>
    )
  }
}

reactMixin.onClass(AllTemplates, MessageNotifierMixin)

AllTemplates.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired
}
export default AllTemplates
