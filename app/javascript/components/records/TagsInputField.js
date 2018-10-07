import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import TagsInput from 'react-tagsinput'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import AutocompleteRenderInput from './AutocompleteRenderInput'

class TagsInputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      errorMessages: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.renderInput = this.renderInput.bind(this)
  }

  handleChange(tags) {
    this.props.onUpdateTags(tags)
  }

  renderInput(props) {
    const tags = this.props.tags
    return <AutocompleteRenderInput {...{tags,}} {...props} />
  }

  render() {
    return (
      <div className='tags-input-field-component'>
        {this.renderAlertMessage()}
        <TagsInput
          onChange={this.handleChange}
          renderInput={this.renderInput}
          value={this.props.selectedTags}
        />
      </div>
    )
  }
}

TagsInputField.propTypes = {
  selectedTags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onUpdateTags: PropTypes.func.isRequired
}

reactMixin.onClass(TagsInputField, MessageNotifierMixin)

export default TagsInputField
