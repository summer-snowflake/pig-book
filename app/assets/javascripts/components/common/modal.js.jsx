class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='modal-component modal fade' role='dialog' id='deleteModal' tabIndex='-1'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>
                <b>{this.props.item.name}</b>
                {'を削除してもよろしいですか？'}
              </p>
            </div>
            <div className='modal-footer'>
              <a href={this.props.url} data-method='delete'>
                <button className='btn btn-secondary' id='submit'>
                  <i className='far fa-trash-alt left-icon' />
                  {'はい'}
                </button>
              </a>
              <button className='btn btn-light' data-dismiss='modal' id='cancel'>
                <i className='fas fa-times left-icon' />
                {'閉じる'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
