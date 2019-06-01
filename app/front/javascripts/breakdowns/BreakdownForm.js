import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import AddButton from './../common/AddButton'
import FormMixin from './../mixins/FormMixin'

class BreakdownForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: ''
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.breakdownName = React.createRef()
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.breakdownName.current.value, category_id: this.state.selectedCategoryId})
    this.breakdownName.current.value = ''
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: category ? String(category.id) : ''
    })
  }

  render() {
    return (
      <div className='breakdown-form-component form-row'>
        <div className='form-group col-auto mb-3'>
          <CategoriesSelectBox
            handleSelectCategory={this.onSelectCategory}
            plusButton={false}
          />
          <FormErrorMessages column='category' errorMessages={this.props.errorMessages} />
        </div>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' name='breakdown_name' ref={this.breakdownName} type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          <AddButton onClickButton={this.handleClickSubmitButton} />
        </div>
      </div>
    )
  }
}

BreakdownForm.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(BreakdownForm, FormMixin)

export default BreakdownForm
