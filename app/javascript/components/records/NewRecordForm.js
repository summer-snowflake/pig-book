import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import FormMixin from './../mixins/FormMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './BreakdownsSelectBox'
import PlacesSelectBox from './PlacesSelectBox'
import CreateButton from './../common/CreateButton'
import TodayButton from './TodayButton'
import TagsInputField from './TagsInputField'

class NewRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleClickTodayButton = this.handleClickTodayButton.bind(this)
    this.handleUpdateTags = this.handleUpdateTags.bind(this)
    this.handleClickPointCheckBox = this.handleClickPointCheckBox.bind(this)
    this.handleChangeCharge = this.handleChangeCharge.bind(this)
    this.handleChangePoint = this.handleChangePoint.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({
      published_at: this.props.selectedPublishedAt,
      category_id: this.props.selectedCategoryId,
      breakdown_id: this.props.selectedBreakdownId,
      place_id: this.props.selectedPlaceId,
      tags: this.props.selectedGenerateTags,
      currency: this.props.baseSetting.currency,
      charge: this.refs.charge.value,
      point: this.props.inputPoint,
      memo: this.refs.memo.value
    })
  }

  handleClickTodayButton() {
    let today = moment()
    this.props.handleChangePublishedOn(today)
  }

  onSelectCategory(category) {
    this.props.handleSelectCategory(category)
  }

  onSelectBreakdown(breakdown) {
    this.props.handleSelectBreakdown(breakdown)
  }

  onSelectPlace(place) {
    this.props.handleSelectPlace(place)
  }

  handleChangePublishedOn(date) {
    this.props.handleChangePublishedOn(date)
  }

  handleUpdateTags(tags) {
    this.props.onUpdateTags(tags)
  }

  handleClickPointCheckBox(e) {
    this.props.handleChangePoint(this.refs.charge.value, e.target.checked)
  }

  handleChangeCharge(e) {
    this.props.handleChangeCharge(e.target.value)
  }

  handleChangePoint(e) {
    this.props.handleChangePoint(e.target.value)
  }

  render() {
    return (
      <div className='new-record-form-component col'>
        <div className='form-group date-picker'>
          <DatePicker className='form-control' dateFormat='YYYY/MM/DD' onChange={this.handleChangePublishedOn} selected={this.props.selectedPublishedAt} />
          <TodayButton onClickButton={this.handleClickTodayButton} />
        </div>
        <div className={'form-group ' + this.fieldWithErrors('category')}>
          <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} selectedCategoryId={this.props.selectedCategoryId} />
          <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group'>
          <BreakdownsSelectBox breakdowns={this.props.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={!this.props.selectedCategoryId} selectedBreakdownId={this.props.selectedBreakdownId} />
        </div>
        <div className='form-group'>
          <PlacesSelectBox handleSelectPlace={this.onSelectPlace} isDisabled={!this.props.selectedCategoryId} places={this.props.places} selectedPlaceId={this.props.selectedPlaceId} />
        </div>
        <div className='form-group'>
          <TagsInputField last_request_at={this.props.last_request_at} onUpdateTags={this.handleUpdateTags} selectedTags={this.props.selectedTags} tags={this.props.tags} user_token={this.props.user_token} />
        </div>
        <div className='form-group'>
          <div className='row'>
            <div className={'col-sm-8 input-group ' + this.fieldWithErrors('charge')}>
              <div className='input-group-prepend'>
                <div className="input-group-text" htmlFor='record_charge'>
                  {this.props.baseSetting.human_currency}
                  {this.props.baseSetting.length > 0 && (
                    <input name={this.props.baseSetting.currency} type='hidden' value={this.props.baseSetting.currency} />
                  )}
                </div>
              </div>
              <input className='form-control' name='record_charge' onChange={this.handleChangeCharge} ref='charge' type='number' value={this.props.inputCharge} />
            </div>
            <div className='col-sm-4 input-group'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>
                  <input onClick={this.handleClickPointCheckBox} type='checkbox' value={this.props.checkedPoint} checked={this.props.checkedPoint} />
                </div>
              </div>
              <input className='form-control' disabled={!this.props.checkedPoint} name='record_point' onChange={this.handleChangePoint} ref='point' type='number' value={this.props.inputPoint} />
            </div>
          </div>
          <FormErrorMessages column='charge' errorMessages={this.props.errorMessages} />
          <FormErrorMessages column='point' errorMessages={this.props.errorMessages} />
        </div>
        <div className={'form-group ' + this.fieldWithErrors('memo')}>
          <textarea className='form-control' name='record_memo' ref='memo' rows='3' value={this.props.inputMemo} />
          <FormErrorMessages column='memo' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group'>
          <CreateButton onClickButton={this.handleClickSubmitButton} />
        </div>
      </div>
    )
  }
}

NewRecordForm.propTypes = {
  baseSetting: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  breakdowns: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  checkedPoint: PropTypes.bool.isRequired,
  selectedPublishedAt: PropTypes.object.isRequired,
  selectedCategoryId: PropTypes.number,
  selectedBreakdownId: PropTypes.number,
  selectedPlaceId: PropTypes.number,
  selectedTags: PropTypes.array.isRequired,
  selectedGenerateTags: PropTypes.object.isRequired,
  inputCharge: PropTypes.string,
  inputPoint: PropTypes.string,
  inputMemo: PropTypes.string,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  errorMessages: PropTypes.object.isRequired,
  onUpdateTags: PropTypes.func.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  handleSelectBreakdown: PropTypes.func.isRequired,
  handleSelectPlace: PropTypes.func.isRequired,
  handleChangePublishedOn: PropTypes.func.isRequired,
  handleChangeCharge: PropTypes.func.isRequired,
  handleChangePoint: PropTypes.func.isRequired
}

reactMixin.onClass(NewRecordForm, FormMixin)

export default NewRecordForm
