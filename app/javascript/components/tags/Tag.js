import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'
import reactCSS from 'reactcss'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(tag) {
    this.props.onClickTrashIcon(tag)
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
        <td>
          <div className='color-code-box-background change-disabled'>
            <div className='color-code-box change-disabled' style={styles.color} />
          </div>
        </td>
        <td>
          {this.props.tag.name}
        </td>
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
