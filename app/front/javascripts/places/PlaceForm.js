import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import FormMixin from './../mixins/FormMixin'
import AddButton from './../common/AddButton'

class PlaceForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.placeName = React.createRef()
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.placeName.current.value})
    this.placeName.current.value = ''
  }

  render() {
    return (
      <div className='place-form-component form-row'>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' name='place_name' ref={this.placeName} type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          <AddButton onClickButton={this.handleClickSubmitButton} />
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
