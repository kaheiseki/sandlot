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
import './add_team.css';


export const AddTeam = () => {

  const [newTeamName, setNewTeamName] = useState("");
  const [newCount, setNewCount] = useState(0);
  const [newPlace, setNewPlace] = useState("");
  const [newCaptain, setNewCaptain] = useState("");

  const gamesCollectionRef = collection(db, "Teams");

  const createTeam = async () => {
    await addDoc(gamesCollectionRef, { name: newTeamName, place: newPlace, count: Number(newCount), captain: newCaptain });
  };

  return(
    <div>
      <Card className='add_team_card'>
        <Card.Body>
          <Card.Title className='createGamePostTitle'>新規チーム作成</Card.Title>
          <input
            className='form-control'
            placeholder="Team name..."
            onChange={(event) => {
              setNewTeamName(event.target.value);
            }}
          />
          <input
            className='form-control'
            placeholder="Home Place..."
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
          <input
            className='form-control'
            placeholder="Representative"
            onChange={(event) => {
              setNewCaptain(event.target.value);
            }}
          />
        </Card.Body>
        <form>
          <Button variant="primary" style = {{width:"180px"}} onClick={createTeam}>
              Create team
          </Button>
        </form>

      </Card>


    </div>

  );
}