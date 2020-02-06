import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import moment from 'moment'

import NewRecordForm from './NewRecordForm'
import PickerField from './pickers/PickerField'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import RelatedRecords from './related_records/RelatedRecords'
import Tag from './Tag'
import { recordsAxios, recordAxios } from './../mixins/requests/RecordsMixin'
import { categoriesAxios } from './../mixins/requests/CategoriesMixin'
import { tagsAxios } from './../mixins/requests/TagsMixin'
import { profileAxios } from './../mixins/requests/BaseSettingMixin'

class NewRecordCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessages: {},
      editingRecordId: '',
      baseSetting: {},
      categories: [],
      breakdowns: [],
      places: [],
      tags: [],
      templates: [],
      checkedPoint: false,
      checkedPointDisabled: true,
      selectedPublishedAt: moment(),
      selectedCategoryId: '',
      selectedBreakdownId: '',
      selectedBalanceOfPayments: false,
      selectedPlaceId: '',
      selectedTemplateId: '',
      selectedTags: [],
      selectedGenerateTags: {},
      inputCharge: '',
      inputCashlessCharge: '',
      inputPoint: '0',
      inputMemo: '',
      records: this.props.records,
      recordsByCategory: [],
      targetDate: moment()
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.getRecordsByCategory = this.getRecordsByCategory.bind(this)
    this.getRecordsByCategoryCallback = this.getRecordsByCategoryCallback.bind(this)
    this.postRecord = this.postRecord.bind(this)
    this.postRecordCallback = this.postRecordCallback.bind(this)
    this.patchRecord = this.patchRecord.bind(this)
    this.patchRecordCallback = this.patchRecordCallback.bind(this)
    this.getBaseSetting = this.getBaseSetting.bind(this)
    this.getBaseSettingCallback = this.getBaseSettingCallback.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getCategoriesCallback = this.getCategoriesCallback.bind(this)
    this.getTags = this.getTags.bind(this)
    this.getTagsCallback = this.getTagsCallback.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectNewCategory = this.onSelectNewCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
    this.onSelectTemplate = this.onSelectTemplate.bind(this)
    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.getRecord = this.getRecord.bind(this)
    this.getRecordCopy = this.getRecordCopy.bind(this)
    this.getRecordCallback = this.getRecordCallback.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.setStateDate = this.setStateDate.bind(this)
    this.onClickChangeDateButton = this.onClickChangeDateButton.bind(this)
    this.handleUpdateTags = this.handleUpdateTags.bind(this)
    this.onCancelEditing = this.onCancelEditing.bind(this)
    this.onChangeCharge = this.onChangeCharge.bind(this)
    this.onChangeCashlessCharge = this.onChangeCashlessCharge.bind(this)
    this.onChangePoint = this.onChangePoint.bind(this)
    this.onChangeMemo = this.onChangeMemo.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setTemplate = this.setTemplate.bind(this)
    this.setTag = this.setTag.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
    this.getBaseSetting()
  }

  onChangeCharge(charge) {
    this.setState({
      checkedPointDisabled: charge > 0 ? false : true,
      inputCharge: charge
    })
  }

  onChangeCashlessCharge(charge) {
    this.setState({
      inputCashlessCharge: charge
    })
  }

  onCancelEditing() {
    this.setState({
      editingRecordId: '',
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
      selectedCategoryId: category ? String(category.id) : '',
      selectedBreakdownId: '',
      selectedPlaceId: '',
      selectedTemplateId: '',
      breakdowns: (category || {}).breakdowns || [],
      templates: (category || {}).templates || [],
      places: (category || {}).places || []
    })
    this.getRecordsByCategory(category)
  }

  onSelectNewCategory(category) {
    this.getCategories()
    this.setState({
      selectedBalanceOfPayments: (category || {}).balance_of_payments,
      selectedCategoryId: category ? String(category.id) : '',
      selectedBreakdownId: '',
      selectedPlaceId: '',
      selectedTemplateId: '',
      breakdowns: (category || {}).breakdowns || [],
      templates: (category || {}).templates || [],
      places: (category || {}).places || []
    })
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      selectedBreakdownId: breakdown ? String(breakdown.id) : ''
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
      selectedTemplateId: template ? String(template.id) : '',
      selectedBreakdownId: template ? String(template.breakdown_id) : '',
      inputCharge: template ? String(template.charge) : '',
      inputCashlessCharge: template ? String(template.cashless_charge) : '',
      inputMemo: template ? String(template.memo) : '',
      selectedTags: tags.map(tag =>
        <Tag key={tag.id} tag={tag} />
      ),
      selectedGenerateTags: generateTags
    })
  }

  onSelectPlace(place) {
    this.setState({
      selectedPlaceId: place ? String(place.id) : ''
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

  getRecordsCallback(res) {
    this.getTags()
    this.setState({
      records: res.data.records,
      targetDate: this.state.targetDate
    })
  }

  getRecords(date) {
    let targetDate = date ? date : moment()
    this.setState({
      targetDate: targetDate
    })
    let params = {
      date: String(targetDate)
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessages)
  }

  getRecordsByCategory(category) {
    let params = { limit: 10, category_id: category.id }
    recordsAxios.get(params, this.getRecordsByCategoryCallback, this.noticeErrorMessages)
  }

  getRecordsByCategoryCallback(res) {
    this.setState({
      recordsByCategory: res.data.records
    })
  }

  postRecordCallback(res) {
    this.getRecords(moment(res.data.published_at))
    this.noticeAddMessage()
    this.setState({
      inputMemo: '',
      inputCharge: '',
      inputCashlessCharge: '',
      inputPoint: '0',
      checkedPoint: false,
      selectedTags: [],
      selectedGenerateTags: {}
    })
  }

  postRecord(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    recordAxios.post(params, this.postRecordCallback, this.noticeErrorMessages)
  }

  patchRecordCallback(res) {
    this.getRecords(moment(res.data.published_at))
    this.noticeUpdatedMessage()
    this.setState({
      inputMemo: '',
      inputCharge: '',
      inputCashlessCharge: '',
      inputPoint: '0',
      checkedPoint: false,
      selectedTags: [],
      selectedGenerateTags: {},
      editingRecordId: ''
    })
  }

  patchRecord(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    recordAxios.patch(params.id, params, this.patchRecordCallback, this.noticeErrorMessages)
  }

  getBaseSettingCallback(res) {
    this.getCategories()
    this.getRecords()
    this.setState({
      baseSetting: res.data
    })
  }

  getBaseSetting() {
    profileAxios.get(this.getBaseSettingCallback, this.noticeErrorMessages)
  }

  getCategoriesCallback(res) {
    this.setState({
      categories: res.data
    })
  }

  getCategories() {
    categoriesAxios.get(this.getCategoriesCallback, this.noticeErrorMessages)
  }

  getTagsCallback(res) {
    this.setState({
      tags: res.data
    })
  }

  getTags() {
    this.setState({
      message: ''
    })
    tagsAxios.get(this.getTagsCallback, this.noticeErrorMessages)
  }

  destroyRecordCallback() {
    this.getRecords(this.state.targetDate)
    this.noticeDestroyedMessage()
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    recordAxios.delete(recordId, this.destroyRecordCallback, this.noticeErrorMessages)
  }

  onClickChangeDateButton(days) {
    const changeDate = this.state.targetDate.add(days, 'days')
    this.setState({
      targetDate: changeDate
    })
    this.getRecords(changeDate)
  }

  getRecordCallback(res) {
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
      selectedCategoryId: record.category_id ? String(record.category_id) : '',
      selectedBreakdownId: record.breakdown_id ? String(record.breakdown_id) : '',
      selectedTemplateId: record.template_id ? String(record.template_id) : '',
      selectedPlaceId: record.place_id ? String(record.place_id) : '',
      selectedTags: tags.map(tag =>
        <Tag key={tag.id} tag={tag} />
      ),
      selectedGenerateTags: generateTags,
      inputCharge: String(record.charge),
      inputCashlessCharge: String(record.cashless_charge),
      inputPoint: String(record.point),
      checkedPoint: record.point == 0 ? false : true,
      inputMemo: record.memo || '',
      breakdowns: (category || {}).breakdowns || [],
      places: (category || {}).places || []
    })
    // NOTE: コピーの場合は日付をコピーしない
    if(this.state.editingRecordId != '') {
      this.setState({
        selectedPublishedAt: moment(record.published_at)
      })
    }
  }

  getRecord(recordId) {
    this.setState({
      editingRecordId: String(recordId),
      checkedPointDisabled: false
    })
    recordAxios.get(recordId, this.getRecordCallback, this.noticeErrorMessages)
  }

  getRecordCopy(recordId) {
    this.setState({
      editingRecordId: '',
      checkedPointDisabled: false
    })
    recordAxios.get(recordId, this.getRecordCallback, this.noticeErrorMessages)
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
      selectedCategoryId: category ? String(category.id) : '',
      selectedBreakdownId: '',
      selectedPlaceId: '',
      selectedTemplateId: '',
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
      selectedCategoryId: String(template.category_id),
      selectedBreakdownId: String(template.breakdown_id),
      selectedTemplateId: String(template.id),
      breakdowns: category.breakdowns || [],
      templates: category.templates || [],
      places: category.places || [],
      inputCharge: String(template.charge),
      inputCashlessCharge: String(template.cashless_charge),
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
          templates={this.state.templates}
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
          handleChangeCashlessCharge={this.onChangeCashlessCharge}
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
          inputCashlessCharge={this.state.inputCashlessCharge}
          inputCharge={this.state.inputCharge}
          inputMemo={this.state.inputMemo}
          inputPoint={this.state.inputPoint}
          onUpdateTags={this.handleUpdateTags}
          places={this.state.places}
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
        <RelatedRecords
          editingRecordId={this.state.editingRecordId}
          handleClickChangeDateButton={this.onClickChangeDateButton}
          handleClickCopyIcon={this.getRecordCopy}
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.getRecord}
          records={this.state.records}
          recordsByCategory={this.state.recordsByCategory}
          targetDate={this.state.targetDate}
        />
      </div>
    )
  }
}

NewRecordCardBody.propTypes = {
  records: PropTypes.array.isRequired
}

reactMixin.onClass(NewRecordCardBody, MessageNotifierMixin)

export default NewRecordCardBody
