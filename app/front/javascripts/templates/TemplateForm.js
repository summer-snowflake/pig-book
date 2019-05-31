import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './../common/BreakdownsSelectBox'
import TagsSelectBox from './../common/TagsSelectBox'
import AddButton from './../common/AddButton'
import FormMixin from './../mixins/FormMixin'

class TemplateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: '',
      selectedBalanceOfPayments: undefined,
      selectedBreakdownId: '',
      selectedTagId: null,
      breakdowns: []
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
    this.onSelectTag = this.onSelectTag.bind(this)
    this.templateName = React.createRef()
    this.templateCharge = React.createRef()
    this.templateMemo = React.createRef()
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({
      name: this.templateName.current.value,
      category_id: this.state.selectedCategoryId,
      breakdown_id: this.state.selectedBreakdownId,
      tag_id: this.state.selectedTagId,
      charge: this.templateCharge.current.value,
      memo: this.templateMemo.current.value
    })
    this.templateName.current.value = ''
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: category ? category.id : '',
      selectedBalanceOfPayments: (category || {}).balance_of_payments,
      breakdowns: (category || {}).breakdowns || []
    })
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      selectedBreakdownId: breakdown ? String(breakdown.id) : ''
    })
  }

  onSelectTag(tag) {
    this.setState({
      selectedTagId: (tag || {}).id
    })
  }

  render() {
    return (
      <div className='template-form-component'>
        <div className='form-row'>
          <div className='form-group col-auto mb-3'>
            <CategoriesSelectBox
              handleSelectCategory={this.onSelectCategory}
              plusButton={false}
            />
            <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
          </div>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
            <input className='form-control' name='template_name' ref={this.templateName} type='text' />
            <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
          </div>
        </div>
        <div className='form-row without-error'>
          <div className='form-group col-auto mb-3'>
            <BreakdownsSelectBox breakdowns={this.state.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={!this.state.selectedCategoryId} selectedBreakdownId={this.state.selectedBreakdownId} />
          </div>
          <div className='form-group col-auto mb-3'>
            <TagsSelectBox handleSelectTag={this.onSelectTag} selectedTagId={this.state.selectedTagId} tags={this.props.tags} />
          </div>
        </div>
        <div className='form-row'>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('charge')}>
            <input className='form-control' name='template_name' ref={this.templateCharge} type='number' />
            <FormErrorMessages column='charge' errorMessages={this.props.errorMessages} />
          </div>
          <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('memo')}>
            <input className='form-control' name='template_name' ref={this.templateMemo} type='text' />
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
  tags: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(TemplateForm, FormMixin)

export default TemplateForm
