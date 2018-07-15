import React from 'react'
import PropTypes from 'prop-types'
import Tag from './Tag'
import DestroyModal from './../common/DestroyModal'

class Tags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: {
        id: null
      },
      destroyModalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(tag) {
    this.setState({
      tag: tag,
      destroyModalIsOpen: true
    })
  }

  onClickDestroyButton(tag_id) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(tag_id)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='tags-component'>
        <table className='table'>
          <tbody>
            {this.props.tags.map((tag) =>
              <Tag getTags={this.props.getTags} key={tag.id} last_request_at={this.props.last_request_at} onClickPlusIcon={this.handleClickPlusIcon} onClickTrashIcon={this.handleClickTrashIcon} tag={tag} user_token={this.props.user_token} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.tag} modalIsOpen={this.state.destroyModalIsOpen} />
      </div>
    )
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired
}

export default Tags
