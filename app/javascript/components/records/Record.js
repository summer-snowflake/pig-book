import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Trash from './../common/Trash'
import TagsIcons from './TagsIcons'
import DateFormat from './../common/DateFormat'
import SquareIcon from './../common/SquareIcon'

class Record extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickInfoIcon = this.handleClickInfoIcon.bind(this)
  }

  onClickTrashIcon(record) {
    this.props.onClickTrashIcon(record)
  }

  handleClickEditIcon() {
    this.props.onClickEditIcon(this.props.record.id)
  }

  handleClickInfoIcon() {
    this.props.onClickInfoIcon(this.props.record)
  }

  render() {
    let editing = this.props.editingRecordId == this.props.record.id ? 'is-editing-tr' : ''

    return (
      <tr className={'record-component ' + editing} id={'record-' + this.props.record.id}>
        <td className='icon-td'>
          <i className='fas fa-info-circle' onClick={this.handleClickInfoIcon}/>
        </td>
        <td className='icon-td'>
          <i className='fas fa-edit' onClick={this.handleClickEditIcon}/>
        </td>
        {this.props.isListPage && (
          <td>
            <DateFormat targetDate={moment(this.props.record.published_at)} />
          </td>
        )}
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
            <i className='fas fa-map-marker-alt left-icon purple' />
          ) : (null)}
          {this.props.record.place_name}
        </td>
        {this.props.record.tagged_records && (
          <TagsIcons tags={this.props.record.tagged_records} />
        )}
        <td className='charge-td'>
          <SquareIcon balanceOfPayments={this.props.record.balance_of_payments} />
          {this.props.record.human_charge}
        </td>
        <td className='trash-icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.record} />
        </td>
      </tr>
    )
  }
}

Record.propTypes = {
  isListPage: PropTypes.bool,
  editingRecordId: PropTypes.number,
  record: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  onClickInfoIcon: PropTypes.func.isRequired,
  onClickEditIcon: PropTypes.func.isRequired
}

export default Record
