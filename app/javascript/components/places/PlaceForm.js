import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import FormMixin from './../mixins/FormMixin'

class PlaceForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.refs.name.value})
    this.refs.name.value = ''
  }

  render() {
    return (
      <div className='place-form-component form-row'>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' ref='name' type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          <input className='btn btn-secondary' onClick={this.handleClickSubmitButton} type='submit' value={'追加する'} />
        </div>
      </div>
    )
  }
}

PlaceForm.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(PlaceForm, FormMixin)

export default PlaceForm
