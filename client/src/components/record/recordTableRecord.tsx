import React, { Component } from 'react'

import { ReadRecord, Record } from 'types/api'

interface Props {
  record: ReadRecord;
  onClickCopy: (record: Record) => void;
}

class RecordTableRecord extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCopy = this.handleClickCopy.bind(this)
  }

  handleClickCopy(): void {
    this.props.onClickCopy(this.props.record)
  }

  render(): JSX.Element {
    return (
      <tr className='record-table-record-component'>
        <td className='icon-field-td'>
          <span className='icon-field' onClick={this.handleClickCopy}>
            <i className='far fa-copy' />
          </span>
        </td>
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
      </tr>
    )
  }
}

export default RecordTableRecord
