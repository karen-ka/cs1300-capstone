import React from 'react';
import Navbar from '../component/navbar.js';
import { Layout } from 'antd';
import '../App.css';

const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header><Navbar></Navbar></Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default Home;