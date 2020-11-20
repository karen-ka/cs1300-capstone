import React from 'react';
import '../App.css';
import GameCard from '../component/GameCard';
import {gameinfo, hostData} from '../gameData.js'
import Navbar from '../component/navbar.js';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleGames : [],
    };
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
  }

  componentDidMount() {
    // if no user logged in, set username to "admin" which will show all games.
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username:  this.loggedIn ? localStorage.getItem('currentUser') : "admin"})
    };
    fetch('/getGames', requestOptions)
    .then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
              this.setState({
                possibleGames: Object.keys(gameinfo).filter((key,index) => 
                    data.includes(parseInt(key)) == false
                )
              });
            });
        } else {
            console.log(response);
        };
    });
  }

  createCards = item => {
    return (
        <GameCard gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn}/>
    );
  };

  render() {
      return (
        <Layout>
            <Header>
                <Navbar></Navbar>
            </Header>
            <Content>
            <div>
          <h1>This is the search page.</h1>
          {
            this.state.possibleGames.map(this.createCards)
          }
        </div>
            </Content>
        </Layout>
      );
  }
}
