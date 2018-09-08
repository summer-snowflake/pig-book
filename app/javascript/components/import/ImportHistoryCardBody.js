import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import ImportHistories from './ImportHistories'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
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
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
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
        <ImportHistories getImportHistories={this.getImportHistories} histories={this.state.histories} />
      </div>
    )
  }
}

ImportHistoryCardBody.propTypes = {
  histories: PropTypes.array.isRequired
}

reactMixin.onClass(ImportHistoryCardBody, MessageNotifierMixin)
reactMixin.onClass(ImportHistoryCardBody, LocalStorageMixin)

export default ImportHistoryCardBody
