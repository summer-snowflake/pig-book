import React from 'react'
import PropTypes from 'prop-types'
import slack from './../plugins/slack'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // NOTE: raise error following:
    // this.setState(() => { throw error })
    this.setState({ hasError: true })
    let last_request_at = this.props.children.props.last_request_at
    let user_token = this.props.children.props.user_token
    let path = '/services' + process.env.SLACK_WEBHOOK_URL.split('/services')[1]
    let message = 'user_token: ' + user_token + '\nlast_request_at: ' + last_request_at + '\n'
    message += String(error) + info.componentStack
    slack({
      path: path,
      message: message
    })
  }

  render() {
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired
}

export default ErrorBoundary
