import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'
import moment from 'moment'

import NewRecordForm from './NewRecordForm'
import PickerField from './PickerField'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import OneDayRecords from './OneDayRecords'
import Tag from './Tag'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import { categoriesAxios } from './../mixins/requests/CategoriesMixin'
import { recordsAxios, recordAxios } from './../mixins/requests/RecordsMixin'
import { profileAxios } from './../mixins/requests/BaseSettingMixin'

class NewRecordCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      errorMessages: {},
      editingRecordId: undefined,
      baseSetting: {},
      categories: [],
      breakdowns: [],
      places: [],
      tags: [],
      templates: [],
      checkedPoint: false,
      checkedPointDisabled: true,
      selectedPublishedAt: moment(),
      selectedCategoryId: undefined,
      selectedBreakdownId: undefined,
      selectedBalanceOfPayments: undefined,
      selectedPlaceId: undefined,
      selectedTemplateId: undefined,
      selectedTags: [],
      selectedGenerateTags: {},
      inputCharge: '',
      inputPoint: '0',
      inputMemo: '',
      records: this.props.records,
      targetDate: moment(),
      recentlyUsed: this.props.recentlyUsed
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.postRecord = this.postRecord.bind(this)
    this.postRecordCallback = this.postRecordCallback.bind(this)
    this.patchRecord = this.patchRecord.bind(this)
    this.patchRecordCallback = this.patchRecordCallback.bind(this)
    this.getBaseSetting = this.getBaseSetting.bind(this)
    this.getBaseSettingCallback = this.getBaseSettingCallback.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
    this.getRecentlyUsed = this.getRecentlyUsed.bind(this)
    this.getTags = this.getTags.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectNewCategory = this.onSelectNewCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
    this.onSelectTemplate = this.onSelectTemplate.bind(this)
    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.getRecord = this.getRecord.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.setStateDate = this.setStateDate.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
    this.onClickChangeDateButton = this.onClickChangeDateButton.bind(this)
    this.handleUpdateTags = this.handleUpdateTags.bind(this)
    this.onCancelEditing = this.onCancelEditing.bind(this)
    this.onChangeCharge = this.onChangeCharge.bind(this)
    this.onChangePoint = this.onChangePoint.bind(this)
    this.onChangeMemo = this.onChangeMemo.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setTemplate = this.setTemplate.bind(this)
    this.setTag = this.setTag.bind(this)
  }

  componentWillMount() {
    this.getBaseSetting()
  }

  onChangeCharge(charge) {
    this.setState({
      checkedPointDisabled: charge > 0 ? false : true,
      inputCharge: charge
    })
  }

  onCancelEditing() {
    this.setState({
      editingRecordId: undefined,
    })
  }

  onChangePoint(point, checked) {
    this.setState({
      checkedPoint: checked,
      inputPoint: checked ? point : '0'
    })
  }

  onChangeMemo(memo) {
    this.setState({
      inputMemo: memo
    })
  }

  onSelectCategory(category) {
    this.setState({
      selectedBalanceOfPayments: (category || {}).balance_of_payments,
      selectedCategoryId: (category || {}).id,
      selectedBreakdownId: undefined,
      selectedPlaceId: undefined,
      selectedTemplateId: undefined,
      breakdowns: (category || {}).breakdowns || [],
      templates: (category || {}).templates || [],
      places: (category || {}).places || []
    })
  }

  onSelectNewCategory(category) {
    this.getCategories()
    this.setState({
      selectedBalanceOfPayments: (category || {}).balance_of_payments,
      selectedCategoryId: (category || {}).id,
      selectedBreakdownId: undefined,
      selectedPlaceId: undefined,
      selectedTemplateId: undefined,
      breakdowns: (category || {}).breakdowns || [],
      templates: (category || {}).templates || [],
      places: (category || {}).places || []
    })
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      selectedBreakdownId: (breakdown || {}).id
    })
  }

  onSelectTemplate(template) {
    let tags = (template || {}).tag ? ([
      { id: template.tag.id, name: template.tag.name, color_code: template.tag.color_code }
    ]
    ) : (
      []
    )
    let generateTags = tags.reduce(
      (map, tag, index) => Object.assign(map, { [index]: tag }),
      {}
    )
    this.setState({
      selectedTemplateId: (template || {}).id,
      selectedBreakdownId: (template || {}).breakdown_id,
      inputCharge: String((template || {}).charge),
      inputMemo: (template || {}).memo,
      selectedTags: tags.map(tag =>
        <Tag key={tag.id} tag={tag} />
      ),
      selectedGenerateTags: generateTags
    })
  }

  onSelectPlace(place) {
    this.setState({
      selectedPlaceId: (place || {}).id
    })
  }

  setStateDate(date) {
    this.setState({
      selectedY: date.year(),
      selectedM: date.month() + 1,
      selectedD: date.date(),
      selectedPublishedAt: date
    })
    this.getRecords(date)
  }

  getRecordsCallback(res, params) {
    this.getTags()
    this.setState({
      records: res.data,
      targetDate: moment(params.date)
    })
  }

  getRecords(date) {
    let targetDate = date ? date : moment()
    let params = {
      date: String(targetDate)
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessage)
  }

  postRecordCallback(params) {
    this.getRecentlyUsed()
    this.getRecords(params.published_at)
    this.noticeAddMessage()
    this.setState({
      inputMemo: '',
      inputCharge: '',
      inputPoint: '0',
      checkedPoint: false,
      selectedTags: [],
      selectedGenerateTags: {}
    })
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  postRecord(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    recordAxios.post(params, this.postRecordCallback, this.noticeErrorMessage)
  }

  patchRecordCallback(params) {
    this.getRecords(params.published_at)
    this.noticeUpdatedMessage()
    this.setState({
      inputMemo: '',
      inputCharge: '',
      inputPoint: '0',
      checkedPoint: false,
      selectedTags: [],
      selectedGenerateTags: {},
      editingRecordId: undefined
    })
  }

  patchRecord(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    recordAxios.patch(params.id, params, this.postRecordCallback, this.noticeErrorMessage)
  }

  getBaseSettingCallback(res) {
    this.getCategories()
    this.getRecords()
    this.setState({
      baseSetting: res.data
    })
  }

  getBaseSetting() {
    profileAxios.get(this.getBaseSettingCallback, this.noticeErrorMessage)
  }

  getCategoriesCallback(res) {
    this.getRecentlyUsed()
    this.setState({
      categories: res.data
    })
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessage)
  }

  getRecentlyUsed() {
    let options = {
      method: 'GET',
      url: origin + '/api/recently_used',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          recentlyUsed: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  getTags() {
    this.setState({
      message: ''
    })
    let options = {
      method: 'GET',
      url: origin + '/api/tags',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          tags: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyRecordCallback() {
    this.getRecords(this.state.targetDate)
    this.noticeDestroyedMessage()
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    recordAxios.delete(recordId, this.destroyRecordCallback, this.noticeErrorMessage)
  }

  onClickChangeDateButton(days) {
    const changeDate = this.state.targetDate.add('days', days)
    this.setState({
      targetDate: changeDate
    })
    this.getRecords(changeDate)
  }

  getRecord(recordId) {
    let options = {
      method: 'GET',
      url: origin + '/api/records/' + recordId,
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        let record = res.data
        let category = this.state.categories.find( category => category.id == record.category_id )
        let tags = record.tagged_records.map(tagged => (
          { id: tagged.tag_id, name: tagged.tag_name, color_code: tagged.tag_color_code }
        ))
        let generateTags = tags.reduce(
          (map, tag, index) => Object.assign(map, { [index]: tag }),
          {}
        )
        this.setState({
          selectedBalanceOfPayments: record.balance_of_payments,
          selectedPublishedAt: moment(record.published_at),
          selectedCategoryId: record.category_id,
          selectedBreakdownId: record.breakdown_id || undefined,
          selectedTemplateId: record.template_id || undefined,
          selectedPlaceId: record.place_id || undefined,
          selectedTags: tags.map(tag =>
            <Tag key={tag.id} tag={tag} />
          ),
          selectedGenerateTags: generateTags,
          inputCharge: String(record.charge),
          inputPoint: String(record.point),
          checkedPoint: record.point == 0 ? false : true,
          inputMemo: record.memo,
          breakdowns: (category || {}).breakdowns || [],
          places: (category || {}).places || [],
          editingRecordId: record.id
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  handleUpdateTags(tags) {
    this.setState({
      selectedTags: tags,
      selectedGenerateTags: this.generateTags(tags)
    })
  }

  generateTags(tags) {
    const hash = {}
    for (let key in tags) {
      if (tags[key].props != undefined) {
        let color_code = tags[key].props.tag.color_code
        let name = tags[key].props.tag.name
        hash[key] = {color_code: color_code, name: name}
      } else {
        hash[key] = {color_code: '', name: tags[key]}
      }
    }
    return hash
  }

  setCategory(category) {
    this.setState({
      selectedBalanceOfPayments: (category || {}).balance_of_payments,
      selectedCategoryId: (category || {}).id,
      selectedBreakdownId: undefined,
      selectedPlaceId: undefined,
      selectedTemplateId: undefined,
      breakdowns: (category || {}).breakdowns || [],
      templates: (category || {}).templates || [],
      places: (category || {}).places || []
    })
  }

  setTemplate(template) {
    let category = this.state.categories.find( category => category.id == template.category_id )
    let tags = template.tag ? ([
      { id: template.tag.id, name: template.tag.name, color_code: template.tag.color_code }
    ]) : (
      []
    )
    let generateTags = tags.reduce(
      (map, tag, index) => Object.assign(map, { [index]: tag }),
      {}
    )
    this.setState({
      selectedBalanceOfPayments: category.balance_of_payments,
      selectedCategoryId: template.category_id,
      selectedBreakdownId: template.breakdown_id,
      selectedTemplateId: template.id,
      breakdowns: category.breakdowns || [],
      templates: category.templates || [],
      places: category.places || [],
      inputCharge: String(template.charge),
      inputMemo: template.memo,
      selectedTags: tags.map(tag =>
        <Tag key={tag.id} tag={tag} />
      ),
      selectedGenerateTags: generateTags
    })
  }

  setTag(tag) {
    let tags = tag ? ([
      { id: tag.id, name: tag.name, color_code: tag.color_code }
    ]) : (
      []
    )
    let generateTags = tags.reduce(
      (map, tag, index) => Object.assign(map, { [index]: tag }),
      {}
    )
    this.setState({
      selectedTags: tags.map(tag =>
        <Tag key={tag.id} tag={tag} />
      ),
      selectedGenerateTags: generateTags
    })
  }

  render() {
    return (
      <div className='new-record-card-body-component row'>
        {this.renderAlertMessage()}
        <PickerField
          handleClickCategoryPickerButton={this.setCategory}
          handleClickTagPickerButton={this.setTag}
          handleClickTemplatePickerButton={this.setTemplate}
          recentlyUsed={this.state.recentlyUsed}
        />
        <NewRecordForm
          baseSetting={this.state.baseSetting}
          breakdowns={this.state.breakdowns}
          categories={this.state.categories}
          checkedPoint={this.state.checkedPoint}
          checkedPointDisabled={this.state.checkedPointDisabled}
          editingRecordId={this.state.editingRecordId}
          errorMessages={this.state.errorMessages}
          handleCancelEditing={this.onCancelEditing}
          handleChangeCharge={this.onChangeCharge}
          handleChangeMemo={this.onChangeMemo}
          handleChangePoint={this.onChangePoint}
          handleChangePublishedOn={this.setStateDate}
          handleSelectBreakdown={this.onSelectBreakdown}
          handleSelectCategory={this.onSelectCategory}
          handleSelectNewCategory={this.onSelectNewCategory}
          handleSelectPlace={this.onSelectPlace}
          handleSelectTemplate={this.onSelectTemplate}
          handleSendForm={this.postRecord}
          handleUpdateForm={this.patchRecord}
          inputCharge={this.state.inputCharge}
          inputMemo={this.state.inputMemo}
          inputPoint={this.state.inputPoint}
          onUpdateTags={this.handleUpdateTags}
          places={this.state.places}
          ref='form'
          selectedBalanceOfPayments={this.state.selectedBalanceOfPayments}
          selectedBreakdownId={this.state.selectedBreakdownId}
          selectedCategoryId={this.state.selectedCategoryId}
          selectedGenerateTags={this.state.selectedGenerateTags}
          selectedPlaceId={this.state.selectedPlaceId}
          selectedPublishedAt={this.state.selectedPublishedAt}
          selectedTags={this.state.selectedTags}
          selectedTemplateId={this.state.selectedTemplateId}
          tags={this.state.tags}
          templates={this.state.templates}
        />
        <OneDayRecords
          editingRecordId={this.state.editingRecordId}
          handleClickChangeDateButton={this.onClickChangeDateButton}
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.getRecord}
          records={this.state.records}
          targetDate={this.state.targetDate}
        />
      </div>
    )
  }
}

NewRecordCardBody.propTypes = {
  records: PropTypes.array.isRequired,
  recentlyUsed: PropTypes.object.isRequired
}

reactMixin.onClass(NewRecordCardBody, MessageNotifierMixin)
reactMixin.onClass(NewRecordCardBody, LocalStorageMixin)

export default NewRecordCardBody
