import React from 'react'
import PropTypes from 'prop-types'

class TemplatesSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectTemplate = this.handleSelectTemplate.bind(this)
  }

  handleSelectTemplate(e) {
    let template = this.props.templates.find( template => template.id == e.target.value )
    this.props.handleSelectTemplate(template)
  }

  render() {
    return (
      <span className='templates-select-box-component'>
        <div className='input-group mb-1'>
          <select className='form-control' disabled={this.props.isDisabled} id='selectable-templates' onChange={this.handleSelectTemplate} value={this.props.selectedTemplateId || ''}>
            <option value=''>{'- テンプレート -'}</option>
            {this.props.templates.map ((template) =>
              <option key={template.id} value={String(template.id)}>{template.name}</option>
            )}
          </select>
        </div>
      </span>
    )
  }
}

TemplatesSelectBox.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  templates: PropTypes.array.isRequired,
  selectedTemplateId: PropTypes.string,
  handleSelectTemplate: PropTypes.func.isRequired
}

export default TemplatesSelectBox
