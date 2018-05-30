class TrashComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='trash-component'>
        <i className='far fa-trash-alt float-right' data-toggle='modal' data-target={'#deleteModal-' + this.props.category.id} onClick={this.handleClick} />
        <ModalComponent url={'/categories/' + this.props.category.id} item={this.props.category} />
      </div>
    )
  }
}
