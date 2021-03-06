import React from 'react';
import { Layout, Row, Col, Card, Typography, Button, Statistic, Alert } from 'antd';
import Navbar from '../component/navbar.js';
import HostCard from '../component/HostCard.jsx';
import LoginModal from '../component/loginModal';
import CheckoutModal from '../component/CheckoutModal';
import CarouselArrows from '../component/CarouselArrows';
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
    window.scrollTo(0, 0);
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
    const loginMsg = (<Alert
      message="Log In required to book games"
      type="info"
      showIcon
    />);

    return (
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <div className="hide-on-ipad">
          <Content className="m-content">
            <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
              <Col span={16}>
                <Card
                  style={{ minWidth: '200px' }}
                  cover={<img src={gd.logo} />}>
                  <Title style={{ textAlign: 'left', width: '80%', margin: 'auto' }} level={3}>{gd.name}</Title>
                  <br></br>
                  <Paragraph style={{ textAlign: 'left', width: '80%', margin: 'auto' }}>{gd.info.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>
                  <br></br>

                </Card>
                <br />

                <Card
                  style={{ minWidth: '200px' }}
                >

                  <div style={{ width: '80%', margin: 'auto' }}>
                    <CarouselArrows style={{ width: '90%', margin: 'auto', height: '30vh' }} gd={gd} gallery={gd.gallery}></CarouselArrows>

                  </div>

                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ marginBottom: 24, minWidth: '250px' }}>
                  <Title align="start" level={3}>Reserve Your Seat</Title>
                  <Row justify="space-around">
                    <Col span={6}>
                      <Statistic title="Price" value={gd.price} prefix={'USD'} />
                      <Statistic title="Day" value={gd.day} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="Platform" value={gd.location} />
                      <Statistic title="Time" value={`${gd.time}pm`} />
                    </Col>
                  </Row>
                  <br />

                  <LoginModal msg={loginMsg} ref={this.loginModal}></LoginModal>
                  <CheckoutModal ref={this.checkoutModal} game={this.gd} hd={this.hd}></CheckoutModal>

                  <Button style={{ width: '100%' }} align="center" onClick={this.handleClick} type="primary" disabled={this.state.booked}>{this.state.text}</Button>
                </Card>
                <HostCard loggedIn={this.loggedIn} hd={hd} onGameDetailPage={true} />
              </Col>
            </Row>
          </Content>
        </div>

        <div className="show-on-ipad hide-on-mobile">
          <Content style={{ width: '90%', }}>
            <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
              <Col span={15}>
                <Card
                  // style={{ minWidth: '400px' }}
                  cover={<img src={gd.logo} width={600} />}>
                  <Title style={{ textAlign: 'left', width: '80%', margin: 'auto' }} level={3}>{gd.name}</Title>
                  <br></br>
                  <Paragraph style={{ textAlign: 'left', width: '80%', margin: 'auto' }}>{gd.info.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>
                  <br></br>

                </Card>
                <br />

                <Card
                  style={{ minWidth: '400px' }}
                >

                  <div style={{ width: '80%', margin: 'auto' }}>
                    <CarouselArrows style={{ width: '90%', margin: 'auto', height: '30vh' }} gd={gd} gallery={gd.gallery}></CarouselArrows>

                  </div>

                </Card>
              </Col>
              <Col span={7}>
                <Card style={{ marginBottom: 24, minWidth: '250px' }}>
                  <Title align="start" level={3}>Reserve Your Seat</Title>
                  <Row justify="space-around">
                    <Col span={6}>
                      <Statistic title="Price" value={gd.price} prefix={'USD'} />
                      <Statistic title="Day" value={gd.day} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="Platform" value={gd.location} />
                      <Statistic title="Time" value={`${gd.time}pm`} />
                    </Col>
                  </Row>
                  <br />

                  <LoginModal msg={loginMsg} ref={this.loginModal}></LoginModal>
                  <CheckoutModal ref={this.checkoutModal} game={this.gd} hd={this.hd}></CheckoutModal>

                  <Button style={{ width: '100%' }} align="center" onClick={this.handleClick} type="primary" disabled={this.state.booked}>{this.state.text}</Button>
                </Card>
                <HostCard loggedIn={this.loggedIn} hd={hd} onGameDetailPage={true} />
              </Col>
            </Row>
          </Content>

        </div>

        <div className="show-on-mobile">
          <Content style={{ width: '90%', margin: 'auto' }}>
            <Row gutter={24} justify="center" style={{ marginTop: 36 }}>
              <Col span={24}>

                <Card style={{ marginBottom: 24, minWidth: '250px' }}>
                  <Title align="start" level={3}>Reserve Your Seat</Title>
                  <Row justify="space-around">
                    <Col span={6}>
                      <Statistic title="Price" value={gd.price} prefix={'USD'} />
                      <Statistic title="Day" value={gd.day} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="Platform" value={gd.location} />
                      <Statistic title="Time" value={`${gd.time}pm`} />
                    </Col>
                  </Row>
                  <br />

                  <LoginModal msg={loginMsg} ref={this.loginModal}></LoginModal>
                  <CheckoutModal ref={this.checkoutModal} game={this.gd} hd={this.hd}></CheckoutModal>

                  <Button style={{ width: '100%' }} align="center" onClick={this.handleClick} type="primary" disabled={this.state.booked}>{this.state.text}</Button>
                </Card>

                <Card
                  // style={{ minWidth: '400px' }}
                  cover={<img src={gd.logo} width={600} />}>
                  <Title style={{ textAlign: 'left', width: '80%', margin: 'auto' }} level={3}>{gd.name}</Title>
                  <br></br>
                  <Paragraph style={{ textAlign: 'left', width: '80%', margin: 'auto' }}>{gd.info.split("\n").map((item, i) => <p key={i}>{item}</p>)}</Paragraph>
                  <br></br>

                </Card>
                <br />

                <Card style={{ marginBottom: '24px' }}
                >

                  <div style={{ width: '80%', margin: 'auto', }}>
                    <CarouselArrows style={{ margin: 'auto', }} gd={gd} gallery={gd.gallery}></CarouselArrows>

                  </div>

                </Card>
              </Col>
              <Col span={24}>
                {/* <Card style={{ marginBottom: 24, minWidth: '250px' }}>
                  <Title align="start" level={3}>Reserve Your Seat</Title>
                  <Row justify="space-around">
                    <Col span={6}>
                      <Statistic title="Price" value={gd.price} prefix={'USD'} />
                      <Statistic title="Day" value={gd.day} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="Platform" value={gd.location} />
                      <Statistic title="Time" value={`${gd.time}pm`} />
                    </Col>
                  </Row>
                  <br />

                  <LoginModal msg={loginMsg} ref={this.loginModal}></LoginModal>
                  <CheckoutModal ref={this.checkoutModal} game={this.gd}></CheckoutModal>

                  <Button style={{ width: '100%' }} align="center" onClick={this.handleClick} type="primary" disabled={this.state.booked}>{this.state.text}</Button>
                </Card> */}
                <HostCard loggedIn={this.loggedIn} hd={hd} onGameDetailPage={true} />
              </Col>
            </Row>
          </Content>

        </div>
        <Footer />
      </Layout>
    );
  }
}
