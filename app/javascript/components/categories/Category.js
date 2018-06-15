import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      balance_of_payments: this.props.category.balance_of_payments,
      name: this.props.category.name
    }
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
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

  handleChangeBalanceOfPayments(e) {
    this.setState({
      balance_of_payments: !this.state.balance_of_payments
    })
  }

  handleClickUpdateButton() {
    this.setState({
      isEditing: false
    })
    this.props.handleClickUpdateButton(this.props.category.id, {name: this.state.name, balance_of_payments: this.state.balance_of_payments})
  }

  render() {
    return (
      <tr className='category-component' id={'category-' + this.props.category.id}>
        {this.state.isEditing ? (
          <td className='radio-td left-edit-target'>
            <span className='form-group col-auto'>
              <input className='form-check-input' id={'income-' + this.props.category.id} name={'balance_of_payments' + this.props.category.id} onChange={this.handleChangeBalanceOfPayments} type='radio' value={this.state.balance_of_payments} checked={this.state.balance_of_payments} />
              <label className='form-check-label' htmlFor={'income-' + this.props.category.id}>
                {'収入'}
              </label>
            </span>
            <span className='form-group col-auto'>
              <input className='form-check-input' id={'expenditure-' + this.props.category.id} name={'balance_of_payments' + this.props.category.id} onChange={this.handleChangeBalanceOfPayments} type='radio' value={this.state.balance_of_payments} checked={!this.state.balance_of_payments} />
              <label className='form-check-label' htmlFor={'expenditure-' + this.props.category.id}>
                {'支出'}
              </label>
            </span>
          </td>
        ) : (
          <td className='left-edit-target radio-td'>
            <span className={'badge badge-pill badge-' + this.props.category.success_or_danger_style_class}>
              {this.props.category.human_balance_of_payments}
            </span>
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input type='text' value={this.state.name} className='form-control' onChange={this.handleChangeCategoryName} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.category.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target button-td'>
            <input className='btn btn-secondary' type='button' value='更新する' onClick={this.handleClickUpdateButton} />
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
          <i className='fas fa-map-marker-alt left-icon' />
          {(this.props.category.places || {}).length}
        </td>
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.category} />
        </td>
      </tr>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  handleClickUpdateButton: PropTypes.func.isRequired
}

export default Category
