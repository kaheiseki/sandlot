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

  const gamesCollectionRef = collection(db, "Games");

  const createGame = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, count: Number(newCount) });
  };



  return (
    <div className='CreateGamePost'>
      <Card style={{ width: "40rem" , height:"15rem",borderRadius:"10px"}}>
        <Card.Body>
          <Card.Title className='createGamePostTitle'>募集ゲーム作成</Card.Title>
          <input
            className='form-control'
            placeholder="Name..."
            onChange={(event) => {
              setNewTeamName(event.target.value);
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
        <Button variant="primary" style = {{width:"180px"}} onClick={createGame}>
            Create Game
        </Button>
      </Card>


    {/* {games.map((game) => {
      return (
        <div>
          {" "}
          <h1>Team: {game.name}</h1>
          <h1>Member Count: {game.count}</h1>
        </div>
      );
    })} */}
    </div>
  );
}