import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

class Tag extends React.Component {
  constructor(props) {
    super(props)
    this.styles = this.styles.bind(this)
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

  render() {
    return (
      <span className='tag-component suggestion-item'>
        <div className='float-left color-code-box change-disabled' style={this.styles(this.props.tag).color} />
        <span className='suggestion-name'>{this.props.tag.name}</span>
      </span>
    )
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired
}

export default Tag
