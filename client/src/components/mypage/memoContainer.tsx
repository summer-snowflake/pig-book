import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import EditAndCancel from 'components/common/editAndCancel';
import CancelUpdateModal from 'components/common/cancelUpdateModal';
import { getSettings, patchSettings, setEditing } from 'actions/settingsActions';

interface Props {
  getSettings: any,
  patchSettings: any,
  setEditing: any,
  settings: {
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
  constructor(props: i18nProps & Props, state: State) {
    super(props);

    this.state = {
      isOpenCancelModal: false,
      memo: ''
    }

    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)

    this.props.getSettings();
  }

  diff(): boolean {
    return this.props.settings.editing && this.state.memo !== this.props.settings.memo;
  }

  handleClickIcon() {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.setEditing(!this.props.settings.editing)
      this.setState({
        memo: this.props.settings.memo
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

  render() {
    const { t } = this.props;

    return (
      <div className='memo-component card'>
        <CancelUpdateModal
          isOpen={this.state.isOpenCancelModal}
          handleClickCancel={this.handleClickCancel}
          handleClickClose={this.handleClickClose} />
        <div className='card-body'>
          <span className='memo-title'>
            <i className='fas fa-book-open left-icon' />
            MEMO
          </span>
          <EditAndCancel editing={this.props.settings.editing} handleClickIcon={this.handleClickIcon} />
          {this.props.settings.memo}
        </div>
      </div>
    );
  }
}

function mapState(state: any) {
  return {
    settings: state.settings
  };
}

function mapDispatch(dispatch: any) {
  return {
    getSettings() {
      dispatch(getSettings());
    },
    patchSettings(params: State) {
      dispatch(patchSettings(params));
    },
    setEditing(editing: boolean) {
      dispatch(setEditing(editing));
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MemoContainer));