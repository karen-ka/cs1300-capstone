import React from 'react';
import { Layout, Row, Col, Card, Typography, Button, Statistic, } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx';
import LoginModal from '../component/loginModal';
import CheckoutModal from '../component/CheckoutModal';

import { gameinfo, hostData } from '../gameData';

const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer } = Layout;

export default class Game extends React.Component {
  constructor (props) {
    super(props);
    this.gameID = props.match.params.id;
    this.gd = gameinfo[this.gameID];
    this.hd = hostData[this.gd.hostid];
    this.checkoutModal = React.createRef();
    this.loginModal = React.createRef();
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.state = {
      booked: false,
      text: "Book Now"
    };
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
              if (data.includes(parseInt(this.gameID))) {
                this.setState({
                  booked: true,
                  text: "Already Booked"
                });
                console.log('haha');
              }
            });
          } else {
            console.log(response);
          };
        });
    }
  }

  handleClick = () => {
    if (this.loggedIn) {
      this.checkoutModal.current.showModal();
    } else {
      this.loginModal.current.showModal();
    }
  }

  render() {
    const gd = this.gd;
    const hd = this.hd;
    return (
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ width: '80%', margin: 'auto' }}>
          <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
            <Col span={15}>
              <Card
                cover={<img src={gd.logo} width={600} />}>
                <Title style={{ textAlign: 'left', width: '80%', margin: 'auto' }} level={3}>{gd.name}</Title>
                <br></br>
                <Paragraph style={{ textAlign: 'left', width: '80%', margin: 'auto' }}>{gd.info.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>
                <br></br>
                <Row justify="space-around">
                  <Col span={6}>
                    <Statistic title="Price" value={gd.price} prefix={'USD'} />
                    <Statistic title="Day" value={gd.day} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Location" value={gd.location} />
                    <Statistic title="Time" value={gd.time} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={7}>
              <Card style={{ marginBottom: 24, minWidth: '250px' }}>
                <Title align="start" level={3}>Reserve Your Seat</Title>
                <Paragraph align="start">
                  {/* Price:
                  <br/> */}
                  {`USD ${gd.price} / player`}
                </Paragraph>
                <LoginModal ref={this.loginModal}></LoginModal>
                <CheckoutModal ref={this.checkoutModal} game={this.gd}></CheckoutModal>

                <Button align="center" onClick={this.handleClick} type="primary" disabled={this.state.booked}>{this.state.text}</Button>
              </Card>
              <HostCard hd={hd} onGameDetailPage={true} />
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
