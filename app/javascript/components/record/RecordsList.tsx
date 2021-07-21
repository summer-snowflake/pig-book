import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ReadRecord, Record, Category, Breakdown, Place, Tag } from 'types/api'
import { RecordSearchStore } from 'types/store'
import RecordItem from 'components/record/RecordItem'

interface Props extends I18nProps {
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
  onClickTagIcon?: (tag: Tag) => void;
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
    const { t } = this.props

    return (
      <table className={'records-list-component table' + (this.props.isLoading ? ' loading' : '')}>
        {this.props.records.length > 0 && this.props.recordSearchStore && this.props.onClickSort && this.props.format === 'detail' && (
          <tbody>
            <tr>
              <td className='icon-field' colSpan={2} data-order='created_at' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'created_at' ? ' checked' : '')} data-tip={t('toolTip.sortCreatedAt')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='published_at' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'published_at' ? ' checked' : '')} data-tip={t('toolTip.sortPublishedAt')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='category_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'category_id' ? ' checked' : '')} data-tip={t('toolTip.sortCategory')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='breakdown_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'breakdown_id' ? ' checked' : '')} data-tip={t('toolTip.sortBreakdown')} icon={['fas', 'sort-down']} />
              </td>
              <td className='icon-field' data-order='place_id' onClick={this.props.onClickSort}>
                <FontAwesomeIcon className={(this.props.recordSearchStore.order === 'place_id' ? ' checked' : '')} data-tip={t('toolTip.sortPlace')} icon={['fas', 'sort-down']} />
              </td>
              <td colSpan={5} />
            </tr>
          </tbody>
        )}
        {this.props.records.map((record) => (
          <RecordItem
            editedRecordId={this.props.editedRecordId}
            format={this.props.format}
            key={record.id}
            onClickBreakdown={this.props.onClickBreakdown}
            onClickCategory={this.props.onClickCategory}
            onClickCopy={this.handleClickCopy}
            onClickDestroy={this.props.onClickDestroy}
            onClickEdit={this.handleClickEdit}
            onClickPlace={this.props.onClickPlace}
            onClickTagIcon={this.props.onClickTagIcon}
            record={record}
          />
        ))}
      </table>
    )
  }
}

export default withTranslation()(Records)
