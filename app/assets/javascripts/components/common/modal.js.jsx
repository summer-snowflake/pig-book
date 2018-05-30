class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='modal-component modal fade' id='deleteModal' role='dialog' tabIndex='-1'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>
                <b>{this.props.item.name}</b>
                {'を削除してもよろしいですか？'}
              </p>
            </div>
            <div className='modal-footer'>
              <SubmitButtonComponent url={this.props.url} />
              <CloseButtonComponent />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
