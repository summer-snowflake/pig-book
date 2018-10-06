import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import Trash from './../common/Trash'
import UpdateButton from './../common/UpdateButton'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import CategoriesSelectBox from './../common/CategoriesSelectBox'
import BreakdownsSelectBox from './../common/BreakdownsSelectBox'
import { templateAxios } from './../mixins/requests/TemplatesMixin'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      name: this.props.template.name,
      charge: this.props.template.charge,
      memo: this.props.template.memo,
      categoryId: this.props.template.category_id,
      breakdownId: this.props.template.breakdown_id,
      breakdowns: [],
      errorMessages: {}
    }
    this.patchTemplate = this.patchTemplate.bind(this)
    this.patchTemplateCallback = this.patchTemplateCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeTemplateName = this.handleChangeTemplateName.bind(this)
    this.handleChangeTemplateCharge = this.handleChangeTemplateCharge.bind(this)
    this.handleChangeTemplateMemo = this.handleChangeTemplateMemo.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectBreakdown = this.onSelectBreakdown.bind(this)
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

  handleChangeTemplateCharge(e) {
    this.setState({
      charge: e.target.value
    })
  }

  handleChangeTemplateMemo(e) {
    this.setState({
      memo: e.target.value
    })
  }

  patchTemplateCallback() {
    this.setState({
      isEditing: false
    })
    this.props.getTemplates()
    this.noticeUpdatedMessage()
  }

  patchTemplate() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      name: this.state.name,
      category_id: this.state.categoryId,
      breakdown_id: this.state.breakdownId,
      charge: this.state.charge,
      memo: this.state.memo
    }
    templateAxios.patch(this.props.template.id, params, patchTemplateCallback, noticeErrorMessage)
  }

  onSelectCategory(category) {
    this.setState({
      categoryId: category.id,
      breakdowns: category.breakdowns
    })
  }

  onSelectBreakdown(breakdown) {
    this.setState({
      breakdownId: (breakdown || {}).id
    })
  }

  render() {
    return (
      <tr className='template-component' id={'template-' + this.props.template.id}>
        {this.state.isEditing ? (
          <td className='left-edit-target template-category-td' colSpan='2'>
            <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} plusButton={false} selectedCategoryId={this.state.categoryId} />
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
          <td className='center-edit-target template-category-td' colSpan='2'>
            <BreakdownsSelectBox breakdowns={this.state.breakdowns} handleSelectBreakdown={this.onSelectBreakdown} isDisabled={false} selectedBreakdownId={this.state.breakdownId} />
            <FormErrorMessages column='breakdown' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target template-category-td'>
            {this.props.template.breakdown_name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeTemplateCharge} type='number' value={this.state.charge} />
            <FormErrorMessages column='charge' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.template.charge}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <input className='form-control' onChange={this.handleChangeTemplateMemo} type='text' value={this.state.memo} />
            <FormErrorMessages column='memo' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='center-edit-target'>
            {this.props.template.memo}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <UpdateButton onClickButton={this.patchTemplate} />
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
          {this.renderAlertMessage()}
        </td>
      </tr>
    )
  }
}

Template.propTypes = {
  categories: PropTypes.array.isRequired,
  template: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  getTemplates: PropTypes.func.isRequired
}

reactMixin.onClass(Template, MessageNotifierMixin)

export default Template
