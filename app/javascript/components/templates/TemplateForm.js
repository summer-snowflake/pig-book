import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './../common/BreakdownsSelectBox'
import AddButton from './../common/AddButton'
import FormMixin from './../mixins/FormMixin'

class TemplateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: null,
      selectedBreakdownId: null,
      breakdowns: []
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({
      name: this.refs.name.value,
      category_id: this.state.selectedCategoryId,
      breakdown_id: this.state.selectedBreakdownId,
      charge: this.refs.charge.value,
      memo: this.refs.memo.value
    })
    this.refs.name.value = ''
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: (category || {}).id,
      breakdowns: (category || {}).breakdowns || []
    })
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      selectedBreakdownId: breakdown.id
    })
  }

  render() {
    return (
      <div className='template-form-component'>
        <div className='form-row'>
          <div className='form-group col-auto mb-3'>
            <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} />
            <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
          </div>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
            <input className='form-control' name='template_name' ref='name' type='text' />
            <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
          </div>
        </div>
        <div className='form-row without-error'>
          <div className='form-group col-auto mb-3'>
            <BreakdownsSelectBox breakdowns={this.state.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={!this.state.selectedCategoryId} selectedBreakdownId={this.state.selectedBreakdownId} />
          </div>
        </div>
        <div className='form-row'>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('charge')}>
            <input className='form-control' name='template_name' ref='charge' type='number' />
            <FormErrorMessages column='charge' errorMessages={this.props.errorMessages} />
          </div>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('memo')}>
            <input className='form-control' name='template_name' ref='memo' type='text' />
            <FormErrorMessages column='memo' errorMessages={this.props.errorMessages} />
          </div>
          <div className='form-group col-auto mb-3'>
            <AddButton onClickButton={this.handleClickSubmitButton} />
          </div>
        </div>
      </div>
    )
  }
}

TemplateForm.propTypes = {
  categories: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(TemplateForm, FormMixin)

export default TemplateForm
