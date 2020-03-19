import React, { Component } from 'react'

import { ReadRecord, Record } from 'types/api'
import Trash from 'components/common/trash'
import DestroyModal from 'components/common/destroyModal'
import HumanDate from 'components/common/humanDate'

interface Props {
  record: ReadRecord;
  format?: string;
  editedRecordId: number | undefined;
  onClickCopy: (record: Record) => void;
  onClickEdit: (record: Record) => void;
  onClickDestroy: (record: Record) => void;
}

interface State {
  isOpenDestroyModal: boolean;
}

class RecordTableRecord extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false
    }

    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
  }

  handleClickCopy(): void {
    this.props.onClickCopy(this.props.record)
  }

  handleClickEdit(): void {
    this.props.onClickEdit(this.props.record)
  }

  handleClickClose(): void {
    this.setState({
      isOpenDestroyModal: false
    })
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickDestroy(): void {
    this.setState({
      isOpenDestroyModal: false
    })
    this.props.onClickDestroy(this.props.record)
  }

  render(): JSX.Element {
    return (
      <tr className={'record-table-record-component' + (this.props.record.id === this.props.editedRecordId ? ' edited' : '')}>
        <td className='icon-field-td'>
          <span className='icon-field' onClick={this.handleClickCopy}>
            <i className='far fa-copy' />
          </span>
        </td>
        <td className='icon-field-td'>
          <span className='icon-field' onClick={this.handleClickEdit}>
            <i className='far fa-edit' />
          </span>
        </td>
        {this.props.format === 'detail' && (
          <td className='date-field-td'>
            <HumanDate date={new Date(this.props.record.published_at)} />
          </td>
        )}
        <td className='record-td'>
          {this.props.record.category && (
            <span>
              <i className='fas fa-th-large left-icon yellow' />
              {this.props.record.category.name}
            </span>
          )}
        </td>
        <td className='record-td'>
          {this.props.record.breakdown && (
            <span>
              <i className='fas fa-list left-icon light-blue' />
              {this.props.record.breakdown.name}
            </span>
          )}
        </td>
        <td className='record-td'>
          {this.props.record.place && (
            <span>
              <i className='fas fa-map-marker-alt left-icon blue' />
              {this.props.record.place.name}
            </span>
          )}
        </td>
        <td className='record-charge-td'>
          {this.props.record.category.balance_of_payments === true ? (
            <i className='fas fa-plus-square left-icon blue' />
          ) : (
            <i className='fas fa-minus-square left-icon red' />
          )}
          {this.props.record.human_charge}
        </td>
        {this.props.format === 'detail' && (
          <td className={'record-cashless-charge-td' + (this.props.record.cashless_charge === 0 ? ' zero' : '')}>
            <i className='fas fa-copyright left-icon' />
            {this.props.record.cashless_charge}
          </td>
        )}
        {this.props.format === 'detail' && (
          <td className={'record-point-td' + (this.props.record.cashless_charge === 0 ? ' zero' : '')}>
            <i className='fas fa-parking left-icon' />
            {this.props.record.point}
          </td>
        )}
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
      </tr>
    )
  }
}

export default RecordTableRecord
