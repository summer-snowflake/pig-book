class TrashComponent extends React.Component {
  handleClickTrashIcon() {
  }

  render() {
    return (
      <div className='trash-component'>
        <i className='far fa-trash-alt float-right' onClick={this.handleClickTrashIcon} />
      </div>
    )
  }
}
