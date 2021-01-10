import React from 'react';
import '../App.less';
import GameCard from './GameCard';
import { gameinfo, hostData } from '../gameData.js'
import Navbar from './navbar.js';
import { Row, Col, Layout, Typography, Spin, Alert } from 'antd';
import CheckoutModal from './CheckoutModal'
import FilterBar from './FilterBar'
import { LoadingOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;


/**
 * Why is this a component? I forgot why...
 */
export default class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      possibleGames: [],
      checkoutVisible: false,
      currGame: null,
      hd: null,
      priceFilter: "All Prices",
      gameFilter: "All Games",
      filteredPossibleGames: [],
      loading: true,
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
        body: JSON.stringify({ username: localStorage.getItem('currentUser') })
      };
      fetch('/getGames', requestOptions)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              this.setState({
                possibleGames: Object.keys(gameinfo).filter((key, index) =>
                  data.includes(parseInt(key)) == false
                ),
                filteredPossibleGames: Object.keys(gameinfo).filter((key, index) =>
                  data.includes(parseInt(key)) == false
                ),
                loading: false,
              });
            });
          } else {
            console.log(response);
          };
        });
    } else {
      this.setState({
        possibleGames: Object.keys(gameinfo),
        filteredPossibleGames: Object.keys(gameinfo),
        loading: false,
      });
    }
  }

  startCheckout = game => {
    console.log('hihihi')
    this.setState({ checkoutVisible: true, currGame: game, hd: hostData[game.hostid] });
    this.checkoutModal.current.showModal();
  }

  createCards = item => {
    return (
      <Row gutter={[16, 48]} align='middle' width='100%' justify='center'>
        <Col>
          <GameCard gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn} onBook={game => this.startCheckout(game)} />
        </Col>
      </Row>
    );
  };

  handlePriceFilter = (value) => {
    this.setState({
      priceFilter: value
    }, this.handleFilter);
  }

  handleGameFilter = (value) => {
    this.setState({
      gameFilter: value
    }, this.handleFilter);
  }

  handleFilter = () => {
    let possibleGames = this.state.possibleGames;
    if (this.state.priceFilter != "All Prices") {
      possibleGames = possibleGames.filter(item =>
        gameinfo[item].price < parseInt(this.state.priceFilter)
      );
    };
    if (this.state.gameFilter != "All Games") {
      possibleGames = possibleGames.filter(item =>
        gameinfo[item].gametype == this.state.gameFilter
      );
    };
    this.setState({
      filteredPossibleGames: possibleGames
    });
  }

  render() {
    return (
      <Layout>
        <Header>
          <Navbar></Navbar>
        </Header>
        <Content>
          <FilterBar page="Games" handleGameFilter={this.handleGameFilter} handlePriceFilter={this.handlePriceFilter} />
          <CheckoutModal ref={this.checkoutModal} game={this.state.currGame} hd={this.state.hd}></CheckoutModal>
          <div >
            <div style={{ textAlign: 'left', width: '50%', margin: 'auto', padding: '3vh 0 3vh 0', minWidth: '400px' }}>
              <h1>Find the best game for your needs.</h1>
              <p>
                We’ve got you covered. Whether you’re new or a pro, choose from a game hosted by one of our experienced game hosts! On StartPlaying.Games, you’ll find the perfect game that fits your playing style.
          </p>
            </div>
            {
              this.state.loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : <> </>
            }
            {
              (this.state.filteredPossibleGames.length > 0 && !this.state.loading) ?
                this.state.filteredPossibleGames.map(this.createCards) :
                <></>
            }
            {
              (this.state.filteredPossibleGames.length == 0 && !this.state.loading) ?
                <Row gutter={[16, 48]} align='middle' width='100%' justify='center'>
                  <Col>
                    <Alert style={{ textAlign: 'left' }} message="No Games Left" description="Please come back later to see if there's more games being hosted!" type="info" showIcon />
                  </Col>
                </Row> : <></>
            }
          </div>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
