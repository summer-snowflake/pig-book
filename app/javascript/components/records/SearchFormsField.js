import React from 'react'
import PropTypes from 'prop-types'

class SearchFormsField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.handleChangeMonth = this.handleChangeMonth.bind(this)
  }

  handleChangeMonth(e) {
    this.setState({
      value: Number(e.target.value)
    })
    this.props.handleChangeMonth(Number(e.target.value))
  }

  render() {
    let monthlyKeys = [...Array(12).keys()]

    return (
      <span className='search-forms-field-component form-row'>
        {!this.props.month && (
          <span className='search-keyword-selectbox form-group col-md-5'>
            <select className='form-control' onChange={this.handleChangeMonth} value={this.props.month}>
              <option value={0}>{'- 月 -'}</option>
              {monthlyKeys.map((index) => (
                <option key={index+1} value={index+1}>
                  {index+1}
                </option>
              ))}
            </select>
          </span>
        )}
      </span>
    )
  }
}

SearchFormsField.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number,
  handleChangeMonth: PropTypes.func.isRequired
}

export default SearchFormsField
