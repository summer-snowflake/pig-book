import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import FormMixin from './../mixins/FormMixin'

class BreakdownForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: null
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.refs.name.value, category_id: this.state.selectedCategoryId})
    this.refs.name.value = ''
  }

  onSelectCategory(categoryId) {
    this.setState({
      selectedCategoryId: categoryId
    })
  }

  render() {
    return (
      <div className='breakdown-form-component form-row'>
        <div className='form-group col-auto mb-3'>
          <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} />
          <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
        </div>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' name='breakdown_name' ref='name' type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          <input className='btn btn-secondary' onClick={this.handleClickSubmitButton} type='submit' value={'追加する'} />
        </div>
      </div>
    )
  }
}

BreakdownForm.propTypes = {
  categories: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(BreakdownForm, FormMixin)

export default BreakdownForm
