import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import TemplateCardBody from './templates/TemplateCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class TemplateCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='template-card-component'>
        <ErrorBoundary>
          <TemplateCardBody templates={this.props.templates} />
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

reactMixin.onClass(TemplateCard, LocalStorageMixin)

export default TemplateCard
