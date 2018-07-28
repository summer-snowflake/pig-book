import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class MonthlyBalanceTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let defaultNumber = { income: 0, expenditure: 0 }
    let monthlyKeys = [...Array(12).keys()]
    return (
      <div className='monthly-balance-table-component'>
        <table className='table table-bordered monthly-table'>
          <tbody>
            <tr>
              {monthlyKeys.map((index) =>
                <td className='monthly-td' key={index}>
                  {index + 1}
                </td>
              )}
            </tr>
            <tr>
              {monthlyKeys.map((index) =>
                <td key={index}>
                  {(this.props.data.find( data => moment(data.beginning_at).month() == index + 1 ) || defaultNumber).income}
                  <br />
                  {(this.props.data.find( data => moment(data.beginning_at).month() == index + 1 ) || defaultNumber).expenditure}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

MonthlyBalanceTable.propTypes = {
  data: PropTypes.array.isRequired
}

export default MonthlyBalanceTable
