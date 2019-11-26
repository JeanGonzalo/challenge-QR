import React, { Fragment } from 'react';
import Home from './components/pages/Home'
import Header from './components/appbar/Header'
import { BrowserRouter as Router, Route, link } from "react-router-dom";


function App() {
  return (
    <Fragment>
      <Router>
        <Route exact path="/" exact component={Home} />
      </Router>
    </Fragment>

  );
}


export default App;