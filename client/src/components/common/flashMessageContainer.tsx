import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'stylesheets/message.sass';

import { setFlashMessageStyleClass } from 'actions/flashMessageActions';

interface Props {
  setFlashMessageStyleClass: any,
  flashMessage: {
    id: number,
    message: string,
    messageType: string,
  }
}

class FlashMessageContainer extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.flashMessage.message != prevProps.flashMessage.message) {
      setTimeout(() => {
        console.log('a');
        //this.props.setFlashMessageStyleClass();
      }, 2000)
    }
  }

  render() {
    return (
      <div id={'id-' + this.props.flashMessage.id} className='flash-message-component'>
        {this.props.flashMessage.message && (
          <div id={'id-' + this.props.flashMessage.id} className={'alert alert-' + this.props.flashMessage.messageType}>
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
  return {
    setFlashMessageStyleClass() {
      dispatch(setFlashMessageStyleClass());
    }
  }
}


export default connect(mapState, mapDispatch)(FlashMessageContainer);
