import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormMixin from './../mixins/FormMixin'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './BreakdownsSelectBox'
import PlacesSelectBox from './PlacesSelectBox'

class NewRecordForm extends React.Component {
  constructor(props) {
    super(props)
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
          <BreakdownsSelectBox breakdowns={this.props.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} />
        </div>
        <div className='form-group'>
          <PlacesSelectBox handleSelectPlace={this.onSelectPlace} places={this.props.places} />
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
