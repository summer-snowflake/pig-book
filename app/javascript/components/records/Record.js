import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'
import Currency from './../common/Currency'

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
          <i className='fas fa-th-large left-icon yellow' />
          {this.props.record.category_name}
        </td>
        <td>
          {this.props.record.breakdown_name ? (
            <i className='fas fa-list left-icon light-blue' />
          ) : (null)}
          {this.props.record.breakdown_name}
        </td>
        <td>
          {this.props.record.place_name ? (
            <i className='fas fa-map-marker-alt left-icon blue' />
          ) : (null)}
          {this.props.record.place_name}
        </td>
        <td className='charge-td'>
          <Currency /> {this.props.record.charge}
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
