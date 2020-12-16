import React from 'react';
import '../App.css';
import GameCard from './GameCard';
import {gameinfo, hostData} from '../gameData.js'
import Navbar from './navbar.js';
import { Row, Col, Layout } from 'antd';
import CheckoutModal from './CheckoutModal'
import FilterBar from './FilterBar'
const { Header, Footer, Sider, Content } = Layout;


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleGames : [],
      checkoutVisible: false,
      currGame: null,
    };
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.checkoutModal = React.createRef();
  }

  componentDidMount() {
    if (this.loggedIn) {
      // if no user logged in, set username to "admin" which will show all games.
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:  localStorage.getItem('currentUser')})
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
    } else {
      this.setState({
        possibleGames: Object.keys(gameinfo)
      });
    }

  }

  startCheckout = game => {
    console.log('hihihi')
    this.setState({checkoutVisible: true, currGame: game});
    this.checkoutModal.current.showModal();
  }

  createCards = item => {
    return (
      <Row gutter={[16, 48]} align='middle' width='100%' justify='center'>
        <Col>
        <GameCard gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn} onBook={game => this.startCheckout(game)}/>
        </Col>
      </Row>
    );
  };

  render() {
      return (
        <Layout>
            <Header>
                <Navbar></Navbar>
            </Header>
            <Content>
            <FilterBar></FilterBar>
              <CheckoutModal ref={this.checkoutModal} game={this.state.currGame}></CheckoutModal>
            <div>
              <div style={{textAlign: 'left', width: '50%', margin: 'auto', padding: '3vh 0 3vh 0'}}> 
              <h1>Find the best game for your needs.</h1>
          <p>
          We’ve got you covered. Whether you’re new or a pro, choose from a game hosted by one of our experienced Dungeons & Dragons hosts! On StartPlaying.Games, you’ll find the perfect game that fits your playing style.
          </p>
              </div>
          {
                this.state.possibleGames.map(this.createCards)
          }
        </div>
            </Content>
        </Layout>
      );
  }
}
