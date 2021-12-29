import React from 'react'
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
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import './create_game_post.css';




export const CreateGamePost = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [newPlace, setNewPlace] = useState("");

  const gamesCollectionRef = collection(db, "Games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, place: newPlace, count: Number(newCount) });
    // フォーム送信後中身を空にする処理（まだうまくいってない）
    setNewTeamName("");
    setNewCount(0);
    setNewPlace("");

  };



  return (
    <div className='CreateGamePost'>
      <Card style={{ width: "40rem" , height:"15rem",borderRadius:"10px"}}>
        <Card.Body>
          <Card.Title className='createGamePostTitle'>募集ゲーム作成</Card.Title>
          <input
            className='form-control'
            placeholder="Team name..."
            onChange={(event) => {
              setNewTeamName(event.target.value);
            }}
          />
          <input
            className='form-control'
            placeholder="Place"
            onChange={(event) => {
              setNewPlace(event.target.value);
            }}
          />
          <input
            className='form-control'
            type="number"
            placeholder="Count..."
            onChange={(event) => {
              setNewCount(event.target.value);
            }}
          />
        </Card.Body>
        <form>
          <Button variant="primary" style = {{width:"180px"}} onClick={createGame}>
              Create Game
          </Button>
        </form>

      </Card>


    </div>
  );
}