import React from 'react';
import '../App.less';
import { Space, Layout, Row, Col, Card, Typography, Button, Statistic } from 'antd';
import Navbar from '../component/navbar.js';
import GameCard from '../component/GameCard';
import { gameinfo, hostData } from '../gameData.js'
const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      registeredGames: []
    };
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.username = localStorage.getItem('currentUser');
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
              this.setState({
                registeredGames: Object.keys(gameinfo).filter((key, index) =>
                  data.includes(parseInt(key)) == true
                ),
              });
            });
          } else {
            console.log(response);
          };
        });
    }
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

  render() {
    console.log(this.state.registeredGames.length, this.state.registeredGames)
    return (
      <div>
        <Layout>
          <Header>
            <Navbar />
          </Header>
          <Content style={{ float: 'center', width: '70%', marginTop: '10vh', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <Text style={{ fontSize: '2em', marginTop: '200px', marginBottom: '100px' }}>Welcome back, <b>{this.username}</b>!</Text>
            <br /> {/* idk how to make this better lol sorry its for the vertical spacing */}
            <br />
            <br />
            <br />
            {this.state.registeredGames.length > 0 ? (<>
              <Text style={{ fontSize: '1.5em' }}>Your Upcoming Games</Text>
              <br />
              <br />
              {this.state.registeredGames.map(this.createCards)} </>)
              :
              'bye'}
            <br />
            <br />
            <br />
            {/* TODO: make another game card ver for this page ... */}

            <Text style={{ fontSize: '1.5em' }}>Suggested Games</Text>


          </Content>
        </Layout>
      </div>
    );
  }
}
