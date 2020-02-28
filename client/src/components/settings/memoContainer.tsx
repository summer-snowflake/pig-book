import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import EditAndCancel from 'components/common/editAndCancel';
import CancelUpdateModal from 'components/common/cancelUpdateModal';
import { getProfile, patchProfile, setEditing } from 'actions/settingsActions';

interface Props {
  getProfile: any,
  patchProfile: any,
  setEditing: any,
  profile: {
    editing: boolean,
    isLoading: boolean,
    memo: string
  }
}

interface State {
  isOpenCancelModal: boolean,
  memo: string
}

class MemoContainer extends Component<i18nProps & Props, State> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.state = {
      isOpenCancelModal: false,
      memo: ''
    }

    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleChangeMemo = this.handleChangeMemo.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);

    this.props.getProfile();
  }

  diff(): boolean {
    return this.props.profile.editing && this.state.memo !== this.props.profile.memo;
  }

  handleClickIcon() {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.setEditing(!this.props.profile.editing)
      this.setState({
        memo: this.props.profile.memo
      })
    }
  }

  handleClickCancel() {
    this.props.setEditing(false)
    this.setState({
      isOpenCancelModal: false,
    })
  }

  handleClickClose() {
    this.setState({
      isOpenCancelModal: false
    })
  }

  handleChangeMemo(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      memo: e.target.value
    })
  }

  handleClickSubmitButton() {
    const params = {
      memo: this.state.memo
    }
    this.props.patchProfile(params);
  }

  render() {
    const { t } = this.props;

    return (
      <div className='memo-component container'>
        <CancelUpdateModal
          isOpen={this.state.isOpenCancelModal}
          handleClickCancel={this.handleClickCancel}
          handleClickClose={this.handleClickClose} />
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-book-open left-icon' />
            {t('title.memo')}
          </div>
          <div className='card-body'>
            {this.props.profile.editing && (
              <span className='badge badge-info editing-badge'>
                <i className="fas fa-pen-square left-icon"></i>
                {t('title.editing')}
              </span>
            )}
            <EditAndCancel editing={this.props.profile.editing} handleClickIcon={this.handleClickIcon} />
            {this.props.profile.editing ? (
              <form>
                <div className='form-group'>
                  <textarea
                    className='form-control'
                    onChange={this.handleChangeMemo}
                    rows={8}
                    value={this.state.memo} />
                </div>
                {this.props.profile.editing && (
                  <button
                    className={'btn btn-primary' + (this.props.profile.isLoading || !this.diff() ? ' disabled' : '')}
                    disabled={this.props.profile.isLoading || !this.diff()}
                    onClick={this.handleClickSubmitButton}
                    type='button'>
                    {t('button.update')}
                  </button>
                )}
              </form>
            ) : (
              <div className='memo'>
                {this.props.profile.memo}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state: any) {
  return {
    profile: state.profile
  };
}

function mapDispatch(dispatch: any) {
  return {
    getProfile() {
      dispatch(getProfile());
    },
    patchProfile(params: State) {
      dispatch(patchProfile(params));
    },
    setEditing(editing: boolean) {
      dispatch(setEditing(editing));
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MemoContainer));