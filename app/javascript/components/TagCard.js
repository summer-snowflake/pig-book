import React from 'react'
import PropTypes from 'prop-types'
import TagCardBody from './tags/TagCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class TagCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='tag-card-component'>
        <ErrorBoundary>
          <TagCardBody last_request_at={this.props.last_request_at} tags={this.props.tags} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

TagCard.propTypes = {
  tags: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default TagCard
