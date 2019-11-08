import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import FormErrorMessages from './../common/FormErrorMessages'
import Button from './../common/Button'
import FormMixin from './../mixins/FormMixin'
import BalanceOfPaymentsRadioButtons from './../common/BalanceOfPaymentsRadioButtons'

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balanceOfPaymentsValue: false
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.categoryName = React.createRef()
  }

  handleClickSubmitButton() {
    this.props.handleSendForm({name: this.categoryName.current.value, balance_of_payments: this.state.balanceOfPaymentsValue})
    this.categoryName.current.value = ''
  }

  handleChangeBalanceOfPayments(e) {
    this.setState({
      balanceOfPaymentsValue: e.target.value === 'true'
    })
  }

  render() {
    return (
      <div className='category-form-component form-row'>
        <BalanceOfPaymentsRadioButtons id={0} onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments} value={this.state.balanceOfPaymentsValue} />
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('name')}>
          <input className='form-control' name='category_name' ref={this.categoryName} type='text' />
          <FormErrorMessages column='name' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          { /* NOTE: AddButton componentを利用するとcapybaraでjsのエラーが発生してしまうため、Buttonを直接利用する */ }
          <Button humanValueName='追加する' onClickButton={this.handleClickSubmitButton} valueName='add' />
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
