import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout, Button } from 'antd';
import background from '../img/wp.jpg'
import { Link } from 'react-router-dom';
import '../App.less';
import '../Title.less';

const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header>
        <Navbar></Navbar>
      </Header>
      {/* <Content><div style={{backgroundImage: `url('../img/dndwp.jpg'`}}></div></Content> */}
      <Content>
        <div
          style={{
            // filter: 'brightness(50%)',
            backgroundImage: `url(${background})`,
            height: '93vh',
            backgroundSize: "cover",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundSize: '100% 100%',
          }}>
          {/* <h1>StartPlaying.Games</h1>
            <br></br> */}
          <div class="break"></div>
          <div class="break"></div>
          <div class="Iam" style={{ display: 'flex' }}>

            <p>StartPlaying.</p>
            <b>
              <div class="innerIam">
                Games<br />
                Dungeons & Dragons<br />
                Magic: The Gathering<br />
                and more<br />
                Games
              </div>
            </b>

          </div>
          <div class="break"></div>
          <div display="flex">
            <Link to="/search">
              <Button type='primary' size={'large'} style={{ justifyContent: 'center' }}>Explore</Button>
            </Link>
          </div>

        </div>
        {/* <div><Button type='primary'>Explore</Button></div> */}
      </Content>
    </Layout >
  );
}

export default Home;
