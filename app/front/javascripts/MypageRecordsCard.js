import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MypageRecordsCardBody from './mypage/MypageRecordsCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class MypageRecordsCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='mypage-records-card-component'>
        <ErrorBoundary>
          <MypageRecordsCardBody records={this.props.records} />
        </ErrorBoundary>
      </div>
    )
  }
}

MypageRecordsCard.propTypes = {
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(MypageRecordsCard, LocalStorageMixin)

export default MypageRecordsCard
