import React,{useState} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/header/header"
import GameInfo from "./pages/index/gameinfo"
import TeamInfo from "./pages/team_table/teaminfo"
import { CreateGamePost } from "./pages/create_game_post/create_game_post";

const App = () => {
  return(
    <div>

      <Header/>
      <div className = "infolist">
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div><CreateGamePost/></div>
      </div>
    </div>
  )
}

export default App;