import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import FormErrorMessages from './../common/FormErrorMessages'
import FormMixin from './../mixins/FormMixin'
import AddButton from './../common/AddButton'

class TagForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingColorCode: false,
      colorCode: this.getRandomColor()
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.handleClickColorBox = this.handleClickColorBox.bind(this)
    this.getRandomColor = this.getRandomColor.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.refs.name.value, color_code: this.state.colorCode})
    this.refs.name.value = ''
  }

  handleChangeComplete(color) {
    this.setState({
      colorCode: color.hex,
      isEditingColorCode: false,
    })
  }

  handleClickColorBox() {
    this.setState({
      isEditingColorCode: !this.state.isEditingColorCode
    })
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          background: `${this.state.colorCode}`
        }
      }
    })

    return (
      <div className='tag-form-component form-row'>
        <div className={'form-group col-auto mb-3 ' + this.fieldWithErrors('color_code')}>
          <div className='color-code-box-background' onClick={this.handleClickColorBox}>
            <div className='color-code-box' style={styles.color} />
          </div>
          <div className='color-picker'>
            {this.state.isEditingColorCode ? (
              <SketchPicker color={this.state.colorCode} onChangeComplete={this.handleChangeComplete} />
            ) : (
              null
            )}
          </div>
        </div>
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
