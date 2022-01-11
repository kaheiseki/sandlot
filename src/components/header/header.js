import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { auth} from '../../firebase'
import { BrowserRouter,Link } from "react-router-dom";



// ヘッダーを表示するコンポーネント
const Header = ({isLogin, username}) => {
  const LogOut = () => {
    auth.signOut();
  }
  if(isLogin){
    return(
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" className="header_outline">
          <Navbar.Brand className="headerText">
            <Link to = "/gamelist" >
            Sandlot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="header_contents_outline">
              <Nav className="mr-auto">
                <Nav.Link className="headerContents">
                <Link to = "/gamelist">
                  Game List
                </Link>
                </Nav.Link>
                <Nav.Link  className="headerContents">
                  <Link to = "/creategame">
                    Post Game
                  </Link>
                </Nav.Link>
                <Nav.Link className="headerContents">
                  <Link to = "/teamlist">
                    Team List
                  </Link>
                </Nav.Link>
                <Nav.Link className="headerContents">
                  <Link to = "/myteam">
                    My Team
                  </Link>
                </Nav.Link>
                <Nav.Link href="/" className="headerContents" onClick={()=>LogOut()}>Log out</Nav.Link>
                <Nav.Link className="headerContents">{username}さん</Nav.Link>
                {/* hoverした時クリッカブルに見える */}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </BrowserRouter>
    );
  }else{
    return(
      <Navbar collapseOnSelect expand="lg" className="header_outline">
        <Navbar.Brand href="/gamelist" className="headerText">
            Sandlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="header_contents_outline">
            <Nav className="mr-auto">
              <Nav.Link href="/gamelist" className="headerContents">Game List</Nav.Link>
              <Nav.Link href="/teamlist" className="headerContents">Team List</Nav.Link>
              <Nav.Link href="/login" className="headerContents">Log in</Nav.Link>

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