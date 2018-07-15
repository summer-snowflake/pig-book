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
    this.state = {
      selectedPublishedAt: moment(),
      selectedCategoryId: undefined,
      selectedBreakdownId: undefined,
      selectedPlaceId: undefined,
      pointCheck: false,
      point: 0
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleClickTodayButton = this.handleClickTodayButton.bind(this)
    this.handleUpdateTags = this.handleUpdateTags.bind(this)
    this.handleClickPointCheckBox = this.handleClickPointCheckBox.bind(this)
    this.handleChangePoint = this.handleChangePoint.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({
      published_at: this.state.selectedPublishedAt,
      category_id: this.state.selectedCategoryId,
      breakdown_id: this.state.selectedBreakdownId,
      place_id: this.state.selectedPlaceId,
      tags: this.props.selectedTags,
      currency: this.props.baseSetting.currency,
      charge: this.refs.charge.value,
      memo: this.refs.memo.value
    })
  }

  handleClickTodayButton() {
    let today = moment()
    this.setState({
      selectedPublishedAt: today
    })
    this.props.handleChangePublishedOn(today)
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: (category || {}).id,
      selectedBreakdownId: undefined,
      selectedPlaceId: undefined
    })
    this.props.handleSelectCategory(category)
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      selectedBreakdownId: (breakdown || {}).id
    })
  }

  onSelectPlace(place) {
    this.setState({
      selectedPlaceId: (place || {}).id
    })
  }

  handleChangePublishedOn(date) {
    this.setState({
      selectedPublishedAt: date
    })
    this.props.handleChangePublishedOn(date)
  }

  handleUpdateTags(tags) {
    this.props.onUpdateTags(tags)
  }

  handleClickPointCheckBox(e) {
    this.setState({
      pointCheck: e.target.checked,
      point: e.target.checked ? this.refs.charge.value : 0
    })
  }

  handleChangePoint(e) {
    this.setState({
      point: e.target.value
    })
  }

  render() {
    return (
      <div className='new-record-form-component col'>
        <div className='form-group date-picker'>
          <DatePicker className='form-control' dateFormat='YYYY/MM/DD' onChange={this.handleChangePublishedOn} selected={this.state.selectedPublishedAt} />
          <TodayButton onClickButton={this.handleClickTodayButton} />
        </div>
        <div className={'form-group ' + this.fieldWithErrors('category')}>
          <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} />
          <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group'>
          <BreakdownsSelectBox breakdowns={this.props.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={!this.state.selectedCategoryId} />
        </div>
        <div className='form-group'>
          <PlacesSelectBox handleSelectPlace={this.onSelectPlace} isDisabled={!this.state.selectedCategoryId} places={this.props.places} />
        </div>
        <div className='form-group'>
          <TagsInputField last_request_at={this.props.last_request_at} onUpdateTags={this.handleUpdateTags} selectTags={this.props.selectTags} tags={this.props.tags} user_token={this.props.user_token} />
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
              <input className='form-control' name='record_charge' ref='charge' type='number' />
            </div>
            <div className='col-sm-4 input-group'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>
                  <input onClick={this.handleClickPointCheckBox} type='checkbox' value={this.state.pointCheck} />
                </div>
              </div>
              <input className='form-control' disabled={!this.state.pointCheck} name='record_point' onChange={this.handleChangePoint} ref='point' type='number' value={this.state.point} />
            </div>
          </div>
          <FormErrorMessages column='charge' errorMessages={this.props.errorMessages} />
        </div>
        <div className={'form-group ' + this.fieldWithErrors('memo')}>
          <textarea className='form-control' name='record_memo' ref='memo' rows='3' />
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
  selectTags: PropTypes.array.isRequired,
  selectedTags: PropTypes.array.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  errorMessages: PropTypes.object.isRequired,
  onUpdateTags: PropTypes.func.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  handleChangePublishedOn: PropTypes.func.isRequired
}

reactMixin.onClass(NewRecordForm, FormMixin)

export default NewRecordForm
