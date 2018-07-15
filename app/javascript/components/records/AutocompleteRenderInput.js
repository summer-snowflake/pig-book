import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import reactCSS from 'reactcss'

class AutocompleteRenderInput extends React.Component {
  constructor(props) {
    super(props)
    this.styles = this.styles.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this)
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this)
  }

  styles(suggestion) {
    return (
      reactCSS({
        'default': {
          color: {
            background: `${suggestion.color_code}`
          }
        }
      })
    )
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  shouldRenderSuggestions(value) {
    return value && value.trim().length > 0
  }

  renderSuggestion(suggestion) {
    return (
      <span className='suggestion-item'>
        <div className='float-left color-code-box change-disabled' style={this.styles(suggestion).color} />
        <span className='suggestion-name'>{suggestion.name}</span>
      </span>
    )
  }

  handleSuggestionSelected(e, {suggestion}) {
    this.props.addTag(
      <span className='suggestion-item'>
        <div className='float-left color-code-box change-disabled' style={this.styles(suggestion).color} />
        <span className='suggestion-name'>{suggestion.name}</span>
      </span>
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
