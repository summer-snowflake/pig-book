import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Record, RecordSearchParams } from 'types/api'
import { RecordsStore, EditRecordStore, RecordSearchStore, NewRecordStore } from 'types/store'
import { getEditRecordCategory } from 'actions/categoryActions'
import { getRecords, deleteRecord, setRecordSearchParams, changePage } from 'actions/recordsActions'
import { editRecord, closeEditModal } from 'actions/editRecordActions'
import { copyRecord, closeNewModal } from 'actions/newRecordActions'
import { RootState } from 'reducers/rootReducer'
import Records from 'components/record/records'
import HumanYearMonth from 'components/common/humanYearMonth'
import NewRecordModalContainer from 'components/record/newRecordModal'
import EditRecordModalContainer from 'components/record/editRecordModalContainer'
import Pagination from 'components/list/pagination'
import SearchKeywords from 'components/list/searchKeywordsContainer'

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
  setRecordSearchParams: (params: RecordSearchParams) => void;
  changePage: (page: number) => void;
}

type Props = StateProps & DispatchProps

class RecordsListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCopy = this.handleClickCopy.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)
    this.handleClickPage = this.handleClickPage.bind(this)

    const today = new Date()
    const params = {
      page: 1,
      date: null,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      order: 'published_at'
    }
    this.props.setRecordSearchParams(params)
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
      ...this.props.recordSearch,
      date: null,
      year: this.props.recordSearch.year,
      month: this.props.recordSearch.month,
      order: 'published_at'
    }
    this.props.deleteRecord(record.id, searchParams)
  }

  handleClickLeftArrow(): void {
    let params = {}
    if (this.props.recordSearch.year && this.props.recordSearch.month) {
      const currentMonth = new Date(this.props.recordSearch.year, this.props.recordSearch.month, 1)
      currentMonth.setMonth(currentMonth.getMonth() - 2)
      params = {
        ...this.props.recordSearch,
        page: 1,
        date: null,
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    } else if (this.props.recordSearch.year) {
      params = {
        ...this.props.recordSearch,
        page: 1,
        date: null,
        year: this.props.recordSearch.year - 1,
        month: null
      }
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
  }

  handleClickRightArrow(): void {
    let params = {}
    if (this.props.recordSearch.year && this.props.recordSearch.month) {
      const currentMonth = new Date(this.props.recordSearch.year, this.props.recordSearch.month, 1)
      currentMonth.setMonth(currentMonth.getMonth())
      params = {
        ...this.props.recordSearch,
        page: 1,
        date: null,
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    } else if (this.props.recordSearch.year) {
      params = {
        ...this.props.recordSearch,
        page: 1,
        date: null,
        year: this.props.recordSearch.year + 1,
        month: null
      }
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
  }

  handleClickPage(page: number): void {
    const params = {
      ...this.props.recordSearch,
      page: page
    }
    this.props.changePage(page)
    this.props.getRecords(params)
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
        <div className='center'>
          <div className='month-select-field'>
            <button className='btn btn-secondary btn-sm float-left' onClick={this.handleClickLeftArrow}>
              <i className='fas fa-chevron-left' />
            </button>
            <span className='simple-date'>
              <HumanYearMonth month={this.props.recordSearch.month} year={this.props.recordSearch.year} />
            </span>
            <button className='btn btn-secondary btn-sm float-right' onClick={this.handleClickRightArrow}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
        </div>
        <SearchKeywords />
        {this.props.recordsStore.maxPage > 1 && (
          <Pagination
            currentPage={this.props.recordSearch.page}
            maxPage={this.props.recordsStore.maxPage}
            onClickPage={this.handleClickPage}
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
    },
    setRecordSearchParams(params: RecordSearchParams): void {
      dispatch(setRecordSearchParams(params))
    },
    changePage(page: number): void {
      dispatch(changePage(page))
    }
  }
}

export default connect(mapState, mapDispatch)(RecordsListContainer)