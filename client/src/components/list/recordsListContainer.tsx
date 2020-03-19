import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Record, RecordSearchParams } from 'types/api'
import { RecordsStore, EditRecordStore, RecordSearchStore, NewRecordStore } from 'types/store'
import { getEditRecordCategory } from 'actions/categoryActions'
import { getRecords, deleteRecord, setDateAsSearch } from 'actions/recordsActions'
import { editRecord, closeEditModal } from 'actions/editRecordActions'
import { copyRecord, closeNewModal } from 'actions/newRecordActions'
import { RootState } from 'reducers/rootReducer'
import Records from 'components/record/records'
import NewRecordModalContainer from 'components/record/newRecordModal'
import EditRecordModalContainer from 'components/record/editRecordModalContainer'

import 'stylesheets/list.sass'

interface StateProps {
  editRecordStore: EditRecordStore;
  newRecordStore: NewRecordStore;
  recordsStore: RecordsStore;
  recordSearch: RecordSearchStore;
}

interface DispatchProps {
  getRecords: (params: RecordSearchParams) => void;
  copyRecord: (record: Record) => void;
  editRecord: (record: Record) => void;
  closeEditModal: () => void;
  closeNewModal: () => void;
  getEditRecordCategory: (categoryId: number) => void;
  deleteRecord: (recordId: number, searchParams: RecordSearchParams) => void;
  setDateAsSearch: (date: Date | null) => void;
}

type Props = StateProps & DispatchProps

class RecordsListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)

    const params = {
      year: this.props.recordSearch.year,
      month: this.props.recordSearch.month
    }
    this.props.setDateAsSearch(null)
    this.props.getRecords(params)
  }

  handleClickCopy(record: Record): void {
    this.props.copyRecord(record)
  }

  handleClickEdit(record: Record): void {
    this.props.editRecord(record)
    this.props.getEditRecordCategory(record.category.id)
  }

  handleClickClose(): void {
    this.props.closeEditModal()
    this.props.closeNewModal()
  }

  handleClickDestroy(record: Record): void {
    const searchParams = {
      year: this.props.recordSearch.year,
      month: this.props.recordSearch.month
    }
    this.props.deleteRecord(record.id, searchParams)
  }

  render(): JSX.Element {
    return (
      <div className='records-list-component row'>
        {this.props.newRecordStore.isOpenNewRecordModal && (
          <NewRecordModalContainer
            isOpen={this.props.newRecordStore.isOpenNewRecordModal}
            onClickClose={this.handleClickClose}
          />
        )}
        {this.props.editRecordStore.isOpenEditRecordModal && (
          <EditRecordModalContainer
            isOpen={this.props.editRecordStore.isOpenEditRecordModal}
            onClickClose={this.handleClickClose}
          />
        )}
        <Records
          editedRecordId={this.props.editRecordStore.editedRecordId}
          format='detail'
          onClickCopy={this.handleClickCopy}
          onClickDestroy={this.handleClickDestroy}
          onClickEdit={this.handleClickEdit}
          records={this.props.recordsStore.records}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newRecordStore: state.newRecord,
    editRecordStore: state.editRecord,
    recordsStore: state.records,
    recordSearch: state.recordSearch
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
    getEditRecordCategory(categoryId: number): void {
      dispatch(getEditRecordCategory(categoryId))
    },
    getRecords(params: RecordSearchParams): void {
      dispatch(getRecords(params))
    },
    setDateAsSearch(date: Date | null): void {
      dispatch(setDateAsSearch(date))
    },
    closeEditModal(): void {
      dispatch(closeEditModal())
    },
    closeNewModal(): void {
      dispatch(closeNewModal())
    },
    deleteRecord(recordId: number, searchParams: RecordSearchParams): void {
      dispatch(deleteRecord(recordId)).then(() => {
        dispatch(getRecords(searchParams))
      })
    }
  }
}

export default connect(mapState, mapDispatch)(RecordsListContainer)