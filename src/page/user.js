import React from 'react';
import '../App.less';
import { Space, Layout, Row, Col, Card, Typography, Button, Statistic } from 'antd';
import Navbar from '../component/navbar.js';
import GameCard from '../component/GameCard';
import { gameinfo, hostData } from '../gameData.js'
import CheckoutModal from '../component/CheckoutModal';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      registeredGames: [],
      checkoutVisible: false,
      currGame: null,
      suggestions: []
    };
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.username = localStorage.getItem('currentUser');
    this.checkoutModal = React.createRef();
  }

  componentDidMount() {
    if (this.loggedIn) {
      // if no user logged in, set username to "admin" which will show all games.
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localStorage.getItem('currentUser') })
      };
      fetch('/getGames', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              // get random games to suggest to user from games that are left
              let suggestions = Object.keys(gameinfo).filter((key, index) =>
                  data.includes(parseInt(key)) == false
              );
              if (suggestions.length > 0) {
                suggestions = suggestions.sort(() => .5 - Math.random()).slice(0, Math.min((suggestions.length, 2)));
              }
              
              this.setState({
                registeredGames: Object.keys(gameinfo).filter((key, index) =>
                  data.includes(parseInt(key)) == true
                ),
                suggestions: suggestions
              });
            });
          } else {
            console.log(response);
          };
        });
    }
  }

  startCheckout = game => {
    this.setState({ checkoutVisible: true, currGame: game });
    this.checkoutModal.current.showModal();
  }

  createCards = item => {
    return (
      <Row gutter={[16, 48]}>
        <Col>
          <GameCard simple={true} gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn} onBook={game => this.startCheckout(game)} />
        </Col>
      </Row>
    );
  };

  createSuggestions = item => {
    return (
      <Row gutter={[16, 48]}>
        <Col>
          <GameCard gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn} onBook={game => this.startCheckout(game)} />
        </Col>
      </Row>
    );
  };

  render() {
    console.log(this.state.registeredGames.length, this.state.registeredGames)
    return (
      <div>
        <Layout>
          <Header>
            <Navbar />
          </Header>
          <Content style={{ float: 'center', width: '70%', marginTop: '10vh', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <Text style={{ fontSize: '2em', marginTop: '200px', marginBottom: '20vh' }}>Welcome back, <b>{this.username}</b>!</Text>
            <br />
            <br />
            <br />
            <br />
            {this.state.registeredGames.length > 0 ? (<>
              <Text style={{ fontSize: '1.5em' }}>Your Upcoming Games</Text>
              <br />
              <br />
              {this.state.registeredGames.map(this.createCards)} </>)
              :
              <></>}
            <br />
            <br />
            <br />
            {/* TODO: make another game card ver for this page ... */}
            <CheckoutModal ref={this.checkoutModal} game={this.state.currGame}></CheckoutModal>
            {this.state.suggestions.length > 0 ? (<>
              <Text style={{ fontSize: '1.5em' }}>Suggested Games</Text>
              <br />
              <br />
              {this.state.suggestions.map(this.createSuggestions)} </>)
              :
            <></>}
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}
