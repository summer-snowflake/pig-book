import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { RecordSearchParams, Record } from 'types/api'
import { NewRecordStore, RecordsStore, EditRecordStore } from 'types/store'
import { changePublishedOn, copyRecord } from 'actions/newRecordActions'
import { getRecords } from 'actions/recordsActions'
import { editRecord, closeEditModal } from 'actions/editRecordActions'
import { getCategory, getEditRecordCategory } from 'actions/categoryActions'
import { RootState } from 'reducers/rootReducer'
import Records from 'components/record/records'
import EditRecordModalContainer from 'components/record/editRecordModalContainer'

interface StateProps {
  newRecordStore: NewRecordStore;
  editRecordStore: EditRecordStore;
  records: RecordsStore;
}

interface DispatchProps {
  getRecords: (params: RecordSearchParams) => void;
  copyRecord: (record: Record) => void;
  editRecord: (record: Record) => void;
  getCategory: (categoryId: number) => void;
  getEditRecordCategory: (categoryId: number) => void;
  changePublishedOn: (date: Date) => void;
  closeEditModal: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class RecordsOnInputContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)
    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)

    this.state = {
      isOpenEditRecordModal: false
    }

    const params = {
      date: this.props.newRecordStore.record.published_on
    }
    this.props.getRecords(params)
  }

  handleClickLeftArrow(): void {
    const publishedOn = this.props.newRecordStore.record.published_on
    publishedOn.setDate(publishedOn.getDate() - 1)
    this.props.changePublishedOn(publishedOn)
    this.props.getRecords({ date: publishedOn })
  }

  handleClickRightArrow(): void {
    const publishedOn = this.props.newRecordStore.record.published_on
    publishedOn.setDate(publishedOn.getDate() + 1)
    this.props.changePublishedOn(publishedOn)
    this.props.getRecords({ date: publishedOn })
  }

  handleClickCopy(record: Record): void {
    this.props.copyRecord(record)
    this.props.getCategory(record.category.id)
  }

  handleClickEdit(record: Record): void {
    this.props.editRecord(record)
    this.props.getEditRecordCategory(record.category.id)
  }

  handleClickClose(): void {
    this.props.closeEditModal()
  }

  simpleDate(date: Date): string {
    const { t } = this.props
    const format = t('format.date')
    let dateStr = format
    dateStr = dateStr.replace(/YYYY/, String(date.getFullYear()))
    dateStr = dateStr.replace(/MM/, String(date.getMonth() + 1))
    dateStr = dateStr.replace(/DD/, String(date.getDate()))
    dateStr = dateStr.replace(/W/, t('format.week.' + String(date.getDay())))
    return dateStr
  }

  render(): JSX.Element {
    return (
      <div className='records-on-input-component card col'>
        <EditRecordModalContainer
          isOpen={this.props.editRecordStore.isOpenEditRecordModal}
          onClickClose={this.handleClickClose}
        />
        <div className='card-body'>
          <div className='date-select-field'>
            <button className='btn btn-secondary btn-sm float-left' onClick={this.handleClickLeftArrow}>
              <i className='fas fa-chevron-left' />
            </button>
            <span className='simple-date'>
              {this.simpleDate(this.props.newRecordStore.record.published_on)}
            </span>
            <button className='btn btn-secondary btn-sm float-right' onClick={this.handleClickRightArrow}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
          <Records
            onClickCopy={this.handleClickCopy}
            onClickEdit={this.handleClickEdit}
            records={this.props.records.records}
          />
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newRecordStore: state.newRecord,
    editRecordStore: state.editRecord,
    records: state.records
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    copyRecord(record: Record): void {
      dispatch(copyRecord(record))
    },
    editRecord(record: Record): void {
      dispatch(editRecord(record))
    },
    getCategory(categoryId: number): void {
      dispatch(getCategory(categoryId))
    },
    getEditRecordCategory(categoryId: number): void {
      dispatch(getEditRecordCategory(categoryId))
    },
    getRecords(params: RecordSearchParams): void {
      dispatch(getRecords(params))
    },
    changePublishedOn(date: Date): void {
      dispatch(changePublishedOn(date))
    },
    closeEditModal(): void {
      dispatch(closeEditModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(RecordsOnInputContainer))
