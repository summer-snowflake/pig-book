import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import SubmitButton from './../common/SubmitButton'
import CloseButton from './../common/CloseButton'
import CategoriesSelectBox from './../common/CategoriesSelectBox'

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

class SelectCategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      selectedCategoryId: undefined,
      selectedBalanceOfPayments: undefined
    }
    this.onClickSubmitButton = this.onClickSubmitButton.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
  }

  onClickCloseButton() {
    this.setState({
      selectedCategoryId: undefined
    })
    this.props.handleClickCloseButton()
  }

  onClickSubmitButton() {
    this.setState({
      selectedCategoryId: undefined
    })
    this.props.handleClickSubmitButton(this.props.place.id, this.state.selectedCategoryId)
  }

  onSelectCategory(category) {
    this.setState({
      selectedCategoryId: (category || {}).id,
      selectedBalanceOfPayments: (category || {}).balance_of_payments
    })
  }

  render() {
    return (
      <div className='destroy-modal-component'>
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              <b>{this.props.place.name}</b>
              {'に追加するカテゴリを選択してください。'}
            </p>
          </div>
          <CategoriesSelectBox categories={this.props.categories} handleSelectCategory={this.onSelectCategory} selectedBalanceOfPayments={this.state.selectedBalanceOfPayments} />
          <div className='modal-footer'>
            <SubmitButton handleClickButton={this.onClickSubmitButton} isDisabled={!this.state.selectedCategoryId}/>
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

SelectCategoryModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  handleClickSubmitButton: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default SelectCategoryModal
