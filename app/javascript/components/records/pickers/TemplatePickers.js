import React from 'react'
import PropTypes from 'prop-types'

import TemplatePicker from './TemplatePicker'

class TemplatePickers extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickPickerButton = this.handleClickPickerButton.bind(this)
  }

  handleClickPickerButton(template) {
    this.props.onClickPickerButton(template)
  }

  render() {
    return (
      <div className='template-pickers-component'>
        {this.props.templates.map ((template) =>
          <TemplatePicker key={template.id} onClickPickerButton={this.handleClickPickerButton} template={template} />
        )}
      </div>
    )
  }
}

TemplatePickers.propTypes = {
  onClickPickerButton: PropTypes.func.isRequired,
  templates: PropTypes.array.isRequired
}

export default TemplatePickers
