import React from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';
import Navbar from '../component/navbar';
import HostCard from '../component/HostCard'
import GameCard from '../component/GameCard';
import CheckoutModal from '../component/CheckoutModal';

import { hostData, gameinfo } from '../gameData';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

export default class Host extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      games: [],
      checkoutVisible: false,
      currGame: null
    }

    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.username = localStorage.getItem('currentUser');
    this.checkoutModal = React.createRef();

    this.hostID = parseInt(props.match.params.id, 10);
    this.hd = hostData[this.hostID];
    this.hostGames = [];
    for (const [_, game] of Object.entries(gameinfo)) {
      if (game.hostid === this.hostID) {
        this.hostGames.push(game);
      }
    }
  }

  componentDidMount() {
    if (this.loggedIn) {
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: localStorage.getItem('currentUser') })
      };
      fetch('/getGames', requestOptions).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const ids = [];
            data.forEach((id) => {
              ids.push(parseInt(id, 10));
            });

            const games = [];
            for (const [_, game] of Object.entries(gameinfo)) {
              if (game.hostid === this.hostID) {
                const nobook = ids.includes(game.gameID);
                games.push(
                  <Row gutter={[16, 48]}>
                    <Col>
                      <GameCard gd={game} hd={this.hd} loggedIn={this.loggedIn} onBook={curr => this.startCheckout(curr)} nobook={nobook} />
                    </Col>
                  </Row>
                );
              }
            }
            this.setState({games: games});
          });
        } else {
          console.log(response);
        }
      });
    } else {
      const games = [];
      for (const [_, game] of Object.entries(gameinfo)) {
        if (game.hostid === this.hostID) {
          games.push(
            <Row gutter={[16, 48]}>
              <Col>
                <GameCard gd={game} hd={this.hd} loggedIn={this.loggedIn} onBook={curr => this.startCheckout(curr)} nobook={false} />
              </Col>
            </Row>
          );
        }
      }
      this.setState({games: games});
    }
  }

  startCheckout = game => {
    this.setState({ checkoutVisible: true, currGame: game }, () => {
      this.checkoutModal.current.showModal();
    })
  }

  render() {
    return (
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ width: '80%', margin: 'auto' }}>
          <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
            <Col span={7}>
              <HostCard hd={this.hd} />
            </Col>
            <Col span={15}>
              <Card>
                <Title style={{ textAlign: "left" }} level={3}>About Me</Title>
                <Paragraph align="start">
                  {this.hd.about.split("\n").map((item, i) => <p key={i}>{item}</p>)}
                </Paragraph>
              </Card>
              <Card style={{ marginTop: 24 }}>
                <Title style={{ textAlign: "left" }} level={3}>My Hosting Style</Title>
                <Paragraph align="start">
                  {this.hd.style}
                </Paragraph>
              </Card>
              <Card style={{ marginTop: 24 }}>
                <Title style={{ textAlign: "left" }} level={3}>Hosted Games</Title>
                {
                  this.state.games
                }
              </Card>
            </Col>
          </Row>
          <CheckoutModal ref={this.checkoutModal} game={this.state.currGame}></CheckoutModal>
        </Content>
        <Footer />
      </Layout >
    );
  }
}
