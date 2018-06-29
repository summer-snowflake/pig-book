import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import Trash from './../common/Trash'
import UpdateButton from './../common/UpdateButton'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      name: this.props.tag.name
    }
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeTagName = this.handleChangeTagName.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
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
      isEditing: false
    })
  }

  handleChangeTagName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleClickUpdateButton() {
  }

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          background: `${this.props.tag.color_code}`
        }
      }
    })

    return (
      <tr className='tag-component' id={'tag-' + this.props.tag.id}>
        {this.state.isEditing ? (
          <td className='color-code-td left-edit-target'>
            <div className='color-code-box-background'>
              <div className='color-code-box' style={styles.color} />
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
        </td>
      </tr>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired
}

export default Tag
