import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Record extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(record) {
    this.props.onClickTrashIcon(record)
  }

  render() {
    return (
      <tr className='record-component' id={'record-' + this.props.record.id}>
        <td>
          {this.props.record.category_name}
        </td>
        <td>
          {this.props.record.charge}
        </td>
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.record} />
        </td>
      </tr>
    )
  }
}

Record.propTypes = {
  record: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired
}

export default Record
