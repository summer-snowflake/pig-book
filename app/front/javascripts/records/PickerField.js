import React from 'react'
import PropTypes from 'prop-types'

import CategoryPickers from './pickers/CategoryPickers'
import TemplatePickers from './pickers/TemplatePickers'
import TagPickers from './pickers/TagPickers'
import AllTemplates from './template_pickers/AllTemplates'

class PickerField extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCategoryPickerButton = this.handleClickCategoryPickerButton.bind(this)
    this.handleClickTemplatePickerButton = this.handleClickTemplatePickerButton.bind(this)
    this.handleClickTagPickerButton = this.handleClickTagPickerButton.bind(this)
  }

  handleClickCategoryPickerButton(category) {
    this.props.handleClickCategoryPickerButton(category)
  }

  handleClickTemplatePickerButton(template) {
    this.props.handleClickTemplatePickerButton(template)
  }

  handleClickTagPickerButton(tag) {
    this.props.handleClickTagPickerButton(tag)
  }

  render() {
    return (
      <div className='picker-form-component col-md-2'>
        <span className='picker-label'>
          <i className='fas fa-th-large left-icon' />
          {'カテゴリ'}
        </span>
        <CategoryPickers categories={this.props.recentlyUsed.recently_used_categories} onClickPickerButton={this.handleClickCategoryPickerButton} />
        <span className='picker-label'>
          <i className='fas fa-subway left-icon' />
          {'テンプレート'}
        </span>
        <TemplatePickers onClickPickerButton={this.handleClickTemplatePickerButton} templates={this.props.recentlyUsed.recently_used_templates} />
        <span className='picker-label'>
          <i className='fas fa-tags left-icon' />
          {'ラベル'}
        </span>
        <TagPickers onClickPickerButton={this.handleClickTagPickerButton} tags={this.props.recentlyUsed.recently_used_tags} />
        <AllTemplates />
      </div>
    )
  }
}

PickerField.propTypes = {
  handleClickCategoryPickerButton: PropTypes.func.isRequired,
  handleClickTemplatePickerButton: PropTypes.func.isRequired,
  handleClickTagPickerButton: PropTypes.func.isRequired,
  recentlyUsed: PropTypes.object.isRequired
}

export default PickerField
