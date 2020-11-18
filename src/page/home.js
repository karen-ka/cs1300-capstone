import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout } from 'antd';
import background from '../img/dndwp.jpg'
import '../App.css';

const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header
        style={{
          height: '5vh'
        }}>
          <Navbar></Navbar>
      </Header>
      {/* <Content><div style={{backgroundImage: `url('../img/dndwp.jpg'`}}></div></Content> */}
      <Content>
        <div 
          style={{
            backgroundImage: `url(${background})`, 
            height: '90vh', 
            backgroundSize: "cover",
          }}>
        </div>
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
