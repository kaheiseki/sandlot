import React,{useState} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from "./components/header/header"
import GameInfo from "./pages/index/gameinfo"
import TeamInfo from "./pages/teamTable/teaminfo"

const Root = () => {
  return(
    <div>

      <Header/>
      <div className = "infolist">
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
      </div>
    </div>
  )
}




ReactDOM.render(
  <Root />,
  document.getElementById("root")
);