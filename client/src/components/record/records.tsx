import React, { Component } from 'react'

import { ReadRecord, Record, Category, Breakdown, Place } from 'types/api'
import { RecordSearchStore } from 'types/store'
import RecordTableRecord from 'components/record/recordTableRecord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  records: ReadRecord[];
  recordSearchStore?: RecordSearchStore;
  editedRecordId: number | undefined;
  format?: string;
  isLoading: boolean;
  onClickCopy: (record: Record) => void;
  onClickEdit: (record: Record) => void;
  onClickDestroy: (record: Record) => void;
  onClickCategory?: (category: Category) => void;
  onClickBreakdown?: (breakdown: Breakdown) => void;
  onClickPlace?: (place: Place) => void;
  onClickSort?: (e: React.MouseEvent<HTMLElement>) => void;
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
      <table className={'records-component table' + (this.props.isLoading ? ' loading' : '')}>
        {this.props.recordSearchStore && this.props.onClickSort && this.props.format === 'detail' && (
          <tbody>
            <tr>
              <td className='icon-field' colSpan={2} data-order='created_at' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'created_at' ? ' checked' : '')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='published_at' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'published_at' ? ' checked' : '')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='category_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'category_id' ? ' checked' : '')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='breakdown_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'breakdown_id' ? ' checked' : '')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='place_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'place_id' ? ' checked' : '')} icon={['fas', 'sort-down']} />
              </td>
              <td colSpan={5} />
            </tr>
          </tbody>
        )}
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
