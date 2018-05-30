class CloseButtonComponent extends React.Component {
  render() {
    return (
      <span className='close-button-component'>
        <button className='btn btn-light' data-dismiss='modal' id='cancel'>
          <i className='fas fa-times left-icon' />
          {'閉じる'}
        </button>
      </span>
    )
  }
}
