import React from "react";
import {Card,Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
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
        Game List
      </div>
      <div className="container">
        {games.map((game, index) => {
          return (
            <div>
              <div className="infolist" key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>チーム人数: {game.count}</Card.Text>
                    <Card.Text>場所: {game.place}</Card.Text>
                    <Card.Text>日時: {game.date}</Card.Text>
                    {/* この日付機能うまくできてない */}
                  </Card.Body>
                  <Button onClick={()=>handleShow(index)}>詳細を見る</Button>
                </Card>
              </div>
              {/* modalについての記述 */}
              <div>
                <Modal show={show} onHide={handleClose} game={game}>
                  <Modal.Header closeButton>
                    <Modal.Title>詳細情報</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>チーム名:{games[indexContent].name}</p>
                    <p>参加メンバー数:{games[indexContent].count}</p>
                    <p>試合日:{games[indexContent].date}</p>
                    <p>開始時間:{games[indexContent].time}</p>
                    <p>費用:{games[indexContent].cost}円</p>
                    <p>連絡先:{games[indexContent].email}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={()=>handleClose()}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            //自分の投稿したチームを更新&削除できるように

          );
        })}
      </div>
    </div>
  );
}

export default GameInfo;