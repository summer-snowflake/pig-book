import React from 'react'
import PropTypes from 'prop-types'

class ImportHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr className='import-history-component'>
        <td>{this.props.history.row}</td>
      </tr>
    )
  }
}

ImportHistory.propTypes = {
  history: PropTypes.object.isRequired
}

export default ImportHistory
