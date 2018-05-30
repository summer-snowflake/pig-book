class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='modal-component modal fade' role='dialog' id={'deleteModal-' + this.props.item.id} tabIndex='-1'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>
                <b>{this.props.item.name}</b>
                {'を削除してもよろしいですか？'}
              </p>
            </div>
            <div className='modal-footer'>
              <a className='btn btn-secondary' href={this.props.url} data-method='delete'>
                {'はい'}
              </a>
              <button className='btn btn-light' data-dismiss='modal'>
                {'閉じる'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
