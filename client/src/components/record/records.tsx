import React, { Component } from 'react'

import { ReadRecord, Record, Category, Breakdown, Place } from 'types/api'
import RecordTableRecord from 'components/record/recordTableRecord'

interface Props {
  records: ReadRecord[];
  editedRecordId: number | undefined;
  format?: string;
  onClickCopy: (record: Record) => void;
  onClickEdit: (record: Record) => void;
  onClickDestroy: (record: Record) => void;
  onClickCategory?: (category: Category) => void;
  onClickBreakdown?: (breakdown: Breakdown) => void;
  onClickPlace?: (place: Place) => void;
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
        {this.props.records.map((record) => (
          <RecordTableRecord
            editedRecordId={this.props.editedRecordId}
            format={this.props.format}
            key={record.id}
            onClickBreakdown={this.props.onClickBreakdown}
            onClickCategory={this.props.onClickCategory}
            onClickCopy={this.handleClickCopy}
            onClickDestroy={this.props.onClickDestroy}
            onClickEdit={this.handleClickEdit}
            onClickPlace={this.props.onClickPlace}
            record={record}
          />
        ))}
      </table>
    )
  }
}

export default Records
