import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(tag) {
    this.props.onClickTrashIcon(tag)
  }

  render() {
    return (
      <tr className='tag-component' id={'tag-' + this.props.tag.id}>
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
