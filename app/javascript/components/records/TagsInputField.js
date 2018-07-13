import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import TagsInput from 'react-tagsinput'

import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import AutocompleteRenderInput from './AutocompleteRenderInput'

class TagsInputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      tags: [],
      message: '',
      success: false,
      errorMessages: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.renderInput = this.renderInput.bind(this)
  }

  handleChange(tags) {
    this.setState({
      tags: tags
    })
  }

  renderInput(props) {
    const tags = this.props.tags
    return <AutocompleteRenderInput {...{tags}} {...props} />
  }

  render() {
    return (
      <div className='tags-input-field-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <TagsInput
          onChange={this.handleChange}
          renderInput={this.renderInput}
          value={this.state.tags}
        />
      </div>
    )
  }
}

TagsInputField.propTypes = {
  tags: PropTypes.array.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired
}

reactMixin.onClass(TagsInputField, MessageNotifierMixin)

export default TagsInputField
