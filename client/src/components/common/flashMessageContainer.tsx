import React, { Component } from 'react';

import 'stylesheets/message.sass';
import { connect } from 'react-redux';

interface Props {
  flashMessage: {
    message: string,
    messageType: string
  }
}

class FlashMessageContainer extends Component<Props> {
  render() {
    return (
      <div className='flash-message-component'>
        {this.props.flashMessage.message && (
          <div className={'alert alert-' + this.props.flashMessage.messageType}>
            <i className='fas fa-check-circle left-icon' />
            {this.props.flashMessage.message}
          </div>
        )}
     </div>
    );
  }
}

function mapState(state: any) {
  return {
    flashMessage: state.flashMessage
  };
}

function mapDispatch(dispatch: any) {
  return {}
}


export default connect(mapState, mapDispatch)(FlashMessageContainer);
