import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'

import Tag from './Tag'

class AutocompleteRenderInput extends React.Component {
  constructor(props) {
    super(props)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this)
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this)
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  shouldRenderSuggestions(value) {
    return value && value.trim().length > 0
  }

  renderSuggestion(suggestion) {
    return <Tag tag={suggestion} />
  }

  handleSuggestionSelected(e, {suggestion}) {
    this.props.addTag(
      <Tag tag={suggestion} />
    )
  }

  handleSuggestionsClearRequested() {
    return {}
  }

  handleSuggestionsFetchRequested() {
    return {}
  }

  render() {
    const {addTag, ...other} = this.props

    const inputValue = (this.props.value && this.props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length
    let suggestions = this.props.tags.filter((tag) => {
      return tag.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    const handleChange = (e, {method}) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        this.props.onChange(e)
      }
    }

    return (
      <Autosuggest
        getSuggestionValue={this.getSuggestionValue}
        inputProps={{...other, onChange: handleChange}}
        onSuggestionSelected={this.handleSuggestionSelected}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        suggestions={suggestions}
      />
    )
  }
}

AutocompleteRenderInput.propTypes = {
  value: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  addTag: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AutocompleteRenderInput
