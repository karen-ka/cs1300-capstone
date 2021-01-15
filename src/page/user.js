import React from 'react';
import '../App.less';
import { Space, Layout, Row, Col, Card, Typography, Button, Statistic, Alert } from 'antd';
import Navbar from '../component/navbar.js';
import GameCard from '../component/GameCard';
import { gameinfo, hostData } from '../gameData.js'
import CheckoutModal from '../component/CheckoutModal';
import ThemeSwitch from '../component/ThemeSwitch';
import LoginForm from '../component/LoginForm';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      registeredGames: [],
      checkoutVisible: false,
      currGame: null,
      hd: null,
      suggestions: [],
      loading: false,
      profileRedirect: false,
      modalText: <></>,
    };
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.username = localStorage.getItem('currentUser');
    this.checkoutModal = React.createRef();
    this.loginModal = React.createRef();
    this.loginForm = React.createRef();
  }

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.fromLogin) {
        window.history.replaceState(null, '')
        window.location.reload();
      }
    }
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
    this.setState({ checkoutVisible: true, currGame: game, hd: hostData[game.hostid] });
    this.checkoutModal.current.showModal();
  }

  startLogin = () => {
    this.loginModal.current.showModal();
  }

  createCards = item => {
    return (
      <Row gutter={[16, 48]}>
        <Col>
          <GameCard onUserPage={true} gd={gameinfo[item]} hd={hostData[gameinfo[item].hostid]} loggedIn={this.loggedIn} onBook={game => this.startCheckout(game)} />
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

  handleOk = () => {
    this.setState({ loading: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleError = () => {
    setTimeout(() => {
      this.setState({
        modalText: <>< Alert
          style={{ width: '70%', margin: 'auto' }}
          message="Incorrect email or password"
          // description="Please go to login page or try again with a different username."
          type="error"
          showIcon
        /><br /></>,
        // modalText: "Username/Password doesn't match or doesn't exist. Please try again or sign up for an account.",
        visible: true,
        loading: false
      });
      this.loginForm.current.unsetLoading();
    }, 3000);
  };

  handleSuccess = (username) => {
    setTimeout(() => {
      this.setState({
        // modalText: "Success! Logging you in!",
        visible: true,
        loading: false
      });
      this.loginForm.current.unsetLoading();
    }, 2000);
    // redirect to user page after a few seconds
    setTimeout(() => {
      localStorage.setItem('currentUser', username);
      // this means that if the user is in the search page or the game page, reload the page (there's weird router issues otherwise)
      if (document.location.pathname === '/search' || document.location.pathname.includes("/game")) {
        window.location.reload();
      } else {
        this.setState({
          profileRedirect: true
        })
      }
    }, 3000);
  };

  render() {
    if (this.state.profileRedirect) {
      window.location.reload();
    };
    return (
      // <div>
      <Layout style={{ minHeight: '100%', }}>
        <Header>
          <Navbar />
        </Header>
        {this.loggedIn ?
          <>
            <Content className="m-user-content">
              <div className="m-user-heading">
                <Text style={{ fontSize: '2em', marginTop: '200px', marginBottom: '20vh' }}>Welcome back, <b>{this.username}</b>!</Text>

                <div className="hide-on-mobile" style={{ float: 'right', paddingTop: '1vh', }}>
                  <ThemeSwitch></ThemeSwitch>

                </div>
              </div>
              <br />

              {this.state.registeredGames.length > 0 ? (<>
                <div className="m-user-heading">
                  <Text style={{ fontSize: '1.5em', }}>Your Upcoming Games</Text>
                </div>
                <br />
                <br />
                {this.state.registeredGames.map(this.createCards)} </>)
                :
                <></>}
              <br />
              <CheckoutModal ref={this.checkoutModal} game={this.state.currGame} hd={this.state.hd}></CheckoutModal>
              {this.state.suggestions.length > 0 ? (<>
                <div className="m-user-heading">
                  <Text style={{ fontSize: '1.5em' }}>Suggested Games</Text>
                </div>
                <br />
                <br />
                {this.state.suggestions.map(this.createSuggestions)} </>)
                :
                <></>}
            </Content>

          </>
          :
          <>
            <Content style={{ float: 'center', minHeight: '55vh', width: '30%', marginTop: '30vh', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
              {this.state.modalText}
              <LoginForm id="submit-form" ref={this.loginForm} handleOk={this.handleOk} handleSuccess={this.handleSuccess} handleError={this.handleError}></LoginForm>
            </Content>
          </>
        }

        <Footer />
      </Layout>
      // </div>
    );
  }
}

export default withRouter(Search);