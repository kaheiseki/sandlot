import React from "react";
import {Card,Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs
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
  const [indexContent, setIndexContent] = useState(0);

  const handleClose = ()=> setShow(false);
  const handleShow = (index)=> {
    setShow(true);
    setIndexContent(index);
  }

  return(
    <div>
      <div className="gameInfoTitle">
        試合一覧
      </div>
      <div className="container">
        {games.map((game, index) => {
          return (
            <div>
              <div className="infolist" key={index}>
                <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>チーム人数: {game.count}</Card.Text>
                    <Card.Text>場所: {game.place}</Card.Text>
                    <Card.Text>日時: {String(game.date).slice(4,6)}月{String(game.date)[6,8]}日</Card.Text>
                    {/* この日付機能うまくできてない */}
                  </Card.Body>
                  <Button variant="primary" style = {{width:"120px"}} onClick={()=>handleShow(index)}>詳細を見る</Button>
                </Card>
              </div>
              {/* modalについての記述 */}
              <div>
                <Modal show={show} onHide={handleClose} game={game}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>チーム名:{games[indexContent].name}</p>
                    <p>参加メンバー数:{games[indexContent].count}</p>
                    <p>試合日:{String(games[indexContent].date)[3,5]}月{String(games[indexContent].date)[5,7]}日</p>
                    <p>費用:{games[indexContent].cost}円</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={()=>handleClose()}>Close</Button>
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