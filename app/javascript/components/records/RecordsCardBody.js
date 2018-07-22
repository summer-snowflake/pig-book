import React from 'react'
import PropTypes from 'prop-types'

class RecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='records-card-body-component'>
        {'list'}
      </div>
    )
  }
}

RecordsCardBody.propTypes = {
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default RecordsCardBody
