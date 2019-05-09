import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import TagCardBody from './tags/TagCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class TagCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='tag-card-component'>
        <ErrorBoundary>
          <TagCardBody tags={this.props.tags} />
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

reactMixin.onClass(TagCard, LocalStorageMixin)

export default TagCard
