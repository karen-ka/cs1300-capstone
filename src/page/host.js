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
                  <Row gutter={[16, 48]} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Col style={{ margin: 'auto' }}>
                      <GameCard onHostPage={true} gd={game} hd={this.hd} loggedIn={this.loggedIn} onBook={curr => this.startCheckout(curr)} nobook={nobook} />
                    </Col>
                  </Row>
                );
              }
            }
            this.setState({ games: games });
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
            <Row gutter={[16, 48]} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Col style={{ alignSelf: 'center', width: '98%' }}>
                <GameCard onHostPage={true} gd={game} hd={this.hd} loggedIn={this.loggedIn} onBook={curr => this.startCheckout(curr)} nobook={false} />
              </Col>
            </Row>
          );
        }
      }
      this.setState({ games: games });
    }

    // idk if will this cause problems, delet this if anything weird is happening
    // original problem: clicking 'learn more' on host search page would redirect to the middle of host detail page
    window.scrollTo(0, 0);
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
        <div className="hide-on-ipad">

          <Content className="m-user-content">

            <Row gutter={[16, 48]} justify="center" style={{ marginTop: 36 }}>
              <Col span={8}>
                <HostCard loggedIn={this.loggedIn} hd={this.hd} />
              </Col>
              <Col span={16}>
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
            <CheckoutModal ref={this.checkoutModal} game={this.state.currGame} hd={this.hd}></CheckoutModal>
          </Content>
        </div>

        <div className="show-on-ipad hide-on-mobile">

          <Content style={{ width: '90%', margin: 'auto' }}>

            <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
              <Col span={14}>
                <HostCard loggedIn={this.loggedIn} hd={this.hd} />
              </Col>
              <Col span={10} >
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

              </Col>

              <Col span={24}>
                <Card style={{ marginTop: 24 }}>
                  <Title style={{ textAlign: "left" }} level={3}>Hosted Games</Title>
                  {
                    this.state.games
                  }
                </Card>
              </Col>
            </Row>
            <CheckoutModal ref={this.checkoutModal} game={this.state.currGame} hd={this.hd}></CheckoutModal>
          </Content>
        </div>

        <div className="show-on-mobile">

          <Content style={{ width: '90%', margin: 'auto' }}>

            <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
              <Col span={24}>
                <HostCard loggedIn={this.loggedIn} hd={this.hd} />
              </Col>
              <Col span={24} style={{ marginTop: 24 }}>
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

              </Col>

              <Col span={24}>
                <Card style={{ marginTop: 24 }}>
                  <Title style={{ textAlign: "left" }} level={3}>Hosted Games</Title>
                  {
                    this.state.games
                  }
                </Card>
              </Col>
            </Row>
            <CheckoutModal ref={this.checkoutModal} game={this.state.currGame} hd={this.hd}></CheckoutModal>
          </Content>
        </div>

        <Footer />
      </Layout >
    );
  }
}
