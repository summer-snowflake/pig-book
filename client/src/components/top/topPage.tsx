import React, { Component} from 'react';

class TopPage extends Component {
  render() {
    return (
      <div className='top-page-component'>
        

          <div>
            <a className="btn btn-primary collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Link</a>
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                aria-expanded="true" role='link' aria-controls="collapseExample">Button</button>
            <div className="collapse" id="collapseExample" aria-expanded="false" role="link">
                <p>
                    はろーはろーはろーはろーはろーはろーはろーはろーはろーはろー
                </p>
            </div>
          </div>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.27/bootstrap-native-v4.min.js"></script>


        welcome</div>
    );
  }
}

export default TopPage
