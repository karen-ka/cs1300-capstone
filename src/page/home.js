import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout, Button } from 'antd';
import background from '../img/dndwp.jpg'
import { Link } from 'react-router-dom';
import '../App.less';

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* <h1>StartPlaying.Games</h1>
            <br></br> */}
            <Link to="/search">
              <Button type='primary' style={{justifyContent: 'center'}}>Explore</Button>
            </Link>
        </div>
        {/* <div><Button type='primary'>Explore</Button></div> */}
      </Content>
      <Footer
        style={{
          height: '2vh',
          textAlign: 'center'
        }}>
        This is a Footer
      </Footer>
    </Layout>
  );
}

export default Home;
