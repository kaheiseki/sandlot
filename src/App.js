import React,{useState} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/header/header"
import GameInfo from "./pages/index/gameinfo"
import TeamInfo from "./pages/team_table/teaminfo"
import { CreateGamePost } from "./pages/create_game_post/create_game_post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./pages/error_page/error_page";
import { MyTeam } from "./pages/my_team/my_team";
import { AddTeam } from "./pages/add_teams/add_team";
import { Login } from "./pages/login/login";


const App = () => {
  return(
    <div>

      <Header/>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<GameInfo/>}/>
            <Route path="/myteam" element={<MyTeam/>}/>
            <Route path="/creategame" element={<CreateGamePost/>}/>
            <Route path="/teamtable" element={<TeamInfo/>}/>
            <Route path = "/createteam" element = {<AddTeam/>}/>
            <Route path = "/login" element ={<Login/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;