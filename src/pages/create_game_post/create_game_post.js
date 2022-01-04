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
  const [newGameDate, setNewGameDate] = useState(0);
  // 本来date型でデータを収集したいが、一旦ただの数値で格納
  const [newGameTime, setNewGameTime] = useState(0);
  const [newPlace, setNewPlace] = useState("");
  const [newStation, setNewStation] = useState("");
  const [newCost, setNewCost] = useState(0);
  const [newHelper, setNewHelper] = useState(0);

  const gamesCollectionRef = collection(db, "Games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, date: newGameDate, time: newGameTime, place: newPlace, station: newStation, count: Number(newCount), cost: newCost, helper: newHelper });
    // フォーム送信後中身を空にする処理（まだうまくいってない）
    setNewCount(0);
    setNewTeamName("");
    setNewPlace("");
    setNewHelper(0);

  };



  return (
    <div className='CreateGamePost'>
      <Card className="create_game_card">
        <Card.Body>
          <Card.Title className='createGamePostTitle'>
            Make a Game
          </Card.Title>
          <input
            className='form-control'
            type="number"
            placeholder="Date: ex)20220120"
            onChange={(event) => {
              setNewGameDate(event.target.value);
            }}
          />
          {/* カレンダーから選ぶやつ実装したい */}
          <input
            className='form-control'
            type="number"
            placeholder="Playball Time: ex)15:00"
            onChange={(event) => {
              setNewGameTime(event.target.value);
            }}
          />
          <input
            className='form-control'
            placeholder="Team name"
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
            placeholder="Station"
            onChange={(event) => {
              setNewStation(event.target.value);
            }}
          />
          <input
            className='form-control'
            type="number"
            placeholder="Count"
            onChange={(event) => {
              setNewCount(event.target.value);
            }}
          />
          <input
            className='form-control'
            type="number"
            placeholder="Cost"
            onChange={(event) => {
              setNewCost(event.target.value);
            }}
          />
          <input
            className='form-control'
            placeholder="Helper"
            onChange={(event) => {
              setNewHelper(event.target.value);
            }}
          />
        </Card.Body>
        <form>
          <Button className='create_game_button' onClick={createGame} autoFocus>
            {/* autoFocusしたい */}
              Create Game
          </Button>
        </form>
      </Card>
    </div>
  );
}