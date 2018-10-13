import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import moment from 'moment'

import DateFormat from './../common/DateFormat'
import CloseButton from './../common/CloseButton'

const customStyles = {
  content : {
    top         : '30%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    minWidth    : '400px',
    transform   : 'translate(-50%, -50%)'
  },
  overlay: {
    background  : 'rgba(0, 0, 0, .5)'
  }
}

class RecordInfoModal extends React.Component {
  constructor(props) {
    super(props)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  render() {
    console.log(this.props.record)
    if (this.props.record.id == null) {
      return null
    }
    return (
      <div className='record-info-modal-component'>
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              <DateFormat targetDate={moment(this.props.record.published_at)} />
            </p>
            <p>{this.props.record.category_name}</p>
            <p>{this.props.record.breakdown_name}</p>
            <p>{this.props.record.place_name}</p>
            <p>{this.props.record.human_charge}</p>
            <p>{this.props.record.point}</p>
            <p>{this.props.record.tagged_records.map((tag) => tag.tag_name)}</p>
            <p>{this.props.record.memo}</p>
          </div>
          <div className='modal-footer'>
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

RecordInfoModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  record: PropTypes.object.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default RecordInfoModal
