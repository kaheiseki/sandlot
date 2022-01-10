import React,{useState} from "react";
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
import { SignUp } from "./pages/signup/signup";
import { Login } from "./pages/login/login";
import { Logout } from "./pages/logout/logout";
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection,getDocs,query,where } from 'firebase/firestore'

const App = () => {
  const [username,setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // 現時点では必要ないが今後必要になることに備えて用意
  const [email,setEmail] = useState("");
  const [uid,setUid] = useState(" ");
  onAuthStateChanged(auth,async (user) => {
    if(user){
      setIsLogin(true);
      const uid = user.uid;
      setUid(uid);
      const email = user.email;
      setEmail(email);
      const q = query(collection(db, "Users"),where("id","==",uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUsername(doc.data().name);
      });
    }else{
      setIsLogin(false);
    }
  })
  return(
    <div>
      <Header isLogin={isLogin} username={username}/>
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<GameInfo/>}/>
            <Route path="/gamelist" element={<GameInfo/>}/>
            <Route path="/myteam" element={<MyTeam/>}/>
            <Route path="/creategame"  element={<CreateGamePost />}/>
            <Route path="/teamlist" element={<TeamInfo/>}/>
            <Route path = "/createteam" element = {<AddTeam/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/logout" element = {<Logout/>}/>
            <Route path = "/signup" element = {<SignUp/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;