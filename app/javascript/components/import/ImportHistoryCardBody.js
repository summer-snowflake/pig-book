import React from 'react'
import PropTypes from 'prop-types'

import ImportHistories from './ImportHistories'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='import-history-card-body-component'>
        <ImportHistories histories={this.props.histories} />
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
