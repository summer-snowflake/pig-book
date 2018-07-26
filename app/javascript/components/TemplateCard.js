import React from 'react'
import PropTypes from 'prop-types'
import TemplateCardBody from './templates/TemplateCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class TemplateCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='template-card-component'>
        <ErrorBoundary>
          <TemplateCardBody last_request_at={this.props.last_request_at} templates={this.props.templates} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

TemplateCard.propTypes = {
  templates: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default TemplateCard
