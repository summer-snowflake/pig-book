class ModalComponent extends React.Component {
  render() {
    return (
      <div className='modal-component modal fade' role='dialog' id='deleteModal' tabIndex='-1'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <p>{'削除しますか？'}</p>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary'>
                {'はい'}
              </button>
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
