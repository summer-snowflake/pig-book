import React from 'react'
import PropTypes from 'prop-types'

import Template from './Template'
import DestroyModal from './../common/DestroyModal'

class Templates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      template: {
        id: null
      },
      destroyModalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(template) {
    this.setState({
      template: template,
      destroyModalIsOpen: true
    })
  }

  onClickDestroyButton(template_id) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(template_id)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='templates-component'>
        <table className='table'>
          <tbody>
            {this.props.templates.map((template) =>
              <Template categories={this.props.categories} getTemplates={this.props.getTemplates} key={template.id} onClickTrashIcon={this.handleClickTrashIcon} template={template} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.template} modalIsOpen={this.state.destroyModalIsOpen} />
      </div>
    )
  }
}

Templates.propTypes = {
  categories: PropTypes.array.isRequired,
  templates: PropTypes.array.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  getTemplates: PropTypes.func.isRequired
}

export default Templates
