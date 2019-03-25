import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import DownloadFilesCardBody from './mypage/DownloadFilesCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class DownloadFilesCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='download-files-card-component'>
        <ErrorBoundary>
          <DownloadFilesCardBody downloadFiles={this.props.download_files} />
        </ErrorBoundary>
      </div>
    )
  }
}

DownloadFilesCard.propTypes = {
  download_files: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(DownloadFilesCard, LocalStorageMixin)

export default DownloadFilesCard
