import React from 'react';
import Nav from './component/nav.js';
import Home from './page/home.js';
import About from './page/about.js';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;