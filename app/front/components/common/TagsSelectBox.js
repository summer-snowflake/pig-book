import React from 'react'
import PropTypes from 'prop-types'

class TagsSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectTag = this.handleSelectTag.bind(this)
  }

  handleSelectTag(e) {
    let tag = this.props.tags.find( tag => tag.id == e.target.value )
    this.props.handleSelectTag(tag)
  }

  render() {
    return (
      <span className='tags-select-box-component'>
        <div className='input-group mb-1'>
          <select className='form-control' id='selectable-tags' onChange={this.handleSelectTag} ref='tag' value={this.props.selectedTagId || ''}>
            <option value='' >{'- ラベル -'}</option>
            {this.props.tags.map ((tag) =>
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            )}
          </select>
        </div>
      </span>
    )
  }
}

TagsSelectBox.propTypes = {
  tags: PropTypes.array.isRequired,
  selectedTagId: PropTypes.number,
  handleSelectTag: PropTypes.func.isRequired
}

export default TagsSelectBox
