import React from 'react';
import '../App.css';
import GameCard from '../component/GameCard';
import {gameinfo, hostData} from '../gameData.js'
import Navbar from '../component/navbar.js';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


function Search() {
  return (
    <Layout>
        <Header>
            <Navbar></Navbar>
        </Header>
        <Content>
        <div>
      <h1>This will be the search page</h1>
      {
        Object.keys(gameinfo).map((key, index) => ( 
            <GameCard
            gd={gameinfo[key]}
            hd={hostData[gameinfo[key].hostid]}
         ></GameCard>  
        ))
      }
    </div>
        </Content>
    </Layout>
  );
}

export default Search;