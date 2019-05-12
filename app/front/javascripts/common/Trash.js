import React from 'react'
import PropTypes from 'prop-types'

class Trash extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.item)
  }

  render() {
    return (
      <div className='trash-component'>
        <i className='far fa-trash-alt' data-target='#deleteModal' data-toggle='modal' onClick={this.handleClick} />
      </div>
    )
  }
}

Trash.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Trash
