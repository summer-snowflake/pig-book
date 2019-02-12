import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import Trash from './../common/Trash'
import UpdateButton from './../common/UpdateButton'
import BadgePill from './../common/BadgePill'
import FormErrorMessages from './../common/FormErrorMessages'
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
            <span className='form-group col-auto'>
              <input checked={this.state.balance_of_payments} className='form-check-input' id={'income-' + this.props.category.id} name={'balance_of_payments' + this.props.category.id} onChange={this.handleChangeBalanceOfPayments} type='radio' value={this.state.balance_of_payments} />
              <label className='form-check-label' htmlFor={'income-' + this.props.category.id}>
                {'収入'}
              </label>
            </span>
            <span className='form-group col-auto'>
              <input checked={!this.state.balance_of_payments} className='form-check-input' id={'expenditure-' + this.props.category.id} name={'balance_of_payments' + this.props.category.id} onChange={this.handleChangeBalanceOfPayments} type='radio' value={this.state.balance_of_payments} />
              <label className='form-check-label' htmlFor={'expenditure-' + this.props.category.id}>
                {'支出'}
              </label>
            </span>
          </td>
        ) : (
          <td className='left-edit-target radio-td'>
            <BadgePill label={this.props.category.human_balance_of_payments} successOrDanger={this.props.category.success_or_danger_style_class} />
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeCategoryName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.category.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target button-td'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='right-edit-target' />
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
