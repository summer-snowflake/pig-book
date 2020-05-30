import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter } from 'react-router-dom'

import { Record, RecordSearchParams, Category, Breakdown, Place } from 'types/api'
import { RecordsStore, EditRecordStore, RecordSearchStore, NewRecordStore } from 'types/store'
import { RouteComponentProps } from 'types/react-router'
import { encodeQueryData } from 'modules/encode'
import { getEditRecordCategory } from 'actions/categoryActions'
import { getRecords, deleteRecord, setRecordSearchParams, changePage } from 'actions/recordsActions'
import { editRecord, closeEditModal } from 'actions/editRecordActions'
import { copyRecord, closeNewModal } from 'actions/newRecordActions'
import { RootState } from 'reducers/rootReducer'
import Records from 'components/record/records'
import HumanYearMonth from 'components/common/humanYearMonth'
import LoadingImage from 'components/common/loadingImage'
import NewRecordModalContainer from 'components/record/newRecordModal'
import EditRecordModalContainer from 'components/record/editRecordModalContainer'
import RecordTotalsTable from 'components/record/recordTotalsTable'
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

type Props = RouteComponentProps & StateProps & DispatchProps

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
    this.handleClickCategory = this.handleClickCategory.bind(this)
    this.handleClickBreakdown = this.handleClickBreakdown.bind(this)
    this.handleClickPlace = this.handleClickPlace.bind(this)
    this.handleClickSort = this.handleClickSort.bind(this)

    const today = new Date()
    const queryParams = new URLSearchParams(this.props.location.search)
    const page = queryParams.get('page')
    const year = queryParams.get('year')
    const month = queryParams.get('month')
    const order = queryParams.get('order')
    const category_id = queryParams.get('category_id')
    const breakdown_id = queryParams.get('breakdown_id')
    const place_id = queryParams.get('place_id')
    const params = {
      page: (page ? Number(page) : undefined) || 1,
      date: null,
      year: (year ? Number(year) : undefined) || today.getFullYear(),
      month: (month ? Number(month) : undefined) || (year ? null : (today.getMonth() + 1)),
      order: order || 'published_at',
      category_id: category_id ? Number(category_id) : null,
      category_name: category_id ? 'id: ' + category_id : '',
      breakdown_id: breakdown_id ? Number(breakdown_id) : null,
      breakdown_name: breakdown_id ? 'id: ' + breakdown_id : '',
      place_id: place_id ? Number(place_id) : null,
      place_name: place_id ? 'id: ' + place_id : '',
    }
    this.props.changePage(params.page)
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
    let params = {
      ...this.props.recordSearch,
    }
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
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
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
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickPage(page: number): void {
    const params = {
      ...this.props.recordSearch,
      page: page
    }
    this.props.changePage(page)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickCategory(category: Category): void {
    const params = {
      ...this.props.recordSearch,
      page: 1,
      category_id: category.id,
      category_name: category.name
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickBreakdown(breakdown: Breakdown): void {
    const params = {
      ...this.props.recordSearch,
      page: 1,
      breakdown_id: breakdown.id,
      breakdown_name: breakdown.name
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickPlace(place: Place): void {
    const params = {
      ...this.props.recordSearch,
      page: 1,
      place_id: place.id,
      place_name: place.name
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  handleClickSort(e: React.MouseEvent<HTMLElement>): void {
    const params = {
      ...this.props.recordSearch,
      order: e.currentTarget.dataset.order
    }
    this.props.setRecordSearchParams(params)
    this.props.getRecords(params)
    this.props.history.push({
      search: '?' + encodeQueryData(params)
    })
  }

  render(): JSX.Element {
    return (
      <div className='records-list-component'>
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
        {this.props.recordsStore.records.length > 0 || !this.props.recordsStore.isLoading ? (
          <Records
            editedRecordId={this.props.editRecordStore.editedRecordId}
            format='detail'
            isLoading={this.props.recordsStore.isLoading}
            onClickBreakdown={this.handleClickBreakdown}
            onClickCategory={this.handleClickCategory}
            onClickCopy={this.handleClickCopy}
            onClickDestroy={this.handleClickDestroy}
            onClickEdit={this.handleClickEdit}
            onClickPlace={this.handleClickPlace}
            onClickSort={this.handleClickSort}
            records={this.props.recordsStore.records}
            recordSearchStore={this.props.recordSearch}
          />
        ) : (
          <LoadingImage />
        )}
        <div className='pagination-field'>
          {this.props.recordsStore.maxPage > 1 && (
            <Pagination
              currentPage={this.props.recordSearch.page}
              maxPage={this.props.recordsStore.maxPage}
              onClickPage={this.handleClickPage}
            />
          )}
        </div>
        {this.props.recordsStore.records.length > 0 && (
          <RecordTotalsTable
            totals={this.props.recordsStore.totals}
          />
        )}
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

export default connect(mapState, mapDispatch)(withRouter(RecordsListContainer))
