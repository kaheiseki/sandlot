import React from "react";
import {Card,Button} from 'react-bootstrap';
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

  return(
    <div>
      {/* <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
      <Card.Body>
        <Card.Title>募集チーム名</Card.Title>
        <Card.Text>
        日時:
        </Card.Text>
        <Card.Text>
        場所:
        </Card.Text>
      </Card.Body>
      </Card> */}
      {games.map((game) => {
        return (
          <div>
            <Card style={{ width: '18rem' , height:"12rem",borderRadius:"10px"}}>
              <Card.Body>
                <Card.Title>Game</Card.Title>
                {" "}
                <Card.Text>Team: {game.name}</Card.Text>
                <Card.Text>Member Count: {game.count}</Card.Text>
              </Card.Body>
              <Button variant="primary" style = {{width:"120px"}}>詳細を見る</Button>
            </Card>

          </div>
        );
      })}
    </div>

  );
}

export default GameInfo;