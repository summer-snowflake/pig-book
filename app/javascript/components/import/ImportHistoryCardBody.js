import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import ImportHistories from './ImportHistories'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      histories: this.props.histories
    }
    this.getImportHistories = this.getImportHistories.bind(this)
  }

  componentWillMount() {
    this.getImportHistories()
  }

  getImportHistories() {
    let options = {
      method: 'GET',
      url: origin + '/api/import_histories',
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          histories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='import-history-card-body-component'>
        <ImportHistories getImportHistories={this.getImportHistories} histories={this.state.histories} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
      </div>
    )
  }
}

ImportHistoryCardBody.propTypes = {
  histories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(ImportHistoryCardBody, MessageNotifierMixin)

export default ImportHistoryCardBody
