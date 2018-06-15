import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import FormMixin from './../mixins/FormMixin'
import AddButton from './../common/AddButton'

class TagForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.refs.name.value, color_code: '#00ffff'})
    this.refs.name.value = ''
  }

  render() {
    return (
      <div className='tag-form-component form-row'>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' name='tag_name' ref='name' type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          <AddButton onClickButton={this.handleClickSubmitButton} />
        </div>
      </div>
    )
  }
}

TagForm.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(TagForm, FormMixin)

export default TagForm
