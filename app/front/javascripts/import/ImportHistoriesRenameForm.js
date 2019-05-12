import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import FormErrorMessages from './../common/FormErrorMessages'
import Button from './../common/Button'
import FormMixin from './../mixins/FormMixin'

class ImportHistoriesRenameForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.beforeText = React.createRef()
    this.afterText = React.createRef()
  }

  handleClickSubmitButton() {
    this.props.onClickButton({ before: this.beforeText.current.value, after: this.afterText.current.value })
  }

  render() {
    return (
      <div className='import-histories-rename-field-component form-row'>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('before')}>
          <input className='form-control' name='before' placeholder='before' ref={this.beforeText} type='text' />
          <FormErrorMessages column='before' errorMessages={this.props.errorMessages} />
          {this.props.updatedIds.length > 0 && (
            <span className='form-text updated-message'>
              {this.props.updatedIds.length + '件の明細が更新されました'}
            </span>
          )}
        </div>
        <div className={'form-group col-md-4 mb-3 ' + this.fieldWithErrors('after')}>
          <input className='form-control' name='after' placeholder='after' ref={this.afterText} type='text' />
          <FormErrorMessages column='after' errorMessages={this.props.errorMessages} />
        </div>
        <div className='form-group col-auto mb-3'>
          { /* NOTE: AddButton componentを利用するとcapybaraでjsのエラーが発生してしまうため、Buttonを直接利用する */ }
          <Button humanValueName='置換する' isDisabled={this.props.isEditing} onClickButton={this.handleClickSubmitButton} valueName='replace' />
        </div>
      </div>
    )
  }
}

ImportHistoriesRenameForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  updatedIds: PropTypes.array.isRequired,
  errorMessages: PropTypes.object.isRequired,
  onClickButton: PropTypes.func.isRequired
}

reactMixin.onClass(ImportHistoriesRenameForm, FormMixin)

export default ImportHistoriesRenameForm
