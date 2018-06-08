import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import FormErrorMessages from './../common/FormErrorMessages'
import FormMixin from './../mixins/FormMixin'

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balanceOfPaymentsValue: false
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.refs.name.value, balance_of_payments: this.state.balanceOfPaymentsValue})
    this.refs.name.value = ''
  }

  handleChangeBalanceOfPayments(e) {
    this.setState({
      balanceOfPaymentsValue: e.target.value
    })
  }

  render() {
    return (
      <div className='category-form-component form-row'>
        <div className='form-check'>
          <div className='form-group col-auto mb-1'>
            <input className='form-check-input' id='income' name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='true' />
            <label className='form-check-label' htmlFor='income'>
              {'収入'}
            </label>
          </div>
        </div>
        <div className='form-check'>
          <div className='form-group col-auto mb-1'>
            <input className='form-check-input' id='expenditure' name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='false' />
            <label className='form-check-label' htmlFor='expenditure'>
              {'支出'}
            </label>
          </div>
        </div>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' ref='name' type='text' name='category_name' />
          <FormErrorMessages errorMessages={this.props.errorMessages} column='name' />
        </div>
        <div className='form-group col-auto mb-3'>
          <input className='btn btn-secondary' onClick={this.handleClickSubmitButton} type='submit' value={'追加する'} />
        </div>
      </div>
    )
  }
}

CategoryForm.propTypes = {
  errorMessages: PropTypes.object.isRequired,
  handleSendForm: PropTypes.func.isRequired
}

reactMixin.onClass(CategoryForm, FormMixin)

export default CategoryForm
