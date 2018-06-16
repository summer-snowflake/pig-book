import React from 'react'
import PropTypes from 'prop-types'

class BreakdownsSelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectBreakdown = this.handleSelectBreakdown.bind(this)
  }

  handleSelectBreakdown(e) {
    let breakdown = this.props.breakdowns[e.target.value]
    this.props.handleSelectBreakdown(breakdown)
  }

  render() {
    return (
      <span className='breakdowns-select-box-component'>
        <div className='input-group mb-1'>
          <select className='form-control' disabled={this.props.isDisabled} id='selectable-breakdowns' onChange={this.handleSelectBreakdown} ref='breakdown'>
            <option value='' >{'- 内訳 -'}</option>
            {this.props.breakdowns.map ((breakdown, index) =>
              <option key={breakdown.id} value={index}>{breakdown.name}</option>
            )}
          </select>
        </div>
      </span>
    )
  }
}

BreakdownsSelectBox.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  breakdowns: PropTypes.array.isRequired,
  handleSelectBreakdown: PropTypes.func.isRequired
}

export default BreakdownsSelectBox
