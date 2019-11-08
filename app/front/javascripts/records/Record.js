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
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleClickBreakdown = this.handleClickBreakdown.bind(this)
    this.handleClickPlace = this.handleClickPlace.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickInfoIcon = this.handleClickInfoIcon.bind(this)
    this.handleClickCopyIcon = this.handleClickCopyIcon.bind(this)
  }

  handleClickBreakdown() {
    this.props.onClickBreakdown(this.props.record.breakdown_id, this.props.record.breakdown_name)
  }

  handleClickCategory() {
    this.props.onClickCategory(this.props.record.category_id, this.props.record.category_name)
  }

  onClickTrashIcon(record) {
    this.props.onClickTrashIcon(record)
  }

  handleClickPlace() {
    this.props.onClickPlace(this.props.record.place_id, this.props.record.place_name)
  }

  handleClickEditIcon() {
    this.props.onClickEditIcon(this.props.record.id)
  }

  handleClickInfoIcon() {
    this.props.onClickInfoIcon(this.props.record)
  }

  handleClickCopyIcon() {
    this.props.onClickCopyIcon(this.props.record.id)
  }

  render() {
    let editing = this.props.editingRecordId == this.props.record.id ? 'is-editing-tr' : ''

    return (
      <tr className={'record-component ' + editing} id={'record-' + this.props.record.id}>
        <td className='editing-label'>
          {this.props.editingRecordId == this.props.record.id && (
            <span className='badge badge-info'>
              <i className='fas fa-angle-double-left left-icon' />
              {'編集中'}
            </span>
          )}
        </td>
        <td className='icon-td'>
          <i className='fas fa-info-circle' onClick={this.handleClickInfoIcon}/>
        </td>
        <td className='icon-td'>
          <i className='far fa-copy' onClick={this.handleClickCopyIcon} />
        </td>
        <td className='icon-td'>
          <i className='fas fa-edit' onClick={this.handleClickEditIcon}/>
        </td>
        {this.props.longEnabled && (
          <td>
            <DateFormat targetDate={moment(this.props.record.published_at)} />
          </td>
        )}
        <td>
          <i className='fas fa-th-large left-icon yellow' />
          <span className='search-keyword-link' onClick={this.handleClickCategory}>
            {this.props.record.category_name}
          </span>
        </td>
        <td>
          {this.props.record.breakdown_name ? (
            <i className='fas fa-list left-icon light-blue' />
          ) : (null)}
          <span className='search-keyword-link' onClick={this.handleClickBreakdown}>
            {this.props.record.breakdown_name}
          </span>
        </td>
        <td>
          {this.props.record.place_name ? (
            <i className='fas fa-map-marker-alt left-icon purple' />
          ) : (null)}
          <span className='search-keyword-link' onClick={this.handleClickPlace}>
            {this.props.record.place_name}
          </span>
        </td>
        {this.props.record.tagged_records && (
          <TagsIcons tags={this.props.record.tagged_records} />
        )}
        <td className='charge-td'>
          <SquareIcon balanceOfPayments={this.props.record.balance_of_payments} />
          {this.props.record.human_charge}
        </td>
        <td>
          {this.props.longEnabled && this.props.record.cashless_charge > 0 && (
            <span>
              <i className='fas fa-copyright left-icon green' />
              {this.props.record.cashless_charge}
            </span>
          )}
        </td>
        <td>
          {this.props.longEnabled && this.props.record.point > 0 && (
            <span>
              <i className='fas fa-parking left-icon green' />
              {this.props.record.point}
            </span>
          )}
        </td>
        <td className='trash-icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.record} />
        </td>
      </tr>
    )
  }
}

Record.propTypes = {
  longEnabled: PropTypes.bool,
  editingRecordId: PropTypes.string,
  record: PropTypes.object.isRequired,
  onClickBreakdown: PropTypes.func.isRequired,
  onClickCategory: PropTypes.func.isRequired,
  onClickPlace: PropTypes.func.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  onClickInfoIcon: PropTypes.func.isRequired,
  onClickCopyIcon: PropTypes.func.isRequired,
  onClickEditIcon: PropTypes.func.isRequired
}

export default Record
