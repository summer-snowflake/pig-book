import React from 'react'
import PropTypes from 'prop-types'

import ImportHistories from './ImportHistories'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  getImportHistories() {
    console.log('get import histories')
  }

  render() {
    return (
      <div className='import-history-card-body-component'>
        <ImportHistories getImportHistories={this.getImportHistories} histories={this.props.histories} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
      </div>
    )
  }
}

ImportHistoryCardBody.propTypes = {
  histories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default ImportHistoryCardBody
