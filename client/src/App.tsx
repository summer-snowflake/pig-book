import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from 'components/header';
import TopPage from 'components/topPage';
import Footer from 'components/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route path='/' exact component={TopPage} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
