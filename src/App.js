import React from 'react';
import Navbar from './component/navbar.js';
import Home from './page/home.js';
import About from './page/about.js';
import Search from './component/SearchPage.js';
import GameDetail from './component/GameDetailPage.jsx'
import User from './page/user.js';
import RegisterModal from './component/registerModal.jsx';

import './App.less';
import { Checkbox, Button } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            <Route path="/gamedetail" component={GameDetail}/>
            <Route path="/user" component={User}/>
            <Route path="/register" component={RegisterModal}/>
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;