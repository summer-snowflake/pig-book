import React, { Component } from 'react'

import { ReadRecord, Record } from 'types/api'
import RecordTableRecord from 'components/record/recordTableRecord'

interface Props {
  records: ReadRecord[];
  onClickCopy: (record: Record) => void;
}

class Records extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCopy = this.handleClickCopy.bind(this)
  }

  handleClickCopy(record: Record): void {
    this.props.onClickCopy(record)
  }

  render(): JSX.Element {
    return (
      <table className='records-component table'>
        <tbody>
          {this.props.records.map((record) => (
            <RecordTableRecord key={record.id} onClickCopy={this.handleClickCopy} record={record} />
          ))}
        </tbody>
      </table>
    )
  }
}

export default Records
