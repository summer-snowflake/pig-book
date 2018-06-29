import React from 'react'
import PropTypes from 'prop-types'
//import Autosuggest from 'react-autosuggest'

class TagsInputField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tags-input-field-component'>
        {this.props.last_request_at}
        {this.props.user_token}
      </div>
    )
  }
}

TagsInputField.propTypes = {
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired
}

export default TagsInputField
