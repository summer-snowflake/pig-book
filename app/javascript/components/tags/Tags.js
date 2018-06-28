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
              <Tag key={tag.id} onClickPlusIcon={this.handleClickPlusIcon} onClickTrashIcon={this.handleClickTrashIcon} tag={tag} />
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
  handleClickDestroyButton: PropTypes.func.isRequired
}

export default Tags
