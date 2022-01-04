import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection,getDocs,query,where } from 'firebase/firestore'
import { useState } from 'react'

// import { Link } from "react-router-dom";


// ヘッダーを表示するコンポーネント
const Header = () => {
  const [username,setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  onAuthStateChanged(auth,async (user) => {
    if(user){
      setIsLogin(true);
      const uid = user.uid;
      const email = user.email;
      const q = query(collection(db, "Users"),where("id","==",uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUsername(doc.data().name);
        console.log(username);
      });
    }
  })
  if(isLogin){
    return(
      <Navbar collapseOnSelect expand="lg" className="header_outline">
        <Navbar.Brand href="/home" className="headerText">
            Sandlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="header_contents_outline">
            <Nav className="mr-auto">
              <Nav.Link href="/createteam" className="headerContents">Add team</Nav.Link>
              <Nav.Link href="/myteam" className="headerContents">MyTeam</Nav.Link>
              <Nav.Link href="/creategame" className="headerContents">Post game</Nav.Link>
              <Nav.Link href="/teamtable" className="headerContents">Team table</Nav.Link>
              <Nav.Link href="/login" className="headerContents">Log in</Nav.Link>
              <Nav.Link href="/signup" className="headerContents">Sign up</Nav.Link>
              {username}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }else{
    return(
      <Navbar collapseOnSelect expand="lg" className="header_outline">
        <Navbar.Brand href="/home" className="headerText">
            Sandlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="header_contents_outline">
            <Nav className="mr-auto">
              {/* <Nav.Link href="/createteam" className="headerContents">Add team</Nav.Link> */}
              {/* <Nav.Link href="/myteam" className="headerContents">MyTeam</Nav.Link> */}
              {/* <Nav.Link href="/creategame" className="headerContents">Post game</Nav.Link> */}
              <Nav.Link href="/teamtable" className="headerContents">Team table</Nav.Link>
              <Nav.Link href="/login" className="headerContents">Log in</Nav.Link>
              <Nav.Link href="/signup" className="headerContents">Sign up</Nav.Link>
              {username}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  // return(
  //   <Navbar collapseOnSelect expand="lg" className="header_outline">
  //     <Navbar.Brand href="/home" className="headerText">
  //         Sandlot
  //     </Navbar.Brand>
  //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //     <Navbar.Collapse id="responsive-navbar-nav">
  //       <div className="header_contents_outline">
  //         <Nav className="mr-auto">
  //           <Nav.Link href="/createteam" className="headerContents">Add team</Nav.Link>
  //           <Nav.Link href="/myteam" className="headerContents">MyTeam</Nav.Link>
  //           <Nav.Link href="/creategame" className="headerContents">Post game</Nav.Link>
  //           <Nav.Link href="/teamtable" className="headerContents">Team table</Nav.Link>
  //           <Nav.Link href="/login" className="headerContents">Log in</Nav.Link>
  //           <Nav.Link href="/signup" className="headerContents">Sign up</Nav.Link>
  //           {username}
  //         </Nav>
  //       </div>
  //     </Navbar.Collapse>
  //   </Navbar>
  // );
}
export default Header;