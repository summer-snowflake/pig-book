import React from 'react'
import PropTypes from 'prop-types'

import TemplatePickers from './TemplatePickers'
import AllTemplates from './AllTemplates'

class PickerField extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickTemplatePickerButton = this.handleClickTemplatePickerButton.bind(this)
  }

  handleClickTemplatePickerButton(template) {
    this.props.handleClickTemplatePickerButton(template)
  }

  render() {
    return (
      <div className='picker-form-component col-md-2'>
        <TemplatePickers onClickPickerButton={this.handleClickTemplatePickerButton} templates={this.props.templates} />
        <AllTemplates onClickPickerButton={this.handleClickTemplatePickerButton} />
      </div>
    )
  }
}

PickerField.propTypes = {
  handleClickTemplatePickerButton: PropTypes.func.isRequired,
  templates: PropTypes.array.isRequired
}

export default PickerField
