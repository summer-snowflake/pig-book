import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormMixin from './../mixins/FormMixin'

class NewRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm()
    this.refs.charge.value = ''
  }

  render() {
    return (
      <div className='new-record-form-component col'>
        {'new record'}
      </div>
    )
  }
}

NewRecordForm.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(NewRecordForm, FormMixin)

export default NewRecordForm
