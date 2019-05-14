import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../../mixins/MessageNotifierMixin'

class AllTemplates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleClickOpenLink = this.handleClickOpenLink.bind(this)
  }

  handleClickOpenLink() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className='all-templates-component'>
        {this.state.isOpen ? (
          <span className='caret-icon'>
            <i className='fas fa-caret-down left-icon' />
          </span>
        ) : (
          <span className='caret-icon'>
            <i className='fas fa-caret-right left-icon' />
          </span>
        )}
        <span className='link' onClick={this.handleClickOpenLink}>{'すべて表示'}</span>
      </div>
    )
  }
}

reactMixin.onClass(AllTemplates, MessageNotifierMixin)

export default AllTemplates
