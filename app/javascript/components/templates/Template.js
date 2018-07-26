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

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      name: this.props.template.name,
      categoryId: this.props.template.category_id,
      message: '',
      success: false,
      errorMessages: {}
    }
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeTemplateName = this.handleChangeTemplateName.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onClickTrashIcon(template) {
    this.props.onClickTrashIcon(template)
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

  handleChangeTemplateName(e) {
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
      url: origin + '/api/templates/' + this.props.template.id,
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.setState({
          isEditing: false
        })
        this.props.getTemplates()
        this.noticeUpdatedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  onSelectCategory(category) {
    this.setState({
      categoryId: category.id
    })
  }

  render() {
    return (
      <tr className='template-component' id={'template-' + this.props.template.id}>
        {!this.state.isEditing && (
          <td className='left-edit-target template-category-td'>
            <BadgePill label={this.props.template.category_human_balance_of_payments} successOrDanger={this.props.template.category_success_or_danger_style_class} />
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target template-category-td' colSpan='2'>
            <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} selectedCategoryId={this.state.categoryId} />
            <FormErrorMessages column='category' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target template-category-td'>
            {this.props.template.category_name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeTemplateName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.template.name}
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
          <Trash handleClick={this.onClickTrashIcon} item={this.props.template} />
          <AlertMessage message={this.state.message} success={this.state.success} />
        </td>
      </tr>
    )
  }
}

Template.propTypes = {
  categories: PropTypes.array.isRequired,
  template: PropTypes.object.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  getTemplates: PropTypes.func.isRequired
}

reactMixin.onClass(Template, MessageNotifierMixin)

export default Template
