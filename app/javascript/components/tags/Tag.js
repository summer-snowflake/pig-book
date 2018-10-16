import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import reactMixin from 'react-mixin'
import { SketchPicker } from 'react-color'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Trash from './../common/Trash'
import FormErrorMessages from './../common/FormErrorMessages'
import UpdateButton from './../common/UpdateButton'
import { tagAxios } from './../mixins/requests/TagsMixin'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isEditingColorCode: false,
      colorCode: this.props.tag.color_code,
      name: this.props.tag.name,
      errorMessages: {}
    }
    this.patchTag = this.patchTag.bind(this)
    this.patchTagCallback = this.patchTagCallback.bind(this)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeTagName = this.handleChangeTagName.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.handleClickColorBox = this.handleClickColorBox.bind(this)
  }

  onClickTrashIcon(tag) {
    this.props.onClickTrashIcon(tag)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickCancelIcon() {
    this.setState({
      isEditing: false,
      isEditingColorCode: false
    })
  }

  handleChangeTagName(e) {
    this.setState({
      name: e.target.value
    })
  }

  patchTagCallback() {
    this.setState({
      isEditing: false,
      isEditingColorCode: false
    })
    this.props.getTags()
    this.noticeUpdatedMessage()
  }

  patchTag() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      color_code: this.state.colorCode,
      name: this.state.name
    }
    tagAxios.patch(this.props.tag.id, params, this.patchTagCallback, this.noticeErrorMessages)
  }

  handleChangeComplete(color) {
    this.setState({
      colorCode: color.hex,
      isEditingColorCode: false
    })
  }

  handleClickColorBox() {
    this.setState({
      isEditingColorCode: !this.state.isEditingColorCode
    })
  }

  handleClickUpdateButton() {
    this.patchTag()
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
      <tr className='tag-component' id={'tag-' + this.props.tag.id}>
        {this.state.isEditing ? (
          <td className='color-code-td left-edit-target'>
            <div className='color-code-box-background' onClick={this.handleClickColorBox}>
              <div className='color-code-box' style={styles.color} />
            </div>
            <div className='color-picker'>
              {this.state.isEditingColorCode && (
                <SketchPicker color={this.state.colorCode} onChangeComplete={this.handleChangeComplete} />
              )}
            </div>
          </td>
        ) : (
          <td className='color-code-td left-edit-target'>
            <div className='color-code-box-background change-disabled'>
              <div className='color-code-box change-disabled' style={styles.color} />
            </div>
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeTagName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.tag.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='center-edit-target' />
        )}
        {this.state.isEditing ? (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        ) : (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.tag} />
          {this.renderAlertMessage()}
        </td>
      </tr>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired
}

reactMixin.onClass(Tag, MessageNotifierMixin)

export default Tag
