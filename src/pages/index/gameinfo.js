import React from "react";
import {Card,Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import './gameinfo.css';



const GameInfo = () => {
  const [games, setGames] = useState([]);
  const gamesCollectionRef = collection(db, "Games");
  useEffect(() => {
    const getGames = async () => {
      const data = await getDocs(gamesCollectionRef);
      setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getGames();
  }, []);

  // modalに関するhooks
  const [show, setShow] = useState(false);

  const handleClose = ()=> setShow(false);
  const handleShow = ()=> setShow(true);
  return(
    <div>
      <div className="gameInfoTitle">
        試合一覧
      </div>
      <div className="container">
        {games.map((game) => {
          return (
            <div>
              <div className="infolist">
                <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>チーム人数: {game.count}</Card.Text>
                    <Card.Text>場所: {game.place}</Card.Text>
                  </Card.Body>
                  <Button variant="primary" style = {{width:"120px"}} onClick={handleShow}>詳細を見る</Button>
                </Card>
              </div>
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>you're reading this text in a modl</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
}

export default GameInfo;