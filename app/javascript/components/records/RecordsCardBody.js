import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import moment from 'moment'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './Records'
import DateYearFormat from './../common/DateYearFormat'
import DateMonthFormat from './../common/DateMonthFormat'
import { recordsAxios, recordAxios } from './../mixins/requests/RecordsMixin'
import SearchKeywords from './SearchKeywords'
import SearchFormsField from './SearchFormsField'
import RecordsTotals from './RecordsTotals'

class RecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: this.props.year,
      month: this.props.month,
      categoryId: null,
      categoryName: '',
      breakdownId: null,
      breakdownName: '',
      placeId: null,
      placeName: '',
      errorMessages: {},
      records: this.props.records,
      totals: {
        income: '¥0',
        expenditure: '¥0',
        point: 0
      },
      uploading: false
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.handleClickPreviousButton = this.handleClickPreviousButton.bind(this)
    this.handleClickNextButton = this.handleClickNextButton.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
    this.postRecordsUploadCallback = this.postRecordsUploadCallback.bind(this)
    this.onClickBreakdownTagButton = this.onClickBreakdownTagButton.bind(this)
    this.onClickCategoryTagButton = this.onClickCategoryTagButton.bind(this)
    this.onClickPlaceTagButton = this.onClickPlaceTagButton.bind(this)
    this.onClickMonthTagButton = this.onClickMonthTagButton.bind(this)
    this.onChangeMonth = this.onChangeMonth.bind(this)
    this.onClickCategory = this.onClickCategory.bind(this)
    this.onClickBreakdown = this.onClickBreakdown.bind(this)
    this.onClickPlace = this.onClickPlace.bind(this)
    this.handleClickUploadButton = this.handleClickUploadButton.bind(this)
  }

  componentWillMount() {
    this.getRecords(this.props.year, this.props.month)
  }

  onClickMonthTagButton() {
    this.setState({
      month: 0
    })
    this.getRecords(this.state.year, 0, this.state.categoryId, this.state.breakdownId, this.state.placeId)
  }

  onClickCategoryTagButton() {
    this.setState({
      categoryName: '',
      categoryId: null
    })
    this.getRecords(this.state.year, this.state.month, null, this.state.breakdownId, this.state.placeId)
  }

  onClickBreakdownTagButton() {
    this.setState({
      breakdownName: '',
      breakdownId: null
    })
    this.getRecords(this.state.year, this.state.month, this.state.categoryId, null, this.state.placeId)
  }

  onClickPlaceTagButton() {
    this.setState({
      placeName: '',
      placeId: null
    })
    this.getRecords(this.state.year, this.state.month, this.state.categoryId, this.state.breakdownId, null)
  }

  onClickCategory(categoryId, categoryName) {
    this.setState({
      categoryName: categoryName,
      categoryId: categoryId
    })
    this.getRecords(this.state.year, this.state.month, categoryId, this.state.breakdownId, this.state.placeId)
  }

  onClickBreakdown(breakdownId, breakdownName) {
    this.setState({
      breakdownName: breakdownName,
      breakdownId: breakdownId
    })
    this.getRecords(this.state.year, this.state.month, this.state.categoryId, breakdownId, this.state.placeId)
  }

  onClickPlace(placeId, placeName) {
    this.setState({
      placeName: placeName,
      placeId: placeId
    })
    this.getRecords(this.state.year, this.state.month, this.state.categoryId, this.state.breakdownId, placeId)
  }

  handleClickPreviousButton() {
    if (this.state.year && this.state.month) {
      let m = moment(this.state.year + '-' + this.state.month + '-01', 'YYYY-MM-DD')
      let month = m.add(-1, 'months').month() + 1
      let year = m.year()
      if (month == -1) {
        year -= 1
      }
      this.setState({
        year: year,
        month: month
      })
      this.getRecords(year, month, this.state.categoryId, this.state.breakdownId, this.state.placeId)
    } else {
      let year = this.state.year
      year -= 1
      this.setState({
        year: year
      })
      this.getRecords(year, 0, this.state.categoryId, this.state.breakdownId, this.state.placeId)
    }
  }

  handleClickNextButton() {
    if (this.state.year && this.state.month) {
      let m = moment(this.state.year + '-' + this.state.month + '-01')
      let month = m.add(1, 'months').month() + 1
      let year = m.year()
      if (month == 13) {
        year += 1
      }
      this.setState({
        year: year,
        month: month
      })
      this.getRecords(year, month, this.state.categoryId, this.state.breakdownId, this.state.placeId)
    } else {
      let year = this.state.year
      year += 1
      this.setState({
        year: year
      })
      this.getRecords(year, 0, this.state.categoryId, this.state.breakdownId, this.state.placeId)
    }
  }

  getRecordsCallback(res) {
    this.setState({
      records: res.data.records,
      totals: res.data.totals,
    })
  }

  getRecords(year, month, categoryId, breakdownId, placeId) {
    let params = {
      year: String(year)
    }
    if (month) {
      Object.assign(params, { month: String(month) })
    }
    if (categoryId) {
      Object.assign(params, { category_id: categoryId })
    }
    if (breakdownId) {
      Object.assign(params, { breakdown_id: breakdownId })
    }
    if (placeId) {
      Object.assign(params, { place_id: placeId })
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessages)
  }

  destroyRecordCallback() {
    this.getRecords(this.state.year, this.state.month, this.state.categoryId, this.state.breakdownId, this.state.placeId)
    this.noticeDestroyedMessage()
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    recordAxios.delete(recordId, this.destroyRecordCallback, this.noticeErrorMessages)
  }

  onClickEditIcon() {
    // TODO
  }

  onChangeMonth(month) {
    this.setState({
      month: month
    })
    this.getRecords(this.state.year, month, this.state.categoryId, this.state.breakdownId, this.state.placeId)
  }

  postRecordsUploadCallback() {
    this.setState({
      uploading: false
    })
    this.noticeCompletedMessage()
  }

  handleClickUploadButton() {
    this.setState({
      uploading: true
    })
    let params = {
      year: String(this.state.year)
    }
    if (this.state.month) {
      Object.assign(params, { month: String(this.state.month) })
    }
    if (this.state.categoryId) {
      Object.assign(params, { category_id: this.state.categoryId })
    }
    if (this.state.breakdownId) {
      Object.assign(params, { breakdown_id: this.state.breakdownId })
    }
    if (this.state.placeId) {
      Object.assign(params, { place_id: this.state.placeId })
    }
    recordsAxios.upload(params, this.postRecordsUploadCallback, this.noticeErrorMessages)
  }

  render() {
    return (
      <div className='records-card-body-component'>
        {this.renderAlertMessage()}
        {this.state.year && (
          <div className='records-list-title'>
            <button className='btn btn-primary btn-sm float-left' onClick={this.handleClickPreviousButton}>
              <i className='fas fa-chevron-left' />
            </button>
            <span>
              <DateYearFormat year={this.state.year} />
              {this.state.month > 0 && (
                <DateMonthFormat month={this.state.month} />
              )}
            </span>
            <button className='btn btn-primary btn-sm float-right' onClick={this.handleClickNextButton}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
        )}
        {this.props.year && (
          <div>
            <SearchFormsField handleChangeMonth={this.onChangeMonth} month={this.state.month} year={this.state.year} />
            <SearchKeywords
              breakdownName={this.state.breakdownName}
              categoryName={this.state.categoryName}
              handleClickBreakdownTagButton={this.onClickBreakdownTagButton}
              handleClickCategoryTagButton={this.onClickCategoryTagButton}
              handleClickMonthTagButton={this.onClickMonthTagButton}
              handleClickPlaceTagButton={this.onClickPlaceTagButton}
              month={this.state.month}
              placeName={this.state.placeName}
              year={this.state.year}
            />
          </div>
        )}
        <Records
          handleClickBreakdown={this.onClickBreakdown}
          handleClickCategory={this.onClickCategory}
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.onClickEditIcon}
          handleClickPlace={this.onClickPlace}
          longEnabled
          records={this.state.records}
        />
        <RecordsTotals totals={this.state.totals} />
        {this.state.records.length > 0 && (
          <div>
            <button className='btn btn-primary' disabled={this.state.uploading} onClick={this.handleClickUploadButton}>
              {'ダウンロードファイル生成'}
            </button>
            <p className='file-uploaded-message'>
              {'ダウンロードファイルは、'}
              <b>
                <a href='/mypage'>
                  <i className='fas fa-user left-icon' />
                  {'マイページ'}
                </a>
              </b>
              {' からダウンロードできます'}
            </p>
          </div>
        )}
      </div>
    )
  }
}

RecordsCardBody.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  records: PropTypes.array.isRequired
}

reactMixin.onClass(RecordsCardBody, MessageNotifierMixin)

export default RecordsCardBody
