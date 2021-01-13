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
      {/* <Content><div style={{backgroundImage: `url('../img/dndwp.jpg'`}}></div></Content> */}
      <Content>
        <div
          style={{
            // filter: 'brightness(50%)',
            backgroundImage: `url(${background})`,
            height: '90vh',
            backgroundSize: "cover",
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundSize: '100% 100%',
            // backdropFilter: 'blur(2px)',
          }}>
          <div style={{ height: '90vh', backdropFilter: 'blur(1px)' }}>


            {/* <h1>StartPlaying.Games</h1>
            <br></br> */}
            <div class="break"></div>
            <div class="break"></div>
            <div class="Iam" style={{ paddingLeft: 'none', display: 'flex', paddingTop: '30vh', width: '80vw', margin: 'auto' }}>

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
            {/* <div class="break"></div> */}
            <div style={{ textAlign: 'left', width: '80vw', margin: 'auto', marginBottom: '10vh', backdropFilter: 'blur(2px)' }}>
              <Title level={2}>Begin your tabletop adventure today</Title>
            </div>
            <div display="flex">
              <Link to="/search">
                <Button type='primary' size={'large'} style={{ justifyContent: 'center', width: '100px' }}>Explore</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* <div><Button type='primary'>Explore</Button></div> */}
      </Content>
    </Layout >
  );
}

export default Home;
