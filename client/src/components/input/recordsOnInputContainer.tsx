import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { NewRecordStore } from 'types/store'
import { getCategories } from 'actions/categoriesActions'
import { changePublishedOn } from 'actions/newRecordActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  newRecord: NewRecordStore;
}

interface DispatchProps {
  getRecords: () => void;
  changePublishedOn: (date: Date) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class RecordsOnInputContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickLeftArrow = this.handleClickLeftArrow.bind(this)
    this.handleClickRightArrow = this.handleClickRightArrow.bind(this)
  }

  handleClickLeftArrow(): void {
    const publishedOn = this.props.newRecord.record.published_on
    publishedOn.setDate(publishedOn.getDate() - 1)
    this.props.changePublishedOn(publishedOn)
  }

  handleClickRightArrow(): void {
    const publishedOn = this.props.newRecord.record.published_on
    publishedOn.setDate(publishedOn.getDate() + 1)
    this.props.changePublishedOn(publishedOn)
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
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newRecord: state.newRecord
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getRecords(): void {
      dispatch(getCategories())
    },
    changePublishedOn(date: Date): void {
      dispatch(changePublishedOn(date))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(RecordsOnInputContainer))
