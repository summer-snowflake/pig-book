import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormMixin from './../mixins/FormMixin'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './BreakdownsSelectBox'

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

  onSelectCategory(categoryId) {
    this.props.handleSelectCategory(categoryId)
  }

  onSelectBreakdown(breakdownId) {
    console.log(breakdownId)
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
      </div>
    )
  }
}

NewRecordForm.propTypes = {
  categories: PropTypes.array.isRequired,
  breakdowns: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired
}

reactMixin.onClass(NewRecordForm, FormMixin)

export default NewRecordForm
