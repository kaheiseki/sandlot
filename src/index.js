import React,{useState} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from "./header/header"
import GameInfo from "./index/gameinfo"
import TeamInfo from "./teamTable/teaminfo"

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
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
        <div className = "gameinfo"><GameInfo/></div>
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