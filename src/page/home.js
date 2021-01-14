import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout, Button, Typography } from 'antd';
import background from '../img/wp.jpg'
import { Link } from 'react-router-dom';
import '../App.less';
import '../Title.less';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header>
        <Navbar></Navbar>
      </Header>
      <Content>
        <div
          style={{
            backgroundImage: `url(${background})`,
            height: '90vh',
            backgroundSize: "cover",
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundSize: '100% 100%',
          }}>
          <div style={{ height: '90vh', backdropFilter: 'blur(1px)' }}>

            <div class="break"></div>
            <div class="Iam" >

              <p class="m-hero">StartPlaying.</p>
              <b>
                <div class="innerIam">
                  Games<br />
                Dungeons & Dragons<br />
                Magic: The Gathering<br />
                and more<br />
                Games
              </div>

                <div class="m-innerIam">
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
            <div class="m-subhero" style={{ textAlign: 'left', width: '80vw', margin: 'auto', backdropFilter: 'blur(2px)' }}>
              <Title class="m-subhero" level={2}>Begin your tabletop adventure today</Title>
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
