import React, { Component } from 'react'

import { ReadRecord } from 'types/api'

interface Props {
  record: ReadRecord;
}

class RecordTableRecord extends Component<Props> {
  render(): JSX.Element {
    return (
      <tr className='record-table-record-component'>
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
