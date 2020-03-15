import React, { Component } from 'react'

import { ReadRecord } from 'types/api'
import RecordTableRecord from 'components/record/recordTableRecord'

interface Props {
  records: ReadRecord[];
}

class Records extends Component<Props> {
  render(): JSX.Element {
    return (
      <table className='records-component table'>
        <tbody>
          {this.props.records.map((record) => (
            <RecordTableRecord key={record.id} record={record} />
          ))}
        </tbody>
      </table>
    )
  }
}

export default Records
