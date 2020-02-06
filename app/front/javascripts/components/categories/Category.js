import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import Trash from './../common/Trash'
import UpdateButton from './../common/UpdateButton'
import FormErrorMessages from './../common/FormErrorMessages'
import SquareIcon from './../common/SquareIcon'
import BalanceOfPaymentsRadioButtons from './../common/BalanceOfPaymentsRadioButtons'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { categoryAxios } from './../mixins/requests/CategoriesMixin'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      balance_of_payments: this.props.category.balance_of_payments,
      name: this.props.category.name,
      errorMessages: {}
    }
    this.patchCategory = this.patchCategory.bind(this)
    this.patchCategoryCallback = this.patchCategoryCallback.bind(this)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  onClickTrashIcon(category) {
    this.props.onClickTrashIcon(category)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickCancelIcon() {
    this.setState({
      isEditing: false
    })
  }

  handleChangeCategoryName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeBalanceOfPayments() {
    this.setState({
      balance_of_payments: !this.state.balance_of_payments
    })
  }

  handleClickUpdateButton() {
    this.patchCategory()
  }

  patchCategoryCallback() {
    this.noticeUpdatedMessage()
    this.props.getCategories()
    this.setState({
      isEditing: false
    })
  }

  patchCategory() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      balance_of_payments: this.state.balance_of_payments,
      name: this.state.name
    }
    categoryAxios.patch(this.props.category.id, params, this.patchCategoryCallback, this.noticeErrorMessages)
  }

  render() {
    return (
      <tr className='category-component' id={'category-' + this.props.category.id}>
        {this.state.isEditing ? (
          <td className='radio-td left-edit-target'>
            <BalanceOfPaymentsRadioButtons id={this.props.category.id} onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments} value={this.state.balance_of_payments} />
          </td>
        ) : (
          <td className='left-edit-target radio-td' />
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeCategoryName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            <SquareIcon balanceOfPayments={this.props.category.balance_of_payments} />
            {this.props.category.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target button-td'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='empty-td center-edit-target' />
        )}
        {this.state.isEditing ? (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        ) : (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td className='badge-td'>
          <span className={'badge badge-info'}>
            <span>
              <i className='fas fa-list left-icon' />
              {(this.props.category.breakdowns || {}).length}
            </span>
          </span>
        </td>
        <td className='badge-td'>
          <span className={'badge badge-info'}>
            <span>
              <i className='fas fa-map-marker-alt left-icon' />
              {(this.props.category.places || {}).length}
            </span>
          </span>
        </td>
        <td className='icon-td'>
          {(this.props.category.places || {}).length == 0 && (this.props.category.breakdowns || {}).length == 0 && (this.props.category.templates || {}).length == 0 && (
            <Trash handleClick={this.onClickTrashIcon} item={this.props.category} />
          )}
          {this.renderAlertMessage()}
        </td>
      </tr>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
}

reactMixin.onClass(Category, MessageNotifierMixin)

export default Category
