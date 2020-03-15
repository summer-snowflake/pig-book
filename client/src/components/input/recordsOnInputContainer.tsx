import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { NewRecordStore, RecordsStore } from 'types/store'
import { changePublishedOn } from 'actions/newRecordActions'
import { RootState } from 'reducers/rootReducer'
import Records from 'components/record/records'
import { getRecords } from 'actions/recordsActions'
import { RecordSearchParams } from 'types/api'

interface StateProps {
  newRecord: NewRecordStore;
  records: RecordsStore;
}

interface DispatchProps {
  getRecords: (params: RecordSearchParams) => void;
  changePublishedOn: (date: Date) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class RecordsOnInputContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)

    const params = {
      date: this.props.newRecord.record.published_on
    }
    this.props.getRecords(params)
  }

  handleClickLeftArrow(): void {
    const publishedOn = this.props.newRecord.record.published_on
    publishedOn.setDate(publishedOn.getDate() - 1)
    this.props.changePublishedOn(publishedOn)
    this.props.getRecords({ date: publishedOn })
  }

  handleClickRightArrow(): void {
    const publishedOn = this.props.newRecord.record.published_on
    publishedOn.setDate(publishedOn.getDate() + 1)
    this.props.changePublishedOn(publishedOn)
    this.props.getRecords({ date: publishedOn })
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
        <div className='card-body'>
          <div className='date-select-field'>
            <button className='btn btn-secondary btn-sm float-left' onClick={this.handleClickLeftArrow}>
              <i className='fas fa-chevron-left' />
            </button>
            <span className='simple-date'>
              {this.simpleDate(this.props.newRecord.record.published_on)}
            </span>
            <button className='btn btn-secondary btn-sm float-right' onClick={this.handleClickRightArrow}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
          <Records records={this.props.records.records} />
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newRecord: state.newRecord,
    records: state.records
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getRecords(params: RecordSearchParams): void {
      dispatch(getRecords(params))
    },
    changePublishedOn(date: Date): void {
      dispatch(changePublishedOn(date))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(RecordsOnInputContainer))
