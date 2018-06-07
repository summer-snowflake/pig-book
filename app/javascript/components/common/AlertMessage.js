import React from 'react'
import PropTypes from 'prop-types'

class AlertMessage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let danger_or_success = this.props.success ? 'success' : 'danger'
    let check_or_times = this.props.success ? 'check' : 'times'
    return (
      <div className='alert-message-component'>
        {this.props.message ? (
          <div className={'alert alert-' + danger_or_success} role='alert'>
            <i className={'fas fa-' + check_or_times + '-circle left-icon'} />
            {this.props.message}
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
}

export default AlertMessage
