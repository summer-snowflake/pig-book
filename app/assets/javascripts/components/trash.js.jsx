class TrashComponent extends React.Component {
  render() {
    return (
      <div className='trash-component'>
        <i className='far fa-trash-alt float-right' data-toggle='modal' data-target='#deleteModal' />
      </div>
    )
  }
}
