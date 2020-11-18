import React from 'react';
import Navbar from './component/navbar.js';
import Home from './page/home.js';
import About from './page/about.js';
import './App.css';
import { Checkbox, Button } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>

    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;