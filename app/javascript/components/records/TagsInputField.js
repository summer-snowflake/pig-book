import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import AlertMessage from './../common/AlertMessage'
import Autosuggest from 'react-autosuggest'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class TagsInputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      message: '',
      success: false,
      errorMessages: {}
    }
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this)
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this)
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  handleSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0 ? [] : this.props.tags.filter(tag =>
      tag.name.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  handleSuggestionSelected() {
    console.log('selected')
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.color_code} {suggestion.name}
      </div>
    )
  }

  render() {
    const inputProps = {
      value: this.state.value,
      onChange: this.onChange
    }

    return (
      <div className='tags-input-field-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <Autosuggest
          getSuggestionValue={this.getSuggestionValue}
          inputProps={inputProps}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          renderSuggestion={this.renderSuggestion}
          suggestions={this.state.suggestions}
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
