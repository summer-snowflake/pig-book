import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//import PlaceForm from './breakdowns/BreakdownForm'
import Breakdowns from './breakdowns/Breakdowns'
import AlertMessage from './common/AlertMessage'

class BreakdownCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      breakdowns: this.props.breakdowns,
      errorMessages: {}
    }
    this.getBreakdowns = this.getBreakdowns.bind(this)
    this.destroyBreakdown = this.destroyBreakdown.bind(this)
  }

  componentWillMount() {
    this.getBreakdowns()
  }

  getBreakdowns(break_id) {
    //let options = {
    //  method: 'GET',
    //  url: origin + '/api/categories/',
    //  params: {
    //    last_request_at: this.props.last_request_at
    //  },
    //  headers: {
    //    'Authorization': 'Token token=' + this.props.user_token
    //  },
    //  json: true
    //}
    //axios(options)
    //  .then((res) => {
    //    if(res.status == '200') {
    //      this.setState({
    //        places: res.data
    //      })
    //    }
    //  })
  }

  destroyBreakdown() {
  }

  render() {
    return (
      <div className='breakdown-card-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <Breakdowns breakdowns={this.state.breakdowns} handleClickDestroyButton={this.destroyBreakdown} />
      </div>
    )
  }
}

BreakdownCard.propTypes = {
  breakdowns: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default BreakdownCard
