import React from 'react';
import Home from './page/home.js';
import About from './page/about.js';
import Search from './component/SearchPage.js';
import HostSearch from './page/hostsearch.js';
import User from './page/user.js';
import Host from './page/host.js';
import Game from './page/game.js';
import RegisterModal from './component/registerModal.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.less';

class App extends React.Component {
  constructor() {
    super();
    // here for testing purposes
    // localStorage.clear("currentUser");
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/search" component={Search}/>
              <Route path="/hostsearch" component={HostSearch}/>
              <Route path="/user" component={User}/>
              <Route path="/register" component={RegisterModal}/>
              <Route path="/game/:id" component={Game}/>
              <Route path="/host/:id" component={Host}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
