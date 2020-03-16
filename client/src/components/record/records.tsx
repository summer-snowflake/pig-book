import React, { Component } from 'react'

import { ReadRecord, Record } from 'types/api'
import RecordTableRecord from 'components/record/recordTableRecord'

interface Props {
  records: ReadRecord[];
  editedRecordId: number | undefined;
  onClickCopy: (record: Record) => void;
  onClickEdit: (record: Record) => void;
  onClickDestroy: (record: Record) => void;
}

class Records extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
  }

  handleClickCopy(record: Record): void {
    this.props.onClickCopy(record)
  }

  handleClickEdit(record: Record): void {
    this.props.onClickEdit(record)
  }

  render(): JSX.Element {
    return (
      <table className='records-component table'>
        <tbody>
          {this.props.records.map((record) => (
            <RecordTableRecord
              editedRecordId={this.props.editedRecordId}
              key={record.id}
              onClickCopy={this.handleClickCopy}
              onClickDestroy={this.props.onClickDestroy}
              onClickEdit={this.handleClickEdit}
              record={record}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

export default Records
