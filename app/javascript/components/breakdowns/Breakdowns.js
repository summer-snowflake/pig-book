import React from 'react'
import PropTypes from 'prop-types'
import Breakdown from './Breakdown'
import DestroyModal from './../common/DestroyModal'

class Breakdowns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakdown: {
        id: null
      },
      destroyModalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(breakdown) {
    this.setState({
      breakdown: breakdown,
      destroyModalIsOpen: true
    })
  }

  onClickDestroyButton(breakdown_id) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(breakdown_id)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='breakdowns-component'>
        <table className='table'>
          <tbody>
            {this.props.breakdowns.map((breakdown) =>
              <Breakdown breakdown={breakdown} categories={this.props.categories} getBreakdowns={this.props.getBreakdowns} key={breakdown.id} last_request_at={this.props.last_request_at} onClickTrashIcon={this.handleClickTrashIcon} user_token={this.props.user_token} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.breakdown} modalIsOpen={this.state.destroyModalIsOpen} />
      </div>
    )
  }
}

Breakdowns.propTypes = {
  categories: PropTypes.array.isRequired,
  breakdowns: PropTypes.array.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  getBreakdowns: PropTypes.func.isRequired
}

export default Breakdowns
