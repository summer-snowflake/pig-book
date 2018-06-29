import React from 'react'
import PropTypes from 'prop-types'

class BadgePill extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className={'badge-pill-component badge badge-pill badge-' + this.props.successOrDanger}>
        {this.props.label}
      </span>
    )
  }
}

BadgePill.propTypes = {
  successOrDanger: PropTypes.string,
  label: PropTypes.string
}

export default BadgePill
