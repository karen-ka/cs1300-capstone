import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout, Button, Typography } from 'antd';
import background from '../img/wp.jpg';
import background2 from '../img/wp2.jpeg';
import { Link } from 'react-router-dom';
// import '../App.less';
import '../Title.less';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header style={{ color: 'transparent' }}>
        <Navbar></Navbar>
      </Header>
      <Content style={{ height: '100%' }}>
        <div
          className="home-background"
          style={{
            backgroundImage: `url(${background2})`,
            height: '100%',
            // backgroundSize: "cover",
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundSize: '100% 100%',
          }}>
          <div style={{ height: '92vh', backdropFilter: 'blur(1px)' }}>

            <div className="break"></div>
            <div className="Iam" >

              <p className="m-hero">StartPlaying.</p>
              <b>
                <div className="innerIam">
                  Games<br />
                Dungeons & Dragons<br />
                Magic: The Gathering<br />
                and more<br />
                Games
              </div>

                <div className="m-innerIam">
                  Games<br />
                </div>

                {/* <div class="innerIam">
                  <Title style={{ margin: '0' }} level={2}>Games</Title>
                  <Title style={{ margin: '0' }} level={2}>Dungeons & Dragons</Title>
                  <Title style={{ margin: '0' }} level={2}>Games</Title>
                  <Title style={{ margin: '0' }} level={2}>and more</Title>
                  <Title style={{ margin: '0' }} level={2}>Games</Title>
                </div> */}
              </b>

            </div>
            <div className="m-subhero-container">
              <h2 className="m-subhero" style={{ color: 'white !important', fontSize: '30px' }}>Begin your tabletop adventure today</h2>
            </div>
            <div display="flex" style={{ marginTop: '10vh' }}>
              <Link to="/search">
                <Button type='primary' size={'large'} style={{ justifyContent: 'center', width: '100px' }}>Explore</Button>
              </Link>
            </div>
          </div>
        </div>
      </Content>
    </Layout >
  );
}

export default Home;
