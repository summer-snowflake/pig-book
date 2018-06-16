import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormMixin from './../mixins/FormMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './BreakdownsSelectBox'
import PlacesSelectBox from './PlacesSelectBox'
import CreateButton from './../common/CreateButton'

class NewRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: undefined
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
  }

  componentWillMount() {
    this.props.getCategories()
  }

  handleClickSubmitButton() {
    this.props.handleSendForm()
    this.refs.charge.value = ''
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: (category || {}).id
    })
    this.props.handleSelectCategory(category)
  }

  onSelectBreakdown(breakdown) {
    console.log(breakdown)
  }

  onSelectPlace(place) {
    console.log(place)
  }

  render() {
    return (
      <div className='new-record-form-component col'>
        <div className='form-group'>
          <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} />
        </div>
        <div className='form-group'>
          <BreakdownsSelectBox breakdowns={this.props.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={!this.state.selectedCategoryId} />
        </div>
        <div className='form-group'>
          <PlacesSelectBox handleSelectPlace={this.onSelectPlace} isDisabled={!this.state.selectedCategoryId} places={this.props.places} />
        </div>
        <div className={'form-group ' + this.fieldWithErrors('charge')}>
          <input className='form-control' name='record_charge' ref='charge' type='number' />
          <FormErrorMessages column='charge' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group'>
          <textarea className='form-control' rows='3' />
        </div>
        <div className='form-group'>
          <CreateButton onClickButton={this.handleClickSubmitButton} />
        </div>
      </div>
    )
  }
}

NewRecordForm.propTypes = {
  categories: PropTypes.array.isRequired,
  breakdowns: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired
}

reactMixin.onClass(NewRecordForm, FormMixin)

export default NewRecordForm
