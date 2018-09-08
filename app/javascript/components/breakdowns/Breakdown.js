import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import Trash from './../common/Trash'
import UpdateButton from './../common/UpdateButton'
import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BadgePill from './../common/BadgePill'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class Breakdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      isEditing: false,
      name: this.props.breakdown.name,
      categoryId: this.props.breakdown.category_id,
      selectedBalanceOfPayments: undefined,
      message: '',
      success: false,
      errorMessages: {}
    }
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeBreakdownName = this.handleChangeBreakdownName.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onClickTrashIcon(breakdown) {
    this.props.onClickTrashIcon(breakdown)
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

  handleChangeBreakdownName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleClickUpdateButton() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      name: this.state.name,
      category_id: this.state.categoryId
    }
    let options = {
      method: 'PATCH',
      url: origin + '/api/breakdowns/' + this.props.breakdown.id,
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.setState({
          isEditing: false
        })
        this.props.getBreakdowns()
        this.noticeUpdatedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  onSelectCategory(category) {
    this.setState({
      categoryId: category.id,
      selectedBalanceOfPayments: category.balance_of_payments
    })
  }

  render() {
    return (
      <tr className='breakdown-component' id={'breakdown-' + this.props.breakdown.id}>
        {!this.state.isEditing && (
          <td className='left-edit-target breakdown-category-td'>
            <BadgePill label={this.props.breakdown.category_human_balance_of_payments} successOrDanger={this.props.breakdown.category_success_or_danger_style_class} />
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target breakdown-category-td' colSpan='2'>
            <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} selectedBalanceOfPayments={this.state.selectedBalanceOfPayments} selectedCategoryId={this.state.categoryId} />
            <FormErrorMessages column='category' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target breakdown-category-td'>
            {this.props.breakdown.category_name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeBreakdownName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.breakdown.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='center-edit-target' />
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
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.breakdown} />
          <AlertMessage message={this.state.message} success={this.state.success} />
        </td>
      </tr>
    )
  }
}

Breakdown.propTypes = {
  categories: PropTypes.array.isRequired,
  breakdown: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  getBreakdowns: PropTypes.func.isRequired
}

reactMixin.onClass(Breakdown, MessageNotifierMixin)
reactMixin.onClass(Breakdown, LocalStorageMixin)

export default Breakdown
