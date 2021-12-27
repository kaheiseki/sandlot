import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// ヘッダーを表示するコンポーネント
const Header = () => {
  return(
    <Navbar collapseOnSelect expand="true" bg="info" variant="dark">
      <Navbar.Brand href="#home">
        Sandlot
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">マイチーム</Nav.Link>
          <Nav.Link href="#">募集作成</Nav.Link>
          <Nav.Link href="#">チーム一覧</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;