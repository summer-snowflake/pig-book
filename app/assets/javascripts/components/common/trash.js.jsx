class TrashComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.item)
  }

  render() {
    return (
      <div className='trash-component'>
        <i className='far fa-trash-alt float-right' data-target='#deleteModal' data-toggle='modal' onClick={this.handleClick} />
      </div>
    )
  }
}
