import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

class TagsIcons extends React.Component {
  constructor(props) {
    super(props)
  }

  styles(taggedRecord) {
    return (
      reactCSS({
        'default': {
          color: {
            color: `${taggedRecord.tag_color_code}`
          }
        }
      })
    )
  }

  render() {
    return (
      <td className='tags-td'>
        {this.props.tags.map((tag) =>
          <i className='fas fa-tag left-icon' key={tag.id} style={this.styles(tag).color} />
        )}
      </td>
    )
  }
}

TagsIcons.propTypes = {
  tags: PropTypes.array.isRequired
}

export default TagsIcons
