import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Link } from "react-router-dom";


// ヘッダーを表示するコンポーネント
const Header = () => {
  return(
    <Navbar collapseOnSelect expand="true" bg="success" variant="dark">
      <Navbar.Brand href="/home" className="headerText">
        Sandlot
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/myteam" className="headerContents">マイチーム</Nav.Link>
          <Nav.Link href="/createteam" className="headerContents">新規チーム追加</Nav.Link>
          <Nav.Link href="/creategame" className="headerContents">募集作成</Nav.Link>
          <Nav.Link href="teamtable" className="headerContents">チーム一覧</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;