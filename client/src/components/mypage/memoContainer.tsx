import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

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

class MemoContainer extends Component<i18nProps & Props> {
  constructor(props: i18nProps & Props) {
    super(props);

    this.setState({
      isOpenCancelModal: false,
      memo: '',
    })

    this.props.getSettings();
  }

  render() {
    const { t } = this.props;

    return (
      <div className='memo-component card'>
        <div className='card-body'>
          <span className='memo-title'>
            <i className='fas fa-book-open left-icon' />
            MEMO
          </span>
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