import React from 'react'
import PropTypes from 'prop-types'

class RecordsTotals extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='records-totals-component float-right'>
        <table className='table table-bordered records-totals-table'>
          <tbody>
            <tr>
              <td>{'計'}</td>
              <td>
                <i className='fas fa-plus-square left-icon blue' />
                {this.props.totals.human_income}
              </td>
              <td>
                <i className='fas fa-minus-square left-icon red' />
                {this.props.totals.human_expenditure}
              </td>
              <td>
                <i className='fas fa-parking left-icon green' />
                {this.props.totals.point}
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    )
  }
}

RecordsTotals.propTypes = {
  totals: PropTypes.object.isRequired
}

export default RecordsTotals
